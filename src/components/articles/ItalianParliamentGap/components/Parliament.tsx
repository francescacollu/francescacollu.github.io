import React, { useState, useEffect, useRef, useMemo } from 'react';
import { computeCirleParams, 
    computeMaxArcAngle, 
    placePointsOnCircle, 
    sampleMemberTypesAndPositions, 
    WidgetDimensions } from './MathUtils';
import { Category } from '../types';
import { useImageTree } from './ImageTreeContext';
import '../styles/Parliament.css';

const Parliament: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState<WidgetDimensions>();
    const { imageTree, isLoading, error } = useImageTree();
    const [images, setImages] = useState<Map<string, HTMLImageElement>>(new Map());

    const radiusScale = 3;
    const radiusList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(r => r + radiusScale);
    const widthFraction = 0.012;

    useEffect(() => {
        if (!containerRef.current) {
            console.error('Parliament containerRef.current is null');
            return;
        }
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
    }, []);

    const circleParams = useMemo(() => {
        return dimensions ? computeCirleParams(dimensions, { minHeightFraction: 0.2, maxHeightFraction: 0.8 }, radiusList) : null;
    }, [dimensions]);

    const maxArcAngle = useMemo(() => {
        return (circleParams && dimensions) ? computeMaxArcAngle(dimensions, circleParams, radiusList) : null;
    }, [dimensions, circleParams]);

    const points = useMemo(() => {
        const totalCount = categories.reduce((acc, category) => acc + category.count, 0);
        return (maxArcAngle && circleParams && dimensions) ? placePointsOnCircle(radiusList, totalCount, maxArcAngle, circleParams, dimensions) : [];
    }, [maxArcAngle, circleParams, dimensions, categories]);

    const memberTypeAndPositions = useMemo(() => {
        return (imageTree && !isLoading && !error) ? sampleMemberTypesAndPositions(points, imageTree, categories) : [];
    }, [points, imageTree, isLoading, error, categories]);

    // Load images once
    useEffect(() => {
        const loadImages = async () => {
            const imageMap = new Map();
            if (!imageTree) return;
            for (const originalSrcNode of imageTree.originalSrcNodes) {
                for (const colorNode of originalSrcNode.colorNodes) {
                    const img = new Image();
                    img.src = colorNode.coloredSrc;
                    await new Promise(resolve => img.onload = resolve);
                    imageMap.set(colorNode.coloredSrc, img);
                }
            }
            setImages(imageMap);
        };
        loadImages();
    }, [imageTree]);

    // Draw to canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !dimensions) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw each member
        memberTypeAndPositions.forEach(member => {
            const img = images.get(member.image);
            if (!img) {
                return;
            }

            const size = dimensions.width * widthFraction;
            const aspectRatio = img.width / img.height;
            const drawWidth = size;
            const drawHeight = size / aspectRatio;

            ctx.drawImage(
                img,
                member.pxPoint.x - drawWidth/2,
                member.pxPoint.y - drawHeight/2,
                drawWidth,
                drawHeight
            );
        });

    }, [dimensions, memberTypeAndPositions, images]);

    return (
        <div className='parliament-container' ref={containerRef}>
                <canvas 
                    ref={canvasRef}
                    width={dimensions?.width}
                    height={dimensions?.height}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
    );
};

export default Parliament;