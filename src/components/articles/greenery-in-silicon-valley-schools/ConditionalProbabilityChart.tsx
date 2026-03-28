import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import raw from './charts/frpm_vs_noneligible_conditional_greenery_index_bin_probability_sv_100m_2bins.json';

interface Row {
  metric_col: string;
  bin_strategy: string;
  bin_label: string;
  group: string;
  probability: number;
}

const rows = (raw as { conditional_bin_probabilities: Row[] }).conditional_bin_probabilities.filter(
  (r) => r.metric_col === 'greenery_index_ndvi_nlcd' && r.bin_strategy === 'quantile'
);

const GROUPS = ['FRPM-eligible', 'Non-eligible'] as const;

const GROUP_COLORS: Record<string, string> = {
  'FRPM-eligible': '#7d7d7d',
  'Non-eligible': '#262626',
};

const GROUP_LEGEND_LABEL: Record<(typeof GROUPS)[number], string> = {
  'FRPM-eligible': 'FRPM-eligible (low income)',
  'Non-eligible': 'Not FRPM-eligible (high income)',
};

const BIN_DISPLAY_LABEL: Record<string, string> = {
  Q1: 'Low greenery index',
  Q2: 'High greenery index',
};

const BIN_DISPLAY_LABEL_NARROW: Record<string, string> = {
  Q1: 'Low greenery',
  Q2: 'High greenery',
};

/** Match GreeneryFrpmScatterChart / article mobile breakpoint. */
const NARROW_VIEWPORT_MAX_PX = 768;

const DEFAULT_CHART_TITLE = 'What is the probability that a student goes to a school with low versus high greenery index, given their household economic status?';
const DEFAULT_CHART_SUBTITLE =
  'Conditional probability that a student goes to a school with a low versus high greenery index, given the student is FRPM-eligible or not';

/** SVG viewBox height; keep container minHeight in sync to avoid a gap above the caption. */
const CONDITIONAL_CHART_PLOT_HEIGHT_PX = 380;

/** Probability on 0–100 scale, rounded to 2 decimal places; tooltip appends "%". */
function formatProbabilityPercentValue(p: number): string {
  return (p * 100).toFixed(2);
}

/** Same value with % suffix (e.g. aria-label). */
function formatProbabilityPercentWithSuffix(p: number): string {
  return `${formatProbabilityPercentValue(p)}%`;
}

interface TooltipState {
  x: number;
  y: number;
  bin: string;
  group: string;
  probabilityPct: string;
}

interface ConditionalProbabilityChartProps {
  className?: string;
  minHeight?: string;
  caption?: string;
  title?: string;
  subtitle?: string;
}

