import React from 'react';
import MarkdownContent from '../ItalianParliamentGap/components/MarkdownContent';
import PlotlyChart from './PlotlyChart';
import './styles/vittime-anziane-femminicidio.css';

const VittimeAnzianeFemminicidio = () => {
    return (
            <div className="vittime-anziane-femminicidio-container">
                <article className="vittime-anziane-femminicidio-content">
                    <h1>Una vittima di femminicidio su tre ha più di 65 anni. <br /> Ma i giornali non la raccontano</h1>
                

                    {/* Intro */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/intro.md" className="markdown-content" />

                    {/* Chart 1 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/age_groups.html" className="plotly-chart" minHeight="600px" />

                    {/* Section 2 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section2.md" className="markdown-content" />

                    {/* Chart 2 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/strip_plot_200cases.html" minHeight="800px" />

                    {/* Section 3 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section3.md" className="markdown-content" />

                    {/* Chart 3 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/newspaper_comparison.html" minHeight="600px" />

                    {/* Section 4 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section4.md" className="markdown-content" />

                    {/* Chart 4 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/zero_coverage.html" minHeight="600px" />

                    {/* Section 5 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section5.md" className="markdown-content" />

                    {/* Conclusion */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/conclusion.md" className="markdown-content" />
                </article>
            </div>
    );
};

export default VittimeAnzianeFemminicidio;

