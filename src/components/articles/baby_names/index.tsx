import React from 'react';
import UniqueNamesScatterChart from './charts/UniqueNamesScatterChart';
import NameConcentrationWaffleChart from './charts/NameConcentrationWaffleChart';
import SpellingVariationsChart from './charts/SpellingVariationsChart';
import './styles/baby-names.css';
import MarkdownContent from '../ItalianParliamentGap/components/MarkdownContent';

const BabyNames = () => {
    return (
        <div className="article-standard article-standard--baby-names">
            <article className="article-body">
                <h1>The End of the Popular Baby Name in the United States</h1>

                <p className="article-byline">by Francesca Collu</p>

                <MarkdownContent src="/content/BabyNames/section1.md" className="markdown-content" />

                {/* Chart 1: Unique Names Scatter */}
                <UniqueNamesScatterChart 
                    className="plotly-chart" 
                    minHeight="600px" 
                    caption="<b>Figure 1.</b> The number of unique baby names given in the United States has grown dramatically over the past 145 years, from just 2,000 different names in 1880 to over 31,000 in 2024. This represents a shift toward greater naming diversity and parental creativity.<br />Source: Social Security Administration baby names data (1880-2024)." 
                />

                <MarkdownContent src="/content/BabyNames/section2.md" className="markdown-content" />


                {/* Chart 2: Name Concentration Waffle Chart */}
                <NameConcentrationWaffleChart 
                    className="plotly-chart" 
                    minHeight="600px" 
                    caption="<b>Figure 2.</b> Imagine a classroom with 20 babies. In 1880, one child would likely share the most popular name (John). By 2024, you'd need several classrooms before finding even one child with the most popular name (Liam). Each square represents one baby, colored squares show how many would share the #1 name. Blue represents male names, orange represents female names.<br />Source: Social Security Administration baby names data (1880-2024)." 
                />

                <MarkdownContent src="/content/BabyNames/section3.md" className="markdown-content" />

                {/* Chart 3: Spelling Variations Interactive Chart */}
                <SpellingVariationsChart 
                    className="plotly-chart" 
                    minHeight="600px" 
                    caption="<b>Figure 3.</b> Interactive chart showing names with at least 5 spelling variations. Select a year to see the most popular names with multiple spellings. Click on any name to view a word cloud of all its spelling variations and their frequencies.<br />Source: Social Security Administration baby names data (1880-2024)." 
                />

                <MarkdownContent src="/content/BabyNames/section4.md" className="markdown-content" />

                <MarkdownContent src="/content/BabyNames/section5.md" className="markdown-content" />   

                <MarkdownContent src="/content/BabyNames/section6.md" className="markdown-content" />

            </article>
        </div>
    );
};

export default BabyNames;
