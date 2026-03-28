import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import Plotly from 'plotly.js-dist-min';

interface ResponsivePlotlyChartProps {
    data: any[];
    layout: any;
    config?: any;
    className?: string;
    minHeight?: string;
    caption?: string;
}

const ResponsivePlotlyChart: React.FC<ResponsivePlotlyChartProps> = ({
    data,
    layout,
    config = { responsive: true },
    className,
    minHeight = '600px',
    caption
}) => {
    const plotRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (plotRef.current) {
            const responsiveLayout = {
                ...layout,
                autosize: true,
                title: {
                    ...layout.title,
                    text: isMobile && layout.meta?.mobile_title 
                        ? layout.meta.mobile_title 
                        : layout.meta?.desktop_title || layout.title?.text
                }
            };

            Plotly.newPlot(plotRef.current, data, responsiveLayout, config);

            const handleResize = () => {
                if (plotRef.current) {
                    Plotly.Plots.resize(plotRef.current);
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [data, layout, config, isMobile]);

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
            <div
                ref={plotRef}
                style={{
                    width: '100%',
                    maxWidth: '1000px',
                    minHeight: minHeight
                }}
            />
            {caption && (
                <p 
                    className="chart-caption" 
                    dangerouslySetInnerHTML={{ __html: caption }}
                    style={{
                        maxWidth: '1000px',
                        width: '100%',
                        fontSize: '0.9rem',
                        color: '#666',
                        marginTop: '1rem',
                        lineHeight: '1.6'
                    }}
                />
            )}
        </div>
    );
};

export default ResponsivePlotlyChart;
