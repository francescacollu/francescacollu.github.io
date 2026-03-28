import React from 'react';
import MarkdownContent from '../ItalianParliamentGap/components/MarkdownContent';
import WaffleWholeNetflixChart from './charts/WaffleWholeNetflixChart';
import MainCharactersMoviesChart from './charts/MainCharactersMoviesChart';
import MainCharactersTvshowsChart from './charts/MainCharactersTvshowsChart';
import DirectorsTimeSeriesChart from './charts/DirectorsTimeSeriesChart';
import './styles/women-in-netflix.css';

const WomenInNetflix = () => {
    return (
        <div className="article-standard article-standard--women-in-netflix">
            <article className="article-body">
                    <h1>Women Presence in Netflix</h1>

                    <p className="article-byline">by Francesca Collu</p>

                    {/* Section 1 */}
                    <MarkdownContent src="/content/WomenInNetflix/section1.md" className="markdown-content" />

                    {/* Chart 1 */}
                    <WaffleWholeNetflixChart className="plotly-chart" minHeight="500px"
                    caption="<b>Figure 1.</b> Gender distribution across the US Netflix catalogue (all cast). Each cell represents the share of male vs female characters." />

                    {/* Section 2 */}
                    <MarkdownContent src="/content/WomenInNetflix/section2.md" className="markdown-content" />

                    {/* Chart 2 */}
                    <MainCharactersMoviesChart className="plotly-chart" minHeight="600px"
                    caption="<b>Figure 2.</b> Female share among main characters in movies by release year. Bubble size reflects number of titles." />

                    {/* Chart 3 */}
                    <MainCharactersTvshowsChart className="plotly-chart" minHeight="600px"
                    caption="<b>Figure 3.</b> Female share among main characters in TV shows by release year. Bubble size reflects number of titles." />

                    {/* Section 3 */}
                    <MarkdownContent src="/content/WomenInNetflix/section3.md" className="markdown-content" />

                    {/* Chart 4 */}
                    <DirectorsTimeSeriesChart className="plotly-chart" minHeight="600px"
                    caption="<b>Figure 4.</b> Female directors ratio in movies by release year." />

                    {/* Section 4 */}
                    <MarkdownContent src="/content/WomenInNetflix/section4.md" className="markdown-content" />

                    {/* Separator */}
                    <div className="section-separator"> * * * </div>

                    {/* Conclusion */}
                    <MarkdownContent src="/content/WomenInNetflix/conclusion.md" className="markdown-content" />
                </article>
            </div>
    );
};

export default WomenInNetflix;
