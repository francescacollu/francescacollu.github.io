{/**
 * Computes the center and scale of a circle that fits the given radius list.
 * 
 * @param radiusList - The list of radii of the circles to fit.
 * @param width - The width of the container.
 * @param height - The height of the container.
 * @returns The center and scale of the circle that fits the given radius list.
 */}

 import * as d3 from 'd3';


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

interface PxPoint {
    x: number;
    y: number;
}

const placePointsOnCircle = (radiusList: number[], nPoints: number, maxAngle: number, circleParams: CircleParams, dimensions: WidgetDimensions): PxPoint[] => {
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

        const radiusNoiseDist = d3.randomNormal(0, 0.001*dimensions.height);
        const deltaAngle = maxAngle / currentPoints; 
        const angleNoiseDist = d3.randomNormal(0, 0.05*deltaAngle);
        
        for (let j = 0; j < currentPoints; j++) {
            let angle = j * deltaAngle - maxAngle / 2 + deltaAngle/2;
            angle += angleNoiseDist();
            const radius = radiusPxList[i];// + radiusNoiseDist();

            const x = circleParams.x_center + radius * Math.sin(angle);
            const y = circleParams.y_center - radius * Math.cos(angle);
            points.push({ x, y });
        }
    }

    return points;
}

export { computeCirleParams, computeMaxArcAngle, placePointsOnCircle };