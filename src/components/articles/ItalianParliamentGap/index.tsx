import React, { useEffect, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import StickmanChart from './components/StickmanChart';
import ItalyMap from './components/ItalyMap';
import './styles/ItalianParliamentGap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faMarsAndVenus, faGraduationCap, faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
    src: string;
    className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ src, className }) => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        fetch(src)
            .then(res => res.text())
            .then(setContent);
    }, [src]);

    return (
        <div className={className}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      );
};

interface StepEnterEvent {
    data: number;
    element: HTMLElement;
    direction: 'up' | 'down';
}

interface StepProgressEvent {
    data: number;
    progress: number;
}

const ItalianParliamentGap = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stepProgress, setStepProgress] = useState(0);
    const [highlightedRegion, setHighlightedRegion] = useState<string | undefined>(undefined);

    const onStepEnterNumber = ({ data }: { data : number}) => {
        setCurrentStep(data);
    };

    const onStepEnterRegion = ({ data }: { data : string}) => {
        setHighlightedRegion(data);
    };

    const onStepProgress = ({ data, progress }: StepProgressEvent) => {
        console.log(`Step ${data} progress: ${progress.toFixed(2)}`);
        setStepProgress(progress);
    };

  return (
    <div className="italian-parliament-gap-container">

      <header className="header">
        <h1 className='header-title'>The Italian Parliament Gap</h1>
          <MarkdownContent src='/content/ItalianParliamentGap/intro.md' className='header-description'/>
      </header>


      <div className='category-four-icons-container'>
        <div className="category-icon-container">
            <div className="category-icon">
                <FontAwesomeIcon icon={faMarsAndVenus} size="2x" />
            </div>
        </div>
        <div className="category-icon-container">
            <div className="category-icon">
                <FontAwesomeIcon icon={faHourglassHalf} size='2x'/>
            </div>
        </div>
        <div className="category-icon-container">
            <div className="category-icon">
                <FontAwesomeIcon icon={faGraduationCap} size='2x'/>
            </div>
        </div>
        <div className="category-icon-container">
            <div className="category-icon">
            <FontAwesomeIcon icon={faEarthEurope} size='2x'/>
            </div>
        </div>
      </div>

      <div className='scrollytelling-section-container'>
        <div className='chart-container'>
          <div className='chart-container-inner'>
            <StickmanChart 
              opacity={1} 
              categories={currentStep === 1 ? 
                [
                  { id: 'women', label: 'Women', value: 212, color: '#3b82f6' },
                  { id: 'men', label: 'Men', value: 393, color: '#9ca3af' },
                ] : 
                [
                  { id: 'women', label: 'Women', value: 302, color: '#3b82f6' },
                  { id: 'men', label: 'Men', value: 303, color: '#9ca3af' },
                ]
              }
            />
          </div>
        </div>
        
        <div className='scrolling-text-boxes-container'>
          <Scrollama 
            onStepEnter={onStepEnterNumber} 
            offset={0.5}
            onStepProgress={onStepProgress}
          >
            <Step data={1}>
              <div className='left-text-box-container'>
                <div className='text-box-inner'>
                  <p>In the Italian Parliament, women hold only 35% of the seats despite making up more than half of the country's population.</p>
                  <p>This disparity highlights the ongoing challenges in achieving gender equality in political representation.</p>
                </div>
              </div>
            </Step>
            
            <Step data={2}>
              <div className='right-text-box-container'>
                <div className='text-box-inner'>
                  <p>The representation of women in Italian politics has improved over time, but progress has been slow.</p>
                  <p>If trends continue, true gender parity might not be achieved for several more electoral cycles.</p>
                </div>
              </div>
            </Step>
            
            <Step data={3}>
              <div className='left-text-box-container'>
                <div className='text-box-inner'>
                  <p>When examining political representation by region, further disparities emerge.</p>
                  <p>Some areas of Italy have significantly better gender balance in their representatives than others.</p>
                </div>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
              
      <div className='scrollytelling-section-container'>
        <div className='chart-container'>
          <div className='chart-container-inner'>
            <ItalyMap width={800} height={600} highlightedRegion={highlightedRegion}/>
          </div>
        </div>
        
        <div className='scrolling-text-boxes-container'>
          <Scrollama 
            onStepEnter={onStepEnterRegion} 
            offset={0.5}
            onStepProgress={onStepProgress}
          >
            <Step data="Lombardia">
              <div className='left-text-box-container'>
                <div className='text-box-inner'>
                  <p>Italy Map chart: In the Italian Parliament, women hold only 35% of the seats despite making up more than half of the country's population.</p>
                  <p>This disparity highlights the ongoing challenges in achieving gender equality in political representation.</p>
                </div>
              </div>
            </Step>
            
            <Step data="Sicilia">
              <div className='right-text-box-container'>
                <div className='text-box-inner'>
                  <p>The representation of women in Italian politics has improved over time, but progress has been slow.</p>
                  <p>If trends continue, true gender parity might not be achieved for several more electoral cycles.</p>
                </div>
              </div>
            </Step>
            
            <Step data="Sardegna">
              <div className='left-text-box-container'>
                <div className='text-box-inner'>
                  <p>When examining political representation by region, further disparities emerge.</p>
                  <p>Some areas of Italy have significantly better gender balance in their representatives than others.</p>
                </div>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>

      <div className='footer-container'>
        <p>Footer</p>
      </div>
    </div>
  );
};

export default ItalianParliamentGap; 