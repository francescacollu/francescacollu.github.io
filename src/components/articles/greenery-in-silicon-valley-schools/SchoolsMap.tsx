import React, { useCallback, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPoints from './charts/map_points.json';

export interface MapPoint {
  id: string;
  school_name: string;
  city: string;
  lat: number;
  lon: number;
  ndvi_mean: number;
  greenery_index_ndvi_nlcd: number;
  percent_eligible_frpm_k12: number;
  frpm_quartile_label: string;
  marker_color: string;
}

const data = mapPoints as MapPoint[];

interface SchoolsMapProps {
  className?: string;
  minHeight?: string;
  caption?: string;
}

const frpmToPercent = (x: number) => Math.round(x * 100);

const SchoolsMap: React.FC<SchoolsMapProps> = ({
  className = '',
  minHeight = '480px',
  caption,
}) => {
  const bounds = useMemo(() => {
    if (data.length === 0) return null;
    return L.latLngBounds(data.map((p) => [p.lat, p.lon] as [number, number]));
  }, []);

  const [frpmLowPct, setFrpmLowPct] = useState(0);
  const [frpmHighPct, setFrpmHighPct] = useState(100);

  const onLowChange = useCallback(
    (v: number) => {
      setFrpmLowPct(Math.min(Math.max(0, v), frpmHighPct));
    },
    [frpmHighPct]
  );

  const onHighChange = useCallback(
    (v: number) => {
      setFrpmHighPct(Math.max(Math.min(100, v), frpmLowPct));
    },
    [frpmLowPct]
  );

  const filtered = useMemo(
    () =>
      data.filter((p) => {
        const pct = frpmToPercent(p.percent_eligible_frpm_k12);
        return pct >= frpmLowPct && pct <= frpmHighPct;
      }),
    [frpmLowPct, frpmHighPct]
  );

  if (!bounds) {
    return null;
  }

  const pctLabel = (x: number) => `${Math.round(x * 100)}%`;

  return (
    <figure className={`greenery-schools-map-figure ${className}`.trim()}>
      <div className="greenery-map-stack">
        <div className="greenery-schools-map" style={{ minHeight }}>
          <MapContainer
            bounds={bounds}
            boundsOptions={{ padding: [28, 28] }}
            scrollWheelZoom
            style={{ height: minHeight, width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />
            {filtered.map((p) => (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lon]}
                radius={7}
                pathOptions={{
                  fillColor: p.marker_color,
                  color: 'rgba(255,255,255,0.38)',
                  weight: 1,
                  fillOpacity: 0.92,
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -8]}
                  opacity={1}
                  className="greenery-schools-map-tooltip"
                >
                  <div className="greenery-tooltip-inner">
                    <div className="greenery-tooltip-inner__name">{p.school_name}</div>
                    <div>{p.city}</div>
                    <div>FRPM (K-12): {pctLabel(p.percent_eligible_frpm_k12)}</div>
                    <div>Greenery index: {p.greenery_index_ndvi_nlcd.toFixed(3)}</div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="greenery-schools-map-popup">
                    <strong>{p.school_name}</strong>
                    <div>{p.city}</div>
                    <div>FRPM-eligible (K-12): {pctLabel(p.percent_eligible_frpm_k12)}</div>
                    <div>Greenery index: {p.greenery_index_ndvi_nlcd.toFixed(3)}</div>
                    <div>Quartile: {p.frpm_quartile_label}</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="greenery-map-overlay">
          <div className="greenery-map-legend">
            <div className="greenery-map-legend__title">Greenery index</div>
            <div className="greenery-map-legend__bar" />
            <div className="greenery-map-legend__labels">
              <span>Low</span>
              <span>High</span>
            </div>
            <p className="greenery-map-legend__note">
              Marker fill reflects relative greenery (greyer = lower, greener = higher).
            </p>
          </div>

          <div className="greenery-map-frpm">
            <div className="greenery-map-frpm__header">
              <span className="greenery-map-frpm__label">Filter by FRPM share (K-12)</span>
              <span className="greenery-map-frpm__count">
                {filtered.length} / {data.length} schools
              </span>
            </div>
            <div className="greenery-map-frpm__values">
              <span>{frpmLowPct}%</span>
              <span>{frpmHighPct}%</span>
            </div>
            <div className="greenery-map-frpm__dual">
              <div
                className="greenery-map-frpm__track"
                style={
                  {
                    '--low': `${frpmLowPct}%`,
                    '--high': `${frpmHighPct}%`,
                  } as React.CSSProperties
                }
              />
              <input
                type="range"
                min={0}
                max={100}
                value={frpmLowPct}
                onChange={(e) => onLowChange(Number(e.target.value))}
                className="greenery-map-frpm__range greenery-map-frpm__range--low"
                aria-label="Minimum FRPM percentage"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={frpmHighPct}
                onChange={(e) => onHighChange(Number(e.target.value))}
                className="greenery-map-frpm__range greenery-map-frpm__range--high"
                aria-label="Maximum FRPM percentage"
              />
            </div>
          </div>
        </div>
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

export default SchoolsMap;
