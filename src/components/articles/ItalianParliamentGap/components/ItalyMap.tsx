import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ItalyMapProps {
  width: string;
  height: string;
  dataPath: string;
  currentStep?: number;
}

const ItalyMap: React.FC<ItalyMapProps> = ({ 
  width, 
  height,
  dataPath,
  currentStep = 0
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [dimensions, setDimensions] = useState<{ width: number, height: number } | null>({ width: 0, height: 0 });
  const [regionData, setRegionData] = useState<Record<string, number>>({});

  useEffect(() => {
    d3.csv(dataPath).then((data: any) => {
      const dataMap = data.reduce((acc: Record<string, number>, row: any) => {
        acc[row.region] = +row.value;  // Convert string to number
        return acc;
      }, {});
      setRegionData(dataMap);
    });
  }, [dataPath]);

  useEffect(() => {
    if (!containerRef.current) {
        console.error('ItalyMap containerRef.current is null');
        return;
    }
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
}, []);
  
  useEffect(() => {
    d3.json("/data/it.json").then((data: any) => {
      setGeoData(data);
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current || !geoData || Object.keys(regionData).length === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current)
      .attr("width", JSON.stringify(width))
      .attr("height", JSON.stringify(height));
    const g = svg.append("g");

    const values = Object.values(regionData);
    const [min, max] = d3.extent(values) as [number, number];
    const mid = (min + max) / 2;

    const colorScale = d3.scaleDiverging<string>()
      .domain([min, mid, max])
      .interpolator(d3.interpolateRdBu);

    if (!dimensions) {
      return;
    }

    const minSize = Math.min(dimensions.width, dimensions.height);
    const projection = d3.geoMercator()
      .center([12.5, 42])
      .scale(minSize * 4)
      .translate([dimensions.width / 2, dimensions.height / 2]);
    const path = d3.geoPath().projection(projection);

    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("stroke", "#999")
      .attr("stroke-width", 0.5)
      .attr("class", "region")
      .attr("fill", (d: any) => {
        const value = Number(regionData[d.properties.name as keyof typeof regionData]) || 0;
        const thresholds = {
          1: 0.9,
          2: 1.15,  
          3: Infinity
        };
        const out = value <= (thresholds[currentStep as keyof typeof thresholds] || 0) ? colorScale(value) : "black";
        return out;
      });

  }, [geoData, regionData, dimensions, currentStep]);
  
  return (
     <div style={{ width, height }} ref={containerRef}>
       <svg ref={svgRef}></svg>
     </div>
  );
};

export default ItalyMap; 