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

const COLOR_TEXT = '#000000';
const TICK_PX = 14;
const AXIS_LABEL_PX = 14;

interface GreeneryFrpmScatterChartProps {
  className?: string;
  minHeight?: string;
  caption?: string;
  titleHtml?: string;
  subtitleHtml?: string;
}

const GreeneryFrpmScatterChart: React.FC<GreeneryFrpmScatterChartProps> = ({
  className = '',
  minHeight = '600px',
  caption,
  titleHtml = '<b>How much greenery do schools have with respect to their FRPM eligible students share?</b>',
  subtitleHtml = 'Each point is one school. Schools with high FRPM share tend to have less greenery',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
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
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const plotHeight = useMemo(() => {
    const base = parseInt(minHeight, 10) || 600;
    const shell = isMobile ? Math.max(400, Math.round(base * 0.7)) : base;
    const headReserve = isMobile ? 76 : 88;
    return Math.max(320, shell - headReserve);
  }, [minHeight, isMobile]);

  useEffect(() => {
    if (!svgRef.current || width < 40) return;

    const height = plotHeight;
    const margin = isMobile
      ? { top: 12, right: 20, bottom: 78, left: 56 }
      : { top: 12, right: 20, bottom: 52, left: 56 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    let fontFamily = 'Georgia, serif';
    if (containerRef.current) {
      const ff = getComputedStyle(containerRef.current)
        .getPropertyValue('--article-font-family')
        .trim();
      if (ff) fontFamily = ff;
    }

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain(extents.x).range([0, innerW]);
    const y = d3.scaleLinear().domain(extents.y).range([innerH, 0]);

    const yMin = extents.y[0];
    const yMax = extents.y[1];
    const yTickValues = d3
      .range(0, 1.0001, 0.1)
      .filter((v) => v >= yMin - 1e-9 && v <= yMax + 1e-9);
    const yTicksForGrid = yTickValues.length > 0 ? yTickValues : y.ticks(8);

    g.append('g')
      .attr('class', 'article-chart-grid')
      .selectAll('line')
      .data(yTicksForGrid)
      .join('line')
      .attr('x1', 0)
      .attr('x2', innerW)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d));

    const xAxis = d3
      .axisBottom(x)
      .ticks(8)
      .tickFormat((d) => `${d3.format('.0f')(Number(d) * 100)}%`);

    const yAxis = d3.axisLeft(y).tickFormat(d3.format('.1f'));
    if (yTickValues.length) yAxis.tickValues(yTickValues);
    else yAxis.ticks(8);

    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
      .call(xAxis)
      .call((sel) => {
        const texts = sel
          .selectAll('text')
          .attr('fill', COLOR_TEXT)
          .style('font-size', `${TICK_PX}px`)
          .style('font-weight', '700')
          .style('font-family', fontFamily);
        if (isMobile) {
          texts
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
            .attr('dx', '-0.35em')
            .attr('dy', '0.15em');
        }
      })
      .call((sel) => sel.selectAll('line,path').attr('stroke', '#444'));

    g.append('g')
      .call(yAxis)
      .call((sel) =>
        sel
          .selectAll('text')
          .attr('fill', COLOR_TEXT)
          .style('font-size', `${TICK_PX}px`)
          .style('font-weight', '700')
          .style('font-family', fontFamily)
      )
      .call((sel) => sel.selectAll('line,path').attr('stroke', '#444'));

    g.append('text')
      .attr('x', innerW / 2)
      .attr('y', innerH + (isMobile ? 58 : 40))
      .attr('text-anchor', 'middle')
      .attr('fill', COLOR_TEXT)
      .attr('font-size', `${AXIS_LABEL_PX}px`)
      .attr('font-weight', '700')
      .style('font-family', fontFamily)
      .text('FRPM-eligible share');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerH / 2)
      .attr('y', -44)
      .attr('text-anchor', 'middle')
      .attr('fill', COLOR_TEXT)
      .attr('font-size', `${AXIS_LABEL_PX}px`)
      .attr('font-weight', '700')
      .style('font-family', fontFamily)
      .text('Greenery index');

    const dotLayer = g.append('g').attr('class', 'greenery-scatter-dots');

    dotLayer
      .selectAll('circle')
      .data(points)
      .join('circle')
      .attr('cx', (d) => x(d.x_frpm))
      .attr('cy', (d) => y(d.y_greenery_index))
      .attr('r', 7)
      .attr('fill', '#113f39')
      .attr('fill-opacity', 0.65)
      .style('cursor', 'crosshair')
      .on('mouseenter', function (event, d) {
        const [px, py] = d3.pointer(event, containerRef.current);
        setTip({
          x: px,
          y: py,
          name: d.school_name,
          city: d.city,
          xPct: `${Math.round(d.x_frpm * 100)}%`,
          yVal: d.y_greenery_index.toFixed(2),
        });
      })
      .on('mousemove', function (event) {
        const [px, py] = d3.pointer(event, containerRef.current);
        setTip((prev) => (prev ? { ...prev, x: px, y: py } : null));
      })
      .on('mouseleave', () => setTip(null));
  }, [width, extents, plotHeight, isMobile]);

  return (
    <div className={`plotly-chart-container ${className}`.trim()}>
      <div className="plotly-chart-container__plot">
        <div className="article-chart-plot-head">
          <h2 className="article-chart-plot-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="article-chart-plot-subtitle" dangerouslySetInnerHTML={{ __html: subtitleHtml }} />
        </div>
        <div
          ref={containerRef}
          className="greenery-scatter-wrap"
          style={{ minHeight: plotHeight, position: 'relative', width: '100%' }}
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
              <div>FRPM share: {tip.xPct}</div>
              <div>Greenery index: {tip.yVal}</div>
            </div>
          )}
        </div>
      </div>
      {caption && <p className="chart-caption" dangerouslySetInnerHTML={{ __html: caption }} />}
    </div>
  );
};

export default GreeneryFrpmScatterChart;
