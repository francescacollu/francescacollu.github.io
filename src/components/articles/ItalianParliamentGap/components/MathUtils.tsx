{/**
 * Computes the center and scale of a circle that fits the given radius list.
 * 
 * @param radiusList - The list of radii of the circles to fit.
 * @param width - The width of the container.
 * @param height - The height of the container.
 * @returns The center and scale of the circle that fits the given radius list.
 */}

import SeededRandom from './SeededRandom';
import { Category } from '../types';


interface CircleParams {
    x_center: number;
    y_center: number;
    scale: number;
}

interface WidgetDimensions {
    width: number;
    height: number;
}

interface ArcHeightBounds {
    minHeightFraction: number; // Height fraction wrt the height of the container corresponding to the maximum radius circle.
    maxHeightFraction: number; // Height fraction wrt the height of the container corresponding to the minimum radius circle.
}

interface PxPoint {
    x: number;
    y: number;
}

interface MemberTypeAndPosition {
    image: string;
    pxPoint: PxPoint;
}

// TODO(fcollu): move to separate file
interface ImageId {
    source: string;
    color: string;
}

interface ColorNode {
    color: string;
    coloredSrc: string;
}

interface OriginalSrcNode {
    src: string;
    colorNodes: ColorNode[];
}

interface ImageTree {
    originalSrcNodes: OriginalSrcNode[];
}

const computeCirleParams = (size: WidgetDimensions, bounds: ArcHeightBounds, radiusList: number[]): CircleParams => {
    const maxRadius = Math.max(...radiusList);
    const minRadius = Math.min(...radiusList);
    
    const x_center = size.width / 2;
    const y_center = size.height * (bounds.maxHeightFraction + minRadius / (maxRadius - minRadius) * (bounds.maxHeightFraction - bounds.minHeightFraction));
    const scale = (bounds.maxHeightFraction - bounds.minHeightFraction) / (maxRadius - minRadius) * size.height;

    return { x_center, y_center, scale };
}

const computeMaxArcAngle = (size: WidgetDimensions, circleParams: CircleParams, radiusList: number[]): number => {
    const maxRadius = Math.max(...radiusList);
    const minRadius = Math.min(...radiusList);

    const maxDiameterInPx = 2 * maxRadius * circleParams.scale;

    if (maxDiameterInPx < size.width) {
        throw new Error("Diameter is too small wrt the width of the widget");
    }

    const maxRadiusAngle = 2 * Math.asin(size.width / (2 * maxRadius * circleParams.scale));

    const minRadiusCosHalfAngle = (circleParams.y_center - size.height) / (minRadius * circleParams.scale);

    if (Math.abs(minRadiusCosHalfAngle) > 1) {
        throw new Error(`Cosine out of bounds: ${minRadiusCosHalfAngle}, minRadius: ${minRadius}, circleParams.scale: ${circleParams.scale}, circleParams.y_center: ${circleParams.y_center}, size.height: ${size.height}`);
    }

    const minRadiusAngle = 2 * Math.acos(minRadiusCosHalfAngle);

    return Math.min(maxRadiusAngle, minRadiusAngle);
}

const placePointsOnCircle = (radiusList: number[], nPoints: number, maxAngle: number, circleParams: CircleParams, dimensions: WidgetDimensions): PxPoint[] => {
    const seededRandom = new SeededRandom(12345);
    const radiusMaxNoise = 0.0*dimensions.height;
    const angleMaxNoise = 0.0*maxAngle;

    const radiusPxList = radiusList.map(r => r * circleParams.scale);

    const totalLength = radiusPxList.reduce((acc, radius) => acc + radius*maxAngle, 0);
    const points = [];

    const pointsPerRadius = [];
    let pointsSoFar = 0;
    for (let i = 0; i < radiusPxList.length-1; i++) {
        const arcFraction = radiusPxList[i] * maxAngle / totalLength;
        const currentPoints = Math.floor(nPoints * arcFraction);
        pointsPerRadius.push(currentPoints);
        pointsSoFar += currentPoints;
    }
    pointsPerRadius.push(nPoints - pointsSoFar);

    for (let i = 0; i < radiusPxList.length; i++) {
        const currentPoints = pointsPerRadius[i];


        const deltaAngle = maxAngle / currentPoints; 
 
        
        for (let j = 0; j < currentPoints; j++) {
            let angle = j * deltaAngle - maxAngle / 2 + deltaAngle/2;
            const angleNoise = seededRandom.randomFloat(-angleMaxNoise, angleMaxNoise);
            angle += angleNoise;

            const radiusNoise = seededRandom.randomFloat(-radiusMaxNoise, radiusMaxNoise);
            const radius = radiusPxList[i] + radiusNoise;

            const x = circleParams.x_center + radius * Math.sin(angle);
            const y = circleParams.y_center - radius * Math.cos(angle);
            points.push({ x, y });
        }
    }

    return points;
}

const sampleMemberTypesAndPositions = (points: PxPoint[], imageTree: ImageTree, categories: Category[]): MemberTypeAndPosition[] => {
    const seededRandom = new SeededRandom(42);
    const memberTypeAndPositions = [];

    const getColorForIndex = (index: number): string => {
        let countSoFar = 0;
        for (const category of categories) {
            countSoFar += category.count;
            if (index < countSoFar) {
                return category.color;
            }
        }
        throw new Error(`Index out of bounds: ${index}, categories: ${categories}`);
    }

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const color = getColorForIndex(i);
        const originalSrcNode = seededRandom.randomChoice(imageTree.originalSrcNodes);
        
        const coloredNode = originalSrcNode.colorNodes.find(node => node.color === color);
        if (!coloredNode) {
            throw new Error(`Colored node not found for color: ${color}, originalSrcNode: ${originalSrcNode}`);
        }

        const coloredSrc = coloredNode.coloredSrc;

        memberTypeAndPositions.push({image: coloredSrc, pxPoint: point});
    }
    return memberTypeAndPositions;
}


export type { ImageId, ImageTree, OriginalSrcNode, ColorNode, WidgetDimensions };
export { computeCirleParams, computeMaxArcAngle, placePointsOnCircle, sampleMemberTypesAndPositions };