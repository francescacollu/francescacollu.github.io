import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { computeCirleParams, computeMaxArcAngle, placePointsOnCircle } from './MathUtils';

interface ParliamentMemberInterface {
    image: IconDefinition;
    widthFraction: number;
    xPosition: number;
    yPosition: number;
}

interface ParliamentInterface {
    image: IconDefinition;
    widthFraction: number;
    radiusList: number[];
    members: number;
}



const Parliament: React.FC<ParliamentInterface> = ({ image, widthFraction, members }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const radiusScale = 3;
    const radiusList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(r => r + radiusScale);

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    const circleParams = computeCirleParams(dimensions, { minHeightFraction: 0.2, maxHeightFraction: 0.8 }, radiusList);

    const maxArcAngle = computeMaxArcAngle(dimensions, circleParams, radiusList);

    const points = placePointsOnCircle(radiusList, members, maxArcAngle, circleParams, dimensions);

    console.log(points);
    console.log("Dimensions: ", dimensions.width, dimensions.height);
    console.log("Circle params: ", circleParams.x_center, circleParams.y_center, circleParams.scale);



    return (
        <div className='inner-parliament' ref={containerRef}>
            {/* <svg width={dimensions.width} height={dimensions.height}> */}
            {points.map((point, index) => (
                <ParliamentMember
                    key={index}
                    image={image}
                    widthFraction={widthFraction}
                    xPosition={point.x}
                    yPosition={point.y}
                />
                    // <circle 
                    //     key={index}
                    //     cx={circleParams.x_center}
                    //     cy={circleParams.y_center}
                    //     r={radius * circleParams.scale}
                    //     fill="none"
                    //     stroke="black"
                    //     strokeWidth="2"
                    // />
                ))}
            {/* </svg> */}
        </div>
    );
};

const ParliamentMember: React.FC<ParliamentMemberInterface> = ({ image, widthFraction, xPosition, yPosition }) => {
    return (
        <FontAwesomeIcon 
                icon={image}
                style={{
                    position: 'absolute',
                    width: `${widthFraction * 100}%`,
                    left: `${xPosition}`,
                    top: `${yPosition}`,
                    transform: 'translate(-50%, -50%)',
                }}
            />
    )
}

export default Parliament;