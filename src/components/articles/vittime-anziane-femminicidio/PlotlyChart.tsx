import React from 'react';

interface PlotlyChartProps {
    src: string;
    className?: string;
    height?: string;
    minHeight?: string;
}

const PlotlyChart: React.FC<PlotlyChartProps> = ({
    src,
    className,
    height = 'auto',
    minHeight = '800px'
}) => {
    return (
        <div 
            className={`plotly-chart-container ${className || ''}`}
            style={{
                width: '100%',
                margin: '2rem 0',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <iframe
                src={src}
                style={{
                    maxWidth: '1000px',
                    width: '100%',
                    height: height,
                    border: 'none',
                    minHeight: minHeight
                }}
                title="Plotly Chart"
                scrolling="no"
            />
        </div>
    );
};

export default PlotlyChart;
