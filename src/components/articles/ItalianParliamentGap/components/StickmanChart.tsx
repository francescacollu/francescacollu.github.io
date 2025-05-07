import React, { useState, useEffect, useRef } from 'react';
import '../styles/StickmanChart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface StickmanChartProps {
  categories?: Category[];
  totalFigures?: number;
  opacity?: number;
}

const StickmanChart: React.FC<StickmanChartProps> = ({
  // Default values if props aren't provided
  categories = [
    { id: 'women', label: 'Women', value: 212, color: '#9ca3af' },
    { id: 'men', label: 'Men', value: 393, color: 'black' },
  ],
  totalFigures = 605,
  opacity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [figureSize, setFigureSize] = useState(20);
  const [gap, setGap] = useState(2);
  
  // Calculate sizes on mount and resize
  useEffect(() => {
    const calculateFigureSize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const targetFiguresPerRow = 30;
      const calculatedSize = Math.floor((containerWidth / targetFiguresPerRow) - 2);
      const newSize = Math.max(10, Math.min(calculatedSize, 30));
      
      setFigureSize(newSize);
      setGap(newSize * 0.1);
    };
    
    calculateFigureSize();
    window.addEventListener('resize', calculateFigureSize);
    
    return () => {
      window.removeEventListener('resize', calculateFigureSize);
    };
  }, []);
  
  const figures = Array.from({ length: totalFigures }, (_, i) => i);
  
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
  
  return (
    <div 
      ref={containerRef} 
      className="stickman-chart"
      style={{gap: `${gap}px`}}>
      {figures.map(index => (
        <div 
          key={index}
          style={{
            width: `${figureSize}px`,
            height: `${figureSize}px`,
            transition: 'none',
            opacity: opacity
          }}
        >
          <div style={{ color: getColorForIndex(index) }}>
            <FontAwesomeIcon icon={faPerson} size="2x" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickmanChart; 