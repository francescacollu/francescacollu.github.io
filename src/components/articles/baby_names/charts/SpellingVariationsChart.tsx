import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Plotly from 'plotly.js-dist-min';
import '../styles/spelling-variations.css';

interface VariantData {
    year: number;
    phonetic: string;
    sex: string;
    top_variant: string;
    num_variants: number;
    total_count: number;
    variant_details: string;
    variant_names: string;
}

interface SpellingVariationsChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const SpellingVariationsChart: React.FC<SpellingVariationsChartProps> = ({
    caption,
    className,
    minHeight = '600px'
}) => {
    const [data, setData] = useState<VariantData[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2000);
    const [years, setYears] = useState<number[]>([]);
    const [selectedName, setSelectedName] = useState<VariantData | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const plotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Load and parse CSV data
        const loadData = async () => {
            try {
                const response = await fetch('/data/articles/baby-names/spelling_variation_timeseries.csv');
                
                if (!response.ok) {
                    throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
                }
                
                const csvText = await response.text();
                const lines = csvText.trim().split('\n');
                
                const parsedData: VariantData[] = lines.slice(1).map(line => {
                    const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
                    const cleanValues = values.map(v => v.replace(/^"|"$/g, ''));
                    
                    return {
                        year: parseInt(cleanValues[0]),
                        phonetic: cleanValues[1],
                        sex: cleanValues[2],
                        top_variant: cleanValues[3],
                        num_variants: parseInt(cleanValues[4]),
                        total_count: parseInt(cleanValues[5]),
                        variant_details: cleanValues[6],
                        variant_names: cleanValues[7]
                    };
                }).filter(d => d.num_variants >= 5);

                setData(parsedData);
                
                // Extract unique years and sort
                const uniqueYears = Array.from(new Set(parsedData.map(d => d.year))).sort((a, b) => a - b);
                setYears(uniqueYears);
                
                // Set initial year to the middle of the range
                if (uniqueYears.length > 0) {
                    const middleIndex = Math.floor(uniqueYears.length / 2);
                    setSelectedYear(uniqueYears[middleIndex]);
                }
            } catch (error) {
                console.error('Error loading CSV:', error);
            }
        };
        
        loadData();
    }, []);

    useEffect(() => {
        if (plotRef.current && data.length > 0) {
            const yearData = data.filter(d => d.year === selectedYear);
            
            // Sort by total count and take top 20
            const topNames = yearData
                .sort((a, b) => b.total_count - a.total_count)
                .slice(0, 20);

            const maleNames = topNames.filter(d => d.sex === 'M');
            const femaleNames = topNames.filter(d => d.sex === 'F');

            const traces = [
                {
                    x: maleNames.map(d => d.total_count),
                    y: maleNames.map(d => d.top_variant),
                    type: 'bar',
                    orientation: 'h',
                    name: 'Male',
                    marker: { color: '#4A90E2' },
                    hovertemplate: '<b>%{y}</b><br>' +
                                   'Count: %{x}<br>' +
                                   'Variations: %{customdata}<br>' +
                                   '<extra></extra>',
                    customdata: maleNames.map(d => d.num_variants)
                },
                {
                    x: femaleNames.map(d => d.total_count),
                    y: femaleNames.map(d => d.top_variant),
                    type: 'bar',
                    orientation: 'h',
                    name: 'Female',
                    marker: { color: '#E85D75' },
                    hovertemplate: '<b>%{y}</b><br>' +
                                   'Count: %{x}<br>' +
                                   'Variations: %{customdata}<br>' +
                                   '<extra></extra>',
                    customdata: femaleNames.map(d => d.num_variants)
                }
            ];

            const layout = {
                title: {
                    text: isMobile ? `Top Names with 5+ Variations (${selectedYear})` : `Top Names with 5+ Spelling Variations in ${selectedYear}`,
                    font: { size: isMobile ? 14 : 18 }
                },
                xaxis: {
                    title: 'Total Count',
                    titlefont: { size: isMobile ? 11 : 14 }
                },
                yaxis: {
                    title: '',
                    automargin: true,
                    tickfont: { size: isMobile ? 10 : 12 }
                },
                height: isMobile ? 500 : 600,
                margin: { l: isMobile ? 80 : 100, r: 20, t: isMobile ? 50 : 80, b: 60 },
                autosize: true,
                showlegend: true,
                legend: {
                    x: isMobile ? 0.5 : 1,
                    y: isMobile ? 1.15 : 1,
                    xanchor: isMobile ? 'center' : 'right',
                    yanchor: 'top',
                    orientation: isMobile ? 'h' : 'v'
                },
                hovermode: 'closest'
            };

            const config = {
                responsive: true,
                displayModeBar: !isMobile,
                displaylogo: false
            };

            Plotly.newPlot(plotRef.current, traces, layout, config).then(() => {
                // Add click handler after plot is created
                if (plotRef.current) {
                    (plotRef.current as any).on('plotly_click', (eventData: any) => {
                        const point = eventData.points[0];
                        const clickedName = point.y;
                        const sex = point.data.name;
                        
                        const nameData = topNames.find(d => 
                            d.top_variant === clickedName && 
                            (sex === 'Male' ? d.sex === 'M' : d.sex === 'F')
                        );
                        
                        if (nameData) {
                            setSelectedName(nameData);
                        }
                    });
                }
            });

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
    }, [data, selectedYear, isMobile]);

    const parseVariantDetails = (variantDetails: string): { name: string; count: number }[] => {
        return variantDetails.split('|').map(variant => {
            const [name, count] = variant.split(':');
            return { name, count: parseInt(count) };
        });
    };

    const closeModal = () => {
        setSelectedName(null);
    };

    return (
        <div className={`spelling-variations-container ${className || ''}`}>
            <div className="year-selector-container">
                <label htmlFor="year-selector" className="year-selector-label">
                    Select Year:
                </label>
                <select
                    id="year-selector"
                    className="year-selector"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div ref={plotRef} style={{ width: '100%', minHeight }} />

            {caption && (
                <p 
                    className="chart-caption" 
                    dangerouslySetInnerHTML={{ __html: caption }}
                />
            )}

            {selectedName && (
                <div className="word-cloud-modal" onClick={closeModal}>
                    <div className="word-cloud-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>&times;</button>
                        <h3 className="word-cloud-title">
                            Spelling Variations of "{selectedName.top_variant}"
                        </h3>
                        <p className="word-cloud-subtitle">
                            {selectedName.num_variants} variations | {selectedName.total_count.toLocaleString()} total occurrences | {selectedYear}
                        </p>
                        <div className="word-cloud">
                            {parseVariantDetails(selectedName.variant_details).map((variant, index) => {
                                const maxCount = parseVariantDetails(selectedName.variant_details)[0].count;
                                const minCount = parseVariantDetails(selectedName.variant_details)[
                                    parseVariantDetails(selectedName.variant_details).length - 1
                                ].count;
                                const range = maxCount - minCount || 1;
                                const normalizedSize = ((variant.count - minCount) / range);
                                const fontSize = isMobile 
                                    ? 0.8 + normalizedSize * 2.2
                                    : 1 + normalizedSize * 3;
                                
                                return (
                                    <span
                                        key={index}
                                        className="word-cloud-item"
                                        style={{
                                            fontSize: `${fontSize}rem`,
                                            opacity: 0.6 + normalizedSize * 0.4
                                        }}
                                        title={`${variant.name}: ${variant.count.toLocaleString()} occurrences`}
                                    >
                                        {variant.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpellingVariationsChart;

