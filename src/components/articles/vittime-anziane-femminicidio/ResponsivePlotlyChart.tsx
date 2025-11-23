import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { Layout, Config } from 'plotly.js';

interface ResponsivePlotlyChartProps {
    data: any[];
    layout: Partial<Layout> | any; // Allow any to handle JSON data that may not perfectly match Plotly types
    config: Partial<Config>;
    className?: string;
    minHeight?: string;
    caption?: string;
}

const ResponsivePlotlyChart: React.FC<ResponsivePlotlyChartProps> = ({
    data,
    layout: initialLayout,
    config,
    className,
    minHeight = '600px',
    caption
}) => {
    const [layout, setLayout] = useState<Partial<Layout>>(() => {
        // Initialize layout with correct title based on screen size
        const layoutWithMeta = initialLayout as any;
        const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
        
        if (layoutWithMeta.meta && layoutWithMeta.meta.desktop_title && layoutWithMeta.meta.mobile_title) {
            const initialTitle = mobile 
                ? layoutWithMeta.meta.mobile_title 
                : layoutWithMeta.meta.desktop_title;
            
            return {
                ...initialLayout,
                title: {
                    ...initialLayout.title,
                    text: initialTitle
                }
            };
        }
        
        return initialLayout;
    });
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
    const containerRef = useRef<HTMLDivElement>(null);
    const plotRef = useRef<any>(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            // Update title based on screen size if meta titles exist
            const layoutWithMeta = initialLayout as any;
            if (layoutWithMeta.meta && layoutWithMeta.meta.desktop_title && layoutWithMeta.meta.mobile_title) {
                const newTitle = mobile 
                    ? layoutWithMeta.meta.mobile_title 
                    : layoutWithMeta.meta.desktop_title;
                
                setLayout(prev => ({
                    ...prev,
                    title: {
                        ...prev.title,
                        text: newTitle
                    }
                }));
            }
        };

        checkMobile();
        
        const handleResize = () => {
            checkMobile();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [initialLayout]);

    // Calculate responsive height
    const getHeight = () => {
        if (isMobile) {
            const baseHeight = parseInt(minHeight) || 600;
            return Math.max(400, baseHeight * 0.7);
        }
        return parseInt(minHeight) || 600;
    };

    return (
        <div
            ref={containerRef}
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
                style={{
                    width: '100%',
                    maxWidth: '1000px',
                    minHeight: `${getHeight()}px`,
                    height: `${getHeight()}px`
                }}
            >
                <Plot
                    ref={plotRef}
                    data={data}
                    layout={{
                        ...layout,
                        height: getHeight(),
                        width: undefined, // Let it be responsive
                        autosize: true
                    }}
                    config={{
                        ...config,
                        responsive: true
                    }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                    onInitialized={(figure, graphDiv) => {
                        // Ensure title is set correctly on initialization
                        const layoutWithMeta = initialLayout as any;
                        if (layoutWithMeta.meta && layoutWithMeta.meta.desktop_title && layoutWithMeta.meta.mobile_title) {
                            const mobile = window.innerWidth < 768;
                            const title = mobile 
                                ? layoutWithMeta.meta.mobile_title 
                                : layoutWithMeta.meta.desktop_title;
                            
                            if (typeof window !== 'undefined' && (window as any).Plotly) {
                                (window as any).Plotly.relayout(graphDiv, {
                                    'title.text': title
                                });
                            }
                        }
                    }}
                />
            </div>
            {caption && (
                <p className="chart-caption" dangerouslySetInnerHTML={{ __html: caption }} />
            )}
        </div>
    );
};

export default ResponsivePlotlyChart;

