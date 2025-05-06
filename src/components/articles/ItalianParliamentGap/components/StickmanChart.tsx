import React, { useState, useEffect, useRef } from 'react';

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
      style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: `${gap}px`,
        width: '100%'
      }}
    >
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
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 24 24"
          >
            <g fill={getColorForIndex(index)}>
              <circle cx="12" cy="4" r="3.5" />
              <line x1="12" y1="8" x2="12" y2="16" stroke={getColorForIndex(index)} strokeWidth="2" />
              <line x1="8" y1="12" x2="16" y2="12" stroke={getColorForIndex(index)} strokeWidth="2" />
              <line x1="12" y1="16" x2="8" y2="20" stroke={getColorForIndex(index)} strokeWidth="2" />
              <line x1="12" y1="16" x2="16" y2="20" stroke={getColorForIndex(index)} strokeWidth="2" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default StickmanChart; 