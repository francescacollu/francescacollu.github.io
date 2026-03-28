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

        <SchoolsMap
          minHeight="480px"
          caption="<b>Figure 1.</b> 298 public, non-charter K–12 schools; marker color shows greenery index
          (composite of standardized NDVI and NLCD tree canopy within a 100&nbsp;m buffer). Use the FRPM range control to limit schools by share of students eligible for free or reduced-price meals. When the share of FRPM eligible students is low, the school is surrounded by more vegetation. When the share of FRPM eligible students is high, the school is surrounded by less vegetation. <br>Dark basemap
          &copy; OpenStreetMap, &copy; CARTO."
        />

        <MarkdownContent src="/content/GreeneryInSiliconValleySchools/section2.md" className="markdown-content" />

        <GreeneryFrpmScatterChart
          minHeight="600px"
          caption="<b>Figure 2.</b> On the vertical axis: greenery index (higher = greener
          relative to other schools in the sample). On the horizontal axis: share of students eligible for free or
          reduced-price meals (FRPM). Hover for school name and values."
        />

        <MarkdownContent src="/content/GreeneryInSiliconValleySchools/section3.md" className="markdown-content" />

        <ConditionalProbabilityChart
          caption="<b>Figure 3.</b> Among FRPM-eligible and non-eligible students (student-weighted), the share attending schools in the bottom vs top half of greenery index in this sample. Two-bin split at the sample median. The probability that a student goes to a school with little greenery, given that the student is FRPM-eligible, is 60.35%, 1.25 times higher than the probability that a student goes to a school with little greenery, given that the student is not FRPM-eligible. The probability that a student goes to a school with high greenery, given that the student is FRPM-eligible, is 39.65%, 1.37 times higher than the probability that a student goes to a school with high greenery, given that the student is not FRPM-eligible."
        />

        <MarkdownContent src="/content/GreeneryInSiliconValleySchools/section4.md" className="markdown-content" />

        <SchoolSatelliteCompare
          caption="<b>Figure 4.</b> NAIP imagery at comparable scale around <i>Lexington Elementary</i> (Los Gatos;
          low FRPM share; high school-site greenness) and <i>Robert F. Kennedy Elementary</i> (San Jose; high FRPM
          share; low school-site greenness). Drag the divider to compare. Imagery: USDA National Agriculture
          Imagery Program (NAIP)."
        />

        <MarkdownContent src="/content/GreeneryInSiliconValleySchools/section5.md" className="markdown-content" />

        <div className="section-separator"> • • • </div>

        <MarkdownContent src="/content/GreeneryInSiliconValleySchools/methodology.md" className="markdown-content" />
      </article>
    </div>
  );
};

export default GreeneryInSiliconValleySchools;
