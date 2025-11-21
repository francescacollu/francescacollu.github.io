import React from 'react';

interface PlotlyChartProps {
    src: string;
    className?: string;
    height?: string;
    minHeight?: string;
    caption?: string;
}

const PlotlyChart: React.FC<PlotlyChartProps> = ({
    src,
    className,
    height = 'auto',
    minHeight = '800px',
    caption
}) => {
    return (
        <div
            className={`plotly-chart-container ${className || ''}`}
            style={{
                width: '100%',
                margin: '2rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
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
            {caption && (
                <p className="chart-caption" dangerouslySetInnerHTML={{ __html: caption }} />
            )}
        </div>
    );
};

export default PlotlyChart;
