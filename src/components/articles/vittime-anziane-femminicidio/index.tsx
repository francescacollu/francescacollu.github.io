import React from 'react';
import MarkdownContent from '../ItalianParliamentGap/components/MarkdownContent';
import PlotlyChart from './PlotlyChart';
import './styles/vittime-anziane-femminicidio.css';

const VittimeAnzianeFemminicidio = () => {
    return (
            <div className="vittime-anziane-femminicidio-container">
                <article className="vittime-anziane-femminicidio-content">
                    <h1>Una vittima di femminicidio su tre ha più di 65 anni. <br /> Ma i giornali non la raccontano</h1>

                    <p className="article-byline">Di Francesca Collu</p>

                    {/* Intro */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/intro.md" className="markdown-content" />

                    {/* Chart 1 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/age_groups.html" className="plotly-chart" minHeight="600px" 
                    caption="<b>Figura 1.</b> Distribuzione dei 629 femminicidi per gruppo di età (Gennaio 2020 - Ottobre 2025). Il 34% delle vittime ha più di 65 anni. Fonte: elaborazione su dati Non Una Di Meno" />

                    {/* Section 2 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section2.md" className="markdown-content" />

                    {/* Chart 2 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/strip_plot_200cases.html" minHeight="800px"
                    caption="<b>Figura 2.</b> Distribuzione del numero di articoli per gruppo di età. Ogni punto rappresenta un caso di femminicidio dei 200 esaminati. Come evidente dal grafico, ci sono alcuni casi che, essendo diventati decisamente più mediatici di altri, sbilanciano di molto il valore medio della distribuzione. Per questa ragione, la misura qui considerata è la mediana. Passando il mouse si possono leggere i nomi delle vittime e il numero di relativi articoli pubblicati." />

                    {/* Section 3 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section3.md" className="markdown-content" />

                    {/* Chart 3 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/newspaper_comparison.html" minHeight="600px"
                    caption='<b>Figura 3.</b> Confronto tra la copertura di Corriere della Sera e La Repubblica per gruppo di età. La disparità generazionale è presente in entrambe le testate. Analisi su 200 casi.' />

                    {/* Section 4 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section4.md" className="markdown-content" />

                    {/* Chart 4 */}
                    <PlotlyChart src="/charts/vittime-anziane-femminicidio/zero_coverage.html" minHeight="600px"
                    caption='<b>Figura 4.</b> Numero di vittime che non hanno ricevuto alcuna copertura mediatica sui due principali quotidiani nazionali. Il 16% delle vittime anziane (11 su 68) è rimasto completamente invisibile. Campione: 200 casi. La parte grigia indica i casi senza copertura. Passando il mouse si possono leggere ulteriori dettagli.' />

                    {/* Section 5 */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/section5.md" className="markdown-content" />

                    {/* Separator */}
                    <div className="section-separator"> • • • </div>

                    {/* Conclusion */}
                    <MarkdownContent src="/content/VittimeAnzianeFemminicidio/conclusion.md" className="markdown-content" />
                </article>
            </div>
    );
};

export default VittimeAnzianeFemminicidio;

