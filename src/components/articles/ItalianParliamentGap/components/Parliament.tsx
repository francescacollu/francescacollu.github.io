import React, { useState, useEffect, useRef, useMemo } from 'react';
import { computeCirleParams, 
    computeMaxArcAngle, 
    placePointsOnCircle, 
    sampleMemberTypesAndPositions, 
    ImageId, 
    Category, 
    ImageTree, 
    OriginalSrcNode, 
    ColorNode,
    WidgetDimensions } from './MathUtils';
import roundedMp from './rounded_mp.png';
import squaredMp from './squared_mp.png';
import skirtedMp from './skirted_mp.png';
import pointedMp from './pointed_mp.png';

const images = [roundedMp, squaredMp, skirtedMp, pointedMp];

interface ParliamentMemberInterface {
    key: string;
    image: string;
    widthFraction: number;
    xPosition: number;
    yPosition: number;
}

const convertGrayscaleToColor = (
    imageId: ImageId, 
    callback: (dataUrl: string) => void
  ) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;
      
      const targetRGB = {
        r: parseInt(imageId.color.slice(1, 3), 16),
        g: parseInt(imageId.color.slice(3, 5), 16),
        b: parseInt(imageId.color.slice(5, 7), 16)
      };
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = imageData.data[i+3];
        
        imageData.data[i] = targetRGB.r ;    
        imageData.data[i + 1] = targetRGB.g; 
        imageData.data[i + 2] = targetRGB.b; 
        imageData.data[i + 3] = gray;
      }
      
      ctx?.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL());
    };
    
    img.src = imageId.source;
  };

const Parliament: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<WidgetDimensions>();
    const [imageTree, setImageTree] = useState<ImageTree>();


    const radiusScale = 3;
    const radiusList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(r => r + radiusScale);
    const widthFraction = 0.012;

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({width: width, height: height });
        }
    }, []);

    useEffect(() => {
        const convertAllImages = async () => {
            const promises: Promise<{key: ImageId, value: string}>[] = [];
            
            for (const category of categories) {
                for (const image of images) {
                    const imageId: ImageId = {source: image, color: category.color};
                    const promise = new Promise<{key: ImageId, value: string}>((resolve) => {
                        convertGrayscaleToColor(imageId, (coloredImage) => {
                            resolve({key: imageId, value: coloredImage});
                        });
                    });
                    promises.push(promise);
                }
            }
            
            const results = await Promise.all(promises);
            const originalSrcNodes: OriginalSrcNode[] = images.map((image) => ({src: image, colorNodes: []}));
            for (const originalSrcNode of originalSrcNodes) {
                for (const category of categories) {
                    const coloredSrc = results.find(({key}) => key.source === originalSrcNode.src && key.color === category.color)?.value || '';
                    if (!coloredSrc) {
                        throw new Error(`Colored src not found for image: ${originalSrcNode.src}, category: ${category.color}`);
                    }
                    const colorNode: ColorNode = {color: category.color, coloredSrc: coloredSrc};
                    originalSrcNode.colorNodes.push(colorNode);
                }
            }
            const imageTree: ImageTree = {
                originalSrcNodes: originalSrcNodes,
            };
            setImageTree(imageTree);
        };
        convertAllImages();
    }, [categories]);

    const circleParams = useMemo(() => {
        if (!dimensions) return null;
        return computeCirleParams(dimensions, { minHeightFraction: 0.2, maxHeightFraction: 0.8 }, radiusList);
    }, [dimensions]);

    const maxArcAngle = useMemo(() => {
        if (!circleParams || !dimensions) return null;
        return computeMaxArcAngle(dimensions, circleParams, radiusList);
    }, [dimensions, circleParams]);

    const points = useMemo(() => {
        if (!maxArcAngle || !circleParams || !dimensions) return [];
        const totalCount = categories.reduce((acc, category) => acc + category.count, 0);
        return placePointsOnCircle(radiusList, totalCount, maxArcAngle, circleParams, dimensions);
    }, [maxArcAngle, circleParams, dimensions, categories]);

    const memberTypeAndPositions = useMemo(() => {
        if (!imageTree) return [];
        console.log(imageTree);
        console.log(categories);
        return sampleMemberTypesAndPositions(points, imageTree, categories);
    }, [points, imageTree]);

    return (
        <div className='parliament-container'>
            <div className='inner-parliament' ref={containerRef}>
                {dimensions && imageTree && (
                    points.map((point, index) => (
                        <ParliamentMember
                            key={index.toString()}
                            image={memberTypeAndPositions[index].image}
                            widthFraction={widthFraction}
                            xPosition={memberTypeAndPositions[index].pxPoint.x}
                            yPosition={memberTypeAndPositions[index].pxPoint.y}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

const ParliamentMember: React.FC<ParliamentMemberInterface> = ({key, image, widthFraction, xPosition, yPosition }) => {
    return (
        <img className='parliament-member' key={key}
            src={image} style={{
            position: 'absolute',
            width: `${widthFraction*100}%`,
            left: `${xPosition}px`,
            top: `${yPosition}px`,
            transform: 'translate(-50%, -50%)',
            }} />
    )
}

export default Parliament;