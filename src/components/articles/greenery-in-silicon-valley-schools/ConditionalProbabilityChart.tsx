import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import raw from './charts/conditional_probability_greenery_bins.json';

interface Row {
  metric_col: string;
  bin_strategy: string;
  bin_label: string;
  group: string;
  probability: number;
}

const rows = (raw as Row[]).filter(
  (r) => r.metric_col === 'greenery_index_ndvi_nlcd' && r.bin_strategy === 'equal_width_0_1'
);

const GROUPS = ['FRPM-eligible', 'Non-eligible'] as const;

const GROUP_COLORS: Record<string, string> = {
  'FRPM-eligible': '#1b4332',
  'Non-eligible': '#457b9d',
};

interface ConditionalProbabilityChartProps {
  className?: string;
  minHeight?: string;
  caption?: string;
}

const ConditionalProbabilityChart: React.FC<ConditionalProbabilityChartProps> = ({
  className = '',
  minHeight = '420px',
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  const binLabels = useMemo(() => {
    const labels = Array.from(new Set(rows.map((r) => r.bin_label)));
    return labels.sort((a, b) => {
      const na = parseInt(a, 10);
      const nb = parseInt(b, 10);
      return na - nb;
    });
  }, []);

  const probLookup = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) {
      m.set(`${r.bin_label}\t${r.group}`, r.probability);
    }
    return m;
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

    const height = 380;
    const margin = { top: 16, right: 20, bottom: 88, left: 52 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().domain(binLabels).range([0, innerW]).padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain([...GROUPS])
      .range([0, x0.bandwidth()])
      .padding(0.12);

    const maxP = d3.max(rows, (r) => r.probability) ?? 1;
    const y = d3
      .scaleLinear()
      .domain([0, Math.min(1, maxP * 1.08)])
      .nice()
      .range([innerH, 0]);

    for (const bin of binLabels) {
      const xBase = x0(bin);
      if (xBase === undefined) continue;
      for (const grp of GROUPS) {
        const p = probLookup.get(`${bin}\t${grp}`) ?? 0;
        const x = xBase + (x1(grp) ?? 0);
        g.append('rect')
          .attr('x', x)
          .attr('y', y(p))
          .attr('width', x1.bandwidth())
          .attr('height', innerH - y(p))
          .attr('fill', GROUP_COLORS[grp] ?? '#888');
      }
    }

    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end')
      .attr('dx', '-0.35em')
      .attr('dy', '0.35em');

    g.append('g').call(
      d3
        .axisLeft(y)
        .ticks(8)
        .tickFormat((d) => `${d3.format('.0f')(Number(d) * 100)}%`)
    );

    g.append('text')
      .attr('x', innerW / 2)
      .attr('y', innerH + 72)
      .attr('text-anchor', 'middle')
      .attr('fill', '#444')
      .attr('font-size', '13px')
      .text('Greenery index bin (equal width)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerH / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#444')
      .attr('font-size', '13px')
      .text('P (bin | group)');

    const legend = g.append('g').attr('transform', `translate(${innerW - 200}, -4)`);
    GROUPS.forEach((grp, i) => {
      const lg = legend.append('g').attr('transform', `translate(0, ${i * 18})`);
      lg.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', GROUP_COLORS[grp]);
      lg.append('text')
        .attr('x', 18)
        .attr('y', 11)
        .attr('fill', '#333')
        .attr('font-size', '12px')
        .text(grp);
    });
  }, [width, binLabels, probLookup]);

  return (
    <figure className={`greenery-d3-chart ${className}`.trim()}>
      <div ref={containerRef} className="greenery-d3-chart__inner" style={{ minHeight }}>
        <svg ref={svgRef} className="greenery-d3-chart__svg" role="img" aria-label="Conditional probability by greenery bin and FRPM group" />
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

export default ConditionalProbabilityChart;
