import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { Layout, Config } from 'plotly.js';

export interface ResponsivePlotlyChartProps {
    data: any[];
    layout: Partial<Layout> | any;
    config: Partial<Config>;
    className?: string;
    minHeight?: string;
    caption?: string;
    captionClassName?: string;
}

const ResponsivePlotlyChart: React.FC<ResponsivePlotlyChartProps> = ({
    data,
    layout: initialLayout,
    config,
    className,
    minHeight = '600px',
    caption,
    captionClassName
}) => {
    const [layout, setLayout] = useState<Partial<Layout>>(() => {
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
    const plotRef = useRef<any>(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

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

    const getHeight = () => {
        if (isMobile) {
            const baseHeight = parseInt(minHeight, 10) || 600;
            return Math.max(400, baseHeight * 0.7);
        }
        return parseInt(minHeight, 10) || 600;
    };

    const h = getHeight();
    const captionClass = ['chart-caption', captionClassName].filter(Boolean).join(' ');

    return (
        <div className={`plotly-chart-container ${className || ''}`.trim()}>
            <div
                className="plotly-chart-container__plot"
                style={{
                    minHeight: `${h}px`,
                    height: `${h}px`
                }}
            >
                <Plot
                    ref={plotRef}
                    data={data}
                    layout={{
                        ...layout,
                        height: h,
                        width: undefined,
                        autosize: true
                    }}
                    config={{
                        ...config,
                        responsive: true
                    }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                    onInitialized={(_figure, graphDiv) => {
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
                <p className={captionClass} dangerouslySetInnerHTML={{ __html: caption }} />
            )}
        </div>
    );
};

export default ResponsivePlotlyChart;
