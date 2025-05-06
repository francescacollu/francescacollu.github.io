import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ItalyMapProps {
  width?: number;
  height?: number;
  highlightedRegion?: string;
}


const ItalyMap: React.FC<ItalyMapProps> = ({ 
  width = 800, 
  height = 600,
  highlightedRegion 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<any>(null);


  useEffect(() => {
    d3.json("/data/it.json").then((data: any) => {
      setGeoData(data);
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current || !geoData) return;

    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    const g = svg.append("g");
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
      .attr("class", "region");
  }, [geoData, width, height]);

  useEffect(() => {
    if (!svgRef.current || !geoData) return;

    d3.select(svgRef.current)
      .selectAll(".region")
      .attr("fill", (d: any) => {
        return d.properties.name === highlightedRegion ? "orange" : "black";
      });
  }, [highlightedRegion, geoData]);

  return (
    <div className='map-container'>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ItalyMap; 