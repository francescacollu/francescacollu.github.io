import React from 'react';
import MarkdownContent from '../ItalianParliamentGap/components/MarkdownContent';
import SchoolsMap from './SchoolsMap';
import SchoolSatelliteCompare from './SchoolSatelliteCompare';
import ConditionalProbabilityChart from './ConditionalProbabilityChart';
import GreeneryFrpmScatterChart from './GreeneryFrpmScatterChart';
import '../../../styles/articles/article-standard.css';
import './styles/greenery-in-silicon-valley-schools.css';

const GreeneryInSiliconValleySchools = () => {
  return (
    <div className="article-standard article-standard--greenery-sv-schools">
      <article className="article-body">
        <h1>For Silicon Valley Students, the Grass Is Greener on the Wealthier Side</h1>
        <p className="article-byline">by Francesca Collu</p>

        {/* Section 1 */}
        <MarkdownContent src="/content/GreeneryInSiliconValleySchools/section1.md" className="markdown-content" />

        <GreeneryFrpmScatterChart
          minHeight="440px"
          caption="<b>Figure 4.</b> Greenery index versus share of students eligible for free or reduced-price
          meals (FRPM), by school. Hover a point for school name and values."
        />

        <SchoolSatelliteCompare
          caption="<b>Figure 1.</b> NAIP aerial imagery at comparable extent around two campuses:
          <i>Lexington Elementary</i> (Los Gatos), high school-site greenery, and <i>Robert F. Kennedy
          Elementary</i> (San Jose), low school-site greenery; the latter enrolls a much higher share of
          students eligible for free or reduced-price meals. Drag the divider to compare. Imagery: USDA
          National Agriculture Imagery Program (NAIP)."
        />

        <SchoolsMap
          minHeight="480px"
          caption="<b>Figure 2.</b> School locations; marker color encodes greenery index (see legend). Use the
          FRPM range control to show only schools within a given eligibility share. Dark basemap &copy;
          OpenStreetMap, &copy; CARTO."
        />

        <ConditionalProbabilityChart
          minHeight="420px"
          caption="<b>Figure 3.</b> Conditional distribution of greenery index bins given FRPM eligibility
          group (equal-width bins on 0&ndash;1). Compares <i>FRPM-eligible</i> versus <i>Non-eligible</i> schools."
        />

        

        <div className="section-separator"> • • • </div>
      </article>
    </div>
  );
};

export default GreeneryInSiliconValleySchools;
