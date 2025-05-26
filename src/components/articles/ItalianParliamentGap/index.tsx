import React, { useEffect, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import ItalyMap from './components/ItalyMap';
import { ageChartSteps, educationChartSteps, foreignChartSteps, genderChartSteps } from './components/StickmanSteps';
import './styles/ItalianParliamentGap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faMarsAndVenus, faGraduationCap, faEarthEurope, faSeedling, faPerson } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import Parliament from './components/Parliament';
import './styles/Parliament.css';

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

interface StepProgressEvent {
    data: number;
    progress: number;
}

const ItalianParliamentGap = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stepProgress, setStepProgress] = useState(0);
    const [highlightedRegion, setHighlightedRegion] = useState<string | undefined>(undefined);
    const [iconsOpacity, setIconsOpacity] = useState(0);
    const [mapProgress, setMapProgress] = useState(0);


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

    const onIconsStepProgress = ({ progress }: { progress: number }) => {
        setIconsOpacity(progress);
    };

  return (
    <div className="italian-parliament-gap-container">

      <header className='header'>
        <h1 className='header-title'>The Italian Parliament Gap</h1>
        <MarkdownContent src='/content/ItalianParliamentGap/intro.md' className='header-description'/>
      </header>


      <Scrollama onStepProgress={onIconsStepProgress} offset={1}>
        <Step data={1}>
          <div className='four-categories-intro'>
          <MarkdownContent src='/content/ItalianParliamentGap/four_categories_intro.md' className='four-categories-intro-inner'/>
          </div>
        </Step>
      </Scrollama>

      <div className="category-four-icons-container" 
           style={{
            opacity: iconsOpacity,
            pointerEvents: iconsOpacity > 0 ? 'auto' : 'none'
        }}>
        <div className="category-icon-container">
            <div className="category-icon">
                <FontAwesomeIcon icon={faMarsAndVenus} size="3x" />
            </div>
        </div>
        <div className="category-icon-container">
            <div className="category-icon">
                <FontAwesomeIcon icon={faHourglassHalf} size='3x'/>
            </div>
        </div>
        <div className="category-icon-container">
            <div className="category-icon">
                <FontAwesomeIcon icon={faGraduationCap} size='3x'/>
            </div>
        </div>
        <div className="category-icon-container">
            <div className="category-icon">
            <FontAwesomeIcon icon={faEarthEurope} size='3x'/>
            </div>
        </div>
      </div>

      <div className='category-intro-container'>
        <span className='background-icon'>
            <FontAwesomeIcon icon={faMarsAndVenus} size='10x'/>
        </span>
        <div className='category-intro-text'>
            <h2>Women Are Missing</h2>
        </div>
      </div>

      <div className='scrollytelling-section-container'>
        <div className='chart-container'>
          <div className='chart-container-inner'>
          <Parliament 
          categories={genderChartSteps[currentStep - 1]?.categories || genderChartSteps[0].categories}
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
                  <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_step1.md' className='text-box-inner'/>
              </div>
            </Step>
            
            <Step data={2}>
              <div className='right-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_step2.md' className='text-box-inner'/>
              </div>
            </Step>
            
            <Step data={3}>
              <div className='left-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_step3.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={4}>
              <div className='right-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_step4.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={4}>
              <div className='left-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_step5.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={4}>
              <div className='right-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_step6.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={4}>
                <div style={{height: '100vh'}}></div>
            </Step>
          </Scrollama>
        </div>
      </div>

      <div className='category-intro-container'>
        <span className='background-icon'>
            <FontAwesomeIcon icon={faSeedling} size='10x'/>
        </span>
        <div className='category-intro-text'>
            <h2>The Youthless Republic</h2>
        </div>
      </div>

      <div className='scrollytelling-section-container'>
        <div className='chart-container'>
          <div className='chart-container-inner'>
            <Parliament 
              categories={ageChartSteps[currentStep - 1]?.categories || ageChartSteps[0].categories}
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
                  <MarkdownContent src='/content/ItalianParliamentGap/age/age_step1.md' className='text-box-inner'/>
              </div>
            </Step>
            
            <Step data={2}>
              <div className='right-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/age/age_step2.md' className='text-box-inner'/>
              </div>
            </Step>
            
            <Step data={3}>
              <div className='left-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/age/age_step3.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={4}>
              <div className='right-text-box-container'>
              <MarkdownContent src='/content/ItalianParliamentGap/age/age_step4.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={5}>
                <div style={{height: '100vh'}}></div>
            </Step>

          </Scrollama>
        </div>
      </div>

      <div className='category-intro-container'>
        <span className='background-icon'>
            <FontAwesomeIcon icon={faGraduationCap} size='10x'/>
        </span>
        <div className='category-intro-text'>
            <h2>Education Level</h2>
        </div>
      </div>

      <div className='scrollytelling-section-container'>
        <div className='chart-container'>
          <div className='chart-container-inner'>
          {/* <Parliament 
            image={faPerson}
            widthFraction={0.01}
            radiusList={[3, 4, 5]}
            members={605}
        /> */}
            <Parliament
              categories={educationChartSteps[currentStep - 1]?.categories || educationChartSteps[0].categories}
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
                  <MarkdownContent src='/content/ItalianParliamentGap/education/education_step1.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={2}>
              <div className='left-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/education/education_step2.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={3}>
              <div className='left-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/education/education_step3.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={4}>
              <div className='left-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/education/education_step4.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={5}>
              <div className='left-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/education/education_step5.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={6}>
              <div style={{height: '100vh'}}></div>
            </Step>

          </Scrollama>
        </div>
      </div>

      {/* Post Scrollytelling - Education Section */}
      <div className='post-scrollytelling-container'>
        <MarkdownContent src='/content/ItalianParliamentGap/education/education_post_scrollytelling.md' className='post-scrollytelling-inner'/>
      </div>

      {/* Geo Section */}
      <div className='category-intro-container'>
        <span className='background-icon'>
            <FontAwesomeIcon icon={faEarthEurope} size='10x'/>
        </span>
        <div className='category-intro-text'>
            <h2>The Regions</h2>
        </div>
      </div>
              
      <div className='scrollytelling-section-container'>
        <div className='italy-map-container'>
          <div className='italy-map-container-inner'>
            <ItalyMap 
              width={800} 
              height={600} 
              highlightedRegion={highlightedRegion} 
              dataPath="/data/region_comparison_analysis.csv" 
              currentStep={currentStep}
            />
          </div>
        </div>
        
        <div className='scrolling-text-boxes-container'>
          <Scrollama 
            onStepEnter={({data}) => setCurrentStep(data)}
            offset={0.5}
            >
            <Step data={0}>
              <div className='right-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step1.md' className='text-box-inner'/>
              </div>
            </Step>
            
            <Step data={1}>
              <div className='right-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step2.md' className='text-box-inner'/>
              </div>
            </Step>
            
            <Step data={2}>
              <div className='right-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step3.md' className='text-box-inner'/>
              </div>
            </Step>

            <Step data={3}>
              <div className='right-text-box-container'>
                  <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step4.md' className='text-box-inner'/>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>

      {/* Post Scrollytelling - Geo Section */}
      <div className='post-scrollytelling-container'>
        <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_post_scrollytelling.md' className='post-scrollytelling-inner'/>
      </div>

      <div className='scrollytelling-section-container'>
        <div className='chart-container'>
          <div className='chart-container-inner'>
            <Parliament
              categories={foreignChartSteps[currentStep - 1]?.categories || foreignChartSteps[0].categories}
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
                <div className='right-text-box-container'>
                    <MarkdownContent src='/content/ItalianParliamentGap/origin/foreign_step1.md' className='text-box-inner'/>
                </div>
              </Step>
              
              <Step data={2}>
                <div className='right-text-box-container'>
                    <MarkdownContent src='/content/ItalianParliamentGap/origin/foreign_step2.md' className='text-box-inner'/>
                </div>
              </Step>

              <Step data={3}>
                <div className='right-text-box-container'>
                    <MarkdownContent src='/content/ItalianParliamentGap/origin/foreign_step3.md' className='text-box-inner'/>
                </div>
              </Step>
            
          </Scrollama>
        </div>
      </div>

      <div className='post-scrollytelling-container'>
        <MarkdownContent src='/content/ItalianParliamentGap/conclusions.md' className='post-scrollytelling-inner'/>
      </div>

        <MarkdownContent src='/content/ItalianParliamentGap/footer.md' className='footer-container'/>
    </div>
  );
};

export default ItalianParliamentGap; 