const ConditionalProbabilityChart: React.FC<ConditionalProbabilityChartProps> = ({
  className = '',
  minHeight = `${CONDITIONAL_CHART_PLOT_HEIGHT_PX}px`,
  caption,
  title = DEFAULT_CHART_TITLE,
  subtitle = DEFAULT_CHART_SUBTITLE,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);
  const [isNarrowViewport, setIsNarrowViewport] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < NARROW_VIEWPORT_MAX_PX
  );
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const binKeys = useMemo(() => {
    const labels = Array.from(new Set(rows.map((r) => r.bin_label)));
    return labels.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, []);

  useEffect(() => {
    const check = () => setIsNarrowViewport(window.innerWidth < NARROW_VIEWPORT_MAX_PX);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const binDisplayLabels = useMemo(() => {
    const map = isNarrowViewport ? BIN_DISPLAY_LABEL_NARROW : BIN_DISPLAY_LABEL;
    return binKeys.map((k) => map[k] ?? BIN_DISPLAY_LABEL[k] ?? k);
  }, [binKeys, isNarrowViewport]);

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

    const plotH = CONDITIONAL_CHART_PLOT_HEIGHT_PX;
    const margin = { top: 28, right: 24, bottom: 52, left: 24 };
    const innerW = width - margin.left - margin.right;
    const innerH = plotH - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', plotH);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().domain(binDisplayLabels).range([0, innerW]).padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain([...GROUPS])
      .range([0, x0.bandwidth()])
      .padding(0.03);

    const maxP = d3.max(rows, (r) => r.probability) ?? 1;
    const y = d3
      .scaleLinear()
      .domain([0, Math.min(1, maxP * 1.12)])
      .nice()
      .range([innerH, 0]);

    const showTip = (ev: MouseEvent, binDisplay: string, grp: (typeof GROUPS)[number], p: number) => {
      const wrap = containerRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      setTooltip({
        x: ev.clientX - r.left + wrap.scrollLeft,
        y: ev.clientY - r.top + wrap.scrollTop,
        bin: binDisplay,
        group: GROUP_LEGEND_LABEL[grp],
        probabilityPct: formatProbabilityPercentValue(p),
      });
    };

    const moveTip = (ev: MouseEvent) => {
      const wrap = containerRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      setTooltip((prev) =>
        prev
          ? {
              ...prev,
              x: ev.clientX - r.left + wrap.scrollLeft,
              y: ev.clientY - r.top + wrap.scrollTop,
            }
          : null
      );
    };

    const hideTip = () => setTooltip(null);

    for (let i = 0; i < binKeys.length; i++) {
      const binKey = binKeys[i];
      const binDisplay = binDisplayLabels[i];
      const xBase = x0(binDisplay);
      if (xBase === undefined) continue;
      for (const grp of GROUPS) {
        const p = probLookup.get(`${binKey}\t${grp}`) ?? 0;
        const x = xBase + (x1(grp) ?? 0);
        const bw = x1.bandwidth();
        const yTop = y(p);
        g.append('rect')
          .attr('x', x)
          .attr('y', yTop)
          .attr('width', bw)
          .attr('height', innerH - yTop)
          .attr('fill', GROUP_COLORS[grp] ?? '#888')
          .attr('opacity', 0.9)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 0.5)
          .attr('cursor', 'pointer')
          .attr('aria-label', `${GROUP_LEGEND_LABEL[grp]}, ${binDisplay}, ${formatProbabilityPercentWithSuffix(p)}`)
          .on('mouseenter', function (ev: MouseEvent) {
            d3.select(this).attr('opacity', 1).attr('stroke-width', 1);
            showTip(ev, binDisplay, grp, p);
          })
          .on('mousemove', (ev: MouseEvent) => moveTip(ev))
          .on('mouseleave', function () {
            d3.select(this).attr('opacity', 0.9).attr('stroke-width', 0.5);
            hideTip();
          });

        g.append('text')
          .attr('x', x + bw / 2)
          .attr('y', yTop - 6)
          .attr('text-anchor', 'middle')
          .attr('font-family', 'Georgia, serif')
          .attr('font-size', 12)
          .attr('font-weight', 'bold')
          .attr('fill', '#000000')
          .attr('pointer-events', 'none')
          .text(`${Math.round(p * 100)}%`);
      }
    }

    const xAxisG = g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x0).tickSizeOuter(0));
    xAxisG.select('.domain').attr('stroke', '#000000');
    xAxisG
      .selectAll('.tick line')
      .attr('stroke', '#000000');
    xAxisG
      .selectAll('text')
      .attr('transform', '')
      .style('text-anchor', 'middle')
      .attr('dx', '0')
      .attr('dy', '0.71em')
      .style('font-family', 'Georgia, serif')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#000000');

    const legend = g.append('g').attr('transform', `translate(${innerW - 210}, 0)`);
    GROUPS.forEach((grp, i) => {
      const lg = legend.append('g').attr('transform', `translate(0, ${i * 22})`);
      lg.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', GROUP_COLORS[grp])
        .attr('opacity', 0.9)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 0.5);
      lg.append('text')
        .attr('x', 18)
        .attr('y', 11)
        .attr('font-family', 'Georgia, serif')
        .attr('font-size', '14px')
        .style('fill', '#000000')
        .text(GROUP_LEGEND_LABEL[grp]);
    });

    return () => setTooltip(null);
  }, [width, binKeys, binDisplayLabels, probLookup]);

  return (
    <div className={`plotly-chart-container ${className}`.trim()}>
      <div className="plotly-chart-container__plot">
        <div className="article-chart-plot-head">
          <h2 className="article-chart-plot-title">{title}</h2>
          <p className="article-chart-plot-subtitle">{subtitle}</p>
        </div>
        <div ref={containerRef} className="greenery-d3-chart__inner" style={{ minHeight }}>
          <svg
            ref={svgRef}
            className="greenery-d3-chart__svg"
            role="img"
            aria-label="Conditional probability of low versus high greenery index by household income proxy"
          />
          {tooltip && (
            <div
              className="greenery-conditional-tooltip"
              style={{ left: tooltip.x, top: tooltip.y }}
              role="status"
              aria-live="polite"
            >
              <div className="greenery-conditional-tooltip__group">{tooltip.group}</div>
              <div className="greenery-conditional-tooltip__bin">{tooltip.bin}</div>
              <div className="greenery-conditional-tooltip__metric">
                <span className="greenery-conditional-tooltip__label">Probability: </span>{' '}
                <span className="greenery-conditional-tooltip__value">{tooltip.probabilityPct}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {caption && <p className="chart-caption" dangerouslySetInnerHTML={{ __html: caption }} />}
    </div>
  );
};

export default ConditionalProbabilityChart;
