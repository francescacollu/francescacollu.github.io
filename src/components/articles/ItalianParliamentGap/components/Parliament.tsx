import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { computeCirleParams, computeMaxArcAngle, placePointsOnCircle } from './MathUtils';
import userImage from './user_byme.png';

interface Category {
    id: string;
    label: string;
    value: number;
    color: string;
}

interface ParliamentMemberInterface {
    key: string;
    image: string;
    widthFraction: number;
    xPosition: number;
    yPosition: number;
    color: string;
}

interface ParliamentInterface {
    image: IconDefinition;
    widthFraction: number;
    radiusList: number[];
    members: number;
    categories?: Category[];
}

const convertGrayscaleToColor = (
    imageSrc: string, 
    targetColor: string, 
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
      
      // Parse target color
      const targetRGB = {
        r: parseInt(targetColor.slice(1, 3), 16),
        g: parseInt(targetColor.slice(3, 5), 16),
        b: parseInt(targetColor.slice(5, 7), 16)
      };

      console.log("targetRGB: ", targetRGB);
      
      // Modify pixels
      for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = imageData.data[i+3];
        
        imageData.data[i] = targetRGB.r ;     // R
        imageData.data[i + 1] = targetRGB.g; // G
        imageData.data[i + 2] = targetRGB.b; // B
        imageData.data[i + 3] = gray;
      }
      
      ctx?.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL());
    };
    
    img.src = imageSrc;
  };

const Parliament: React.FC<ParliamentInterface> = ({ 
    image, 
    widthFraction, 
    members,
    categories = [
        { id: 'id1', label: 'Label1', value: 212, color: '#ff0000' },
        { id: 'id2', label: 'Label2', value: 393, color: '#0000ff' },
    ]
    }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [coloredImageSrc, setColoredImageSrc] = useState<string>('');

    const radiusScale = 3;
    const radiusList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(r => r + radiusScale);

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    useEffect(() => {
        convertGrayscaleToColor(userImage, '#ffffff', setColoredImageSrc);
      }, []);

    const circleParams = computeCirleParams(dimensions, { minHeightFraction: 0.2, maxHeightFraction: 0.8 }, radiusList);

    const maxArcAngle = computeMaxArcAngle(dimensions, circleParams, radiusList);

    const points = placePointsOnCircle(radiusList, members, maxArcAngle, circleParams, dimensions);

    const getColorForIndex = (index: number): string => {
        let countSoFar = 0;
        for (const category of categories) {
            countSoFar += category.value;
            if (index < countSoFar) {
                return category.color;
            }
        }
        return 'black';
    };

    console.log('widthFraction: ', widthFraction);
    return (
        <div className='inner-parliament' ref={containerRef}>
            {points.map((point, index) => (
                <ParliamentMember
                    key={index.toString()}
                    image={coloredImageSrc}
                    widthFraction={widthFraction}
                    xPosition={point.x}
                    yPosition={point.y}
                    color={getColorForIndex(index)}
                />
                ))}
        </div>
    );
};

const ParliamentMember: React.FC<ParliamentMemberInterface> = ({key, image, widthFraction, xPosition, yPosition, color }) => {
    return (
        <img className='parliament-member' key={key}
            src={image} style={{
            position: 'absolute',
            width: `${widthFraction*100}%`,
            left: `${xPosition}px`,
            top: `${yPosition}px`,
            transform: 'translate(-50%, -50%)',
            }} />
        // <FontAwesomeIcon 
        //         icon={faUser}
        //         style={{
        //             position: 'absolute',
        //             width: `${widthFraction * 100}%`,
        //             left: `${xPosition}`,
        //             top: `${yPosition}`,
        //             transform: 'translate(-50%, -50%)',
        //             color: color,
        //         }}
        //     />
    )
}

export default Parliament;