import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface RegionData {
  region: string;
  value: number;
}

interface ItalyMapProps {
  width?: number;
  height?: number;
  highlightedRegion?: string;
  dataPath: string;
  currentStep?: number;
}

const ItalyMap: React.FC<ItalyMapProps> = ({ 
  width = 800, 
  height = 600,
  highlightedRegion,
  dataPath,
  currentStep = 0
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<any>(null);
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
    d3.json("/data/it.json").then((data: any) => {
      setGeoData(data);
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current || !geoData || Object.keys(regionData).length === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    const g = svg.append("g");

    const values = Object.values(regionData);
    const [min, max] = d3.extent(values) as [number, number];
    const mid = (min + max) / 2;

    const colorScale = d3.scaleDiverging<string>()
      .domain([min, mid, max])
      .interpolator(d3.interpolateRdBu);

    const projection = d3.geoMercator()
      .center([12.5, 42])
      .scale(2000)
      .translate([width / 2, height / 2]);
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
        return value <= (thresholds[currentStep as keyof typeof thresholds] || 0) ? colorScale(value) : "black";
      });

  }, [geoData, width, height, regionData, currentStep]);

  return (
      <svg ref={svgRef}></svg>
  );
};

export default ItalyMap; 