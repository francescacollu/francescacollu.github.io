import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import raw from './charts/scatter_greenery_vs_frpm.json';

interface Point {
  id: string;
  school_name: string;
  city: string;
  x_frpm: number;
  y_greenery_index: number;
}

const points = raw as Point[];

interface GreeneryFrpmScatterChartProps {
  className?: string;
  minHeight?: string;
  caption?: string;
}

const GreeneryFrpmScatterChart: React.FC<GreeneryFrpmScatterChartProps> = ({
  className = '',
  minHeight = '440px',
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);
  const [tip, setTip] = useState<{
    x: number;
    y: number;
    name: string;
    city: string;
    xPct: string;
    yVal: string;
  } | null>(null);

  const extents = useMemo(() => {
    const xs = points.map((p) => p.x_frpm);
    const ys = points.map((p) => p.y_greenery_index);
    const padX = (d3.max(xs)! - d3.min(xs)!) * 0.04 || 0.02;
    const padY = (d3.max(ys)! - d3.min(ys)!) * 0.04 || 0.02;
    return {
      x: [d3.min(xs)! - padX, d3.max(xs)! + padX] as [number, number],
      y: [Math.max(0, d3.min(ys)! - padY), d3.max(ys)! + padY] as [number, number],
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || width < 40) return;

    const height = 400;
    const margin = { top: 16, right: 20, bottom: 52, left: 56 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain(extents.x).range([0, innerW]);
    const y = d3.scaleLinear().domain(extents.y).range([innerH, 0]);

    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(8)
          .tickFormat((d) => `${d3.format('.0f')(Number(d) * 100)}%`)
      );

    g.append('g').call(d3.axisLeft(y).ticks(8).tickFormat(d3.format('.2f')));

    g.append('text')
      .attr('x', innerW / 2)
      .attr('y', innerH + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#444')
      .attr('font-size', '13px')
      .text('FRPM-eligible share (K-12)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerH / 2)
      .attr('y', -44)
      .attr('text-anchor', 'middle')
      .attr('fill', '#444')
      .attr('font-size', '13px')
      .text('Greenery index');

    const dotLayer = g.append('g').attr('class', 'greenery-scatter-dots');

    dotLayer
      .selectAll('circle')
      .data(points)
      .join('circle')
      .attr('cx', (d) => x(d.x_frpm))
      .attr('cy', (d) => y(d.y_greenery_index))
      .attr('r', 4)
      .attr('fill', '#240046')
      .attr('fill-opacity', 0.55)
      .attr('stroke', '#1e1e24')
      .attr('stroke-width', 0.4)
      .style('cursor', 'crosshair')
      .on('mouseenter', function (event, d) {
        const [px, py] = d3.pointer(event, containerRef.current);
        setTip({
          x: px,
          y: py,
          name: d.school_name,
          city: d.city,
          xPct: `${Math.round(d.x_frpm * 100)}%`,
          yVal: d.y_greenery_index.toFixed(3),
        });
      })
      .on('mousemove', function (event) {
        const [px, py] = d3.pointer(event, containerRef.current);
        setTip((prev) => (prev ? { ...prev, x: px, y: py } : null));
      })
      .on('mouseleave', () => setTip(null));
  }, [width, extents]);

  return (
    <figure className={`greenery-d3-chart ${className}`.trim()}>
      <div
        ref={containerRef}
        className="greenery-d3-chart__inner greenery-scatter-wrap"
        style={{ minHeight, position: 'relative' }}
      >
        <svg ref={svgRef} className="greenery-d3-chart__svg" role="img" aria-label="Greenery index versus FRPM eligibility" />
        {tip && (
          <div
            className="greenery-scatter-tooltip"
            style={{
              left: tip.x + 12,
              top: tip.y + 12,
            }}
          >
            <div className="greenery-scatter-tooltip__title">{tip.name}</div>
            <div>{tip.city}</div>
            <div>FRPM: {tip.xPct}</div>
            <div>Greenery: {tip.yVal}</div>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className="article-figure-caption"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};

export default GreeneryFrpmScatterChart;
