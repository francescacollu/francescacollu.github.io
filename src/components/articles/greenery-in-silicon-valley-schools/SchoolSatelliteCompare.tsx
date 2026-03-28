import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const IMG_BASE = `${process.env.PUBLIC_URL}/images/articles/greenery-sv-schools`;

export interface SchoolSatelliteCompareProps {
  className?: string;
  caption?: string;
}

const SchoolSatelliteCompare: React.FC<SchoolSatelliteCompareProps> = ({
  className = '',
  caption,
}) => {
  const lexingtonSrc = `${IMG_BASE}/lexington-satellite.webp`;
  const rfkSrc = `${IMG_BASE}/rfk-satellite.webp`;

  return (
    <figure className={`greenery-satellite-compare-figure ${className}`.trim()}>
      <div className="greenery-satellite-compare__frame">
        <div className="greenery-satellite-compare__labels" aria-hidden="true">
          <span className="greenery-satellite-compare__label greenery-satellite-compare__label--left">
            Lexington Elementary
          </span>
          <span className="greenery-satellite-compare__label greenery-satellite-compare__label--right">
            Robert F. Kennedy Elementary
          </span>
        </div>
        <ReactCompareSlider
          className="greenery-satellite-compare__slider"
          defaultPosition={50}
          itemOne={
            <ReactCompareSliderImage
              src={lexingtonSrc}
              alt="NAIP aerial imagery centered on Lexington Elementary, Los Gatos; high school-site greenery."
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={rfkSrc}
              alt="NAIP aerial imagery centered on Robert F. Kennedy Elementary, San Jose; low school-site greenery."
            />
          }
        />
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

export default SchoolSatelliteCompare;
