import React from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { ageChartSteps, educationChartSteps, foreignChartSteps, genderChartSteps } from './components/ChartSteps';
import './styles/ItalianParliamentGap.css';
import { faMarsAndVenus, faGraduationCap, faEarthEurope, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { ImageTreeProvider } from './components/ImageTreeContext';

import mp1 from './images/mp1.png';
import mp3 from './images/mp3.png';
import mp4 from './images/mp4.png';
import mp5 from './images/mp5.png';

import { mpColors } from './components/ChartSteps';
import Intro from './components/Intro';
import CategoriesIcon from './components/CategoriesIcon';
import CategoryIntro from './components/CategoryIntro';
import ParliamentSection from './components/ParliamentSection';
import MapSection from './components/MapSection';
import MarkdownContent from './components/MarkdownContent';

const ItalianParliamentGap = () => {
    return (
        <ImageTreeProvider images={[mp1, mp3, mp4, mp5]} colors={Object.values(mpColors)}>
            <ItalianParliamentGapImpl />
        </ImageTreeProvider>
    );
}

const ItalianParliamentGapImpl = () => {
    return (
        <div className="italian-parliament-gap-container">
            <div className='intro-container'>
                <Intro 
                    title="The Italian Parliament Gap"
                    descriptionSrc="/content/ItalianParliamentGap/intro.md"
                />
            </div>
            {/* <div className='four-categories-intro-container-outer'>
                <div className='four-categories-intro-container'>
                <div className='four-categories-intro'>
                            <MarkdownContent src='/content/ItalianParliamentGap/four_categories_intro.md' className='four-categories-intro-inner'/>
                            </div>

                <CategoriesIcon />
                </div>
            </div> */}

            <CategoryIntro 
                icon={faMarsAndVenus}
                title="Women Are Missing"
            />

            <ParliamentSection 
                chartSteps={genderChartSteps}
                steps={[
                    { data: 0, src: '/content/ItalianParliamentGap/gender/gender_step1.md', position: 'left' },
                    { data: 1, src: '/content/ItalianParliamentGap/gender/gender_step2.md', position: 'right' },
                    { data: 2, src: '/content/ItalianParliamentGap/gender/gender_step3.md', position: 'left' },
                ]}
            />

            <div className='post-scrollytelling-container'>
                <MarkdownContent src='/content/ItalianParliamentGap/gender/gender_post_chart.md' className='post-scrollytelling-inner'/>
            </div>

            <CategoryIntro 
                icon={faSeedling}
                title="The Youthless Republic"
            />

            <ParliamentSection 
                chartSteps={ageChartSteps}
                steps={[
                    { data: 0, src: '/content/ItalianParliamentGap/age/age_step1.md', position: 'left' },
                    { data: 1, src: '/content/ItalianParliamentGap/age/age_step2.md', position: 'right' },
                    { data: 2, src: '/content/ItalianParliamentGap/age/age_step3.md', position: 'left' },
                    { data: 3, src: '/content/ItalianParliamentGap/age/age_step4.md', position: 'right' },
                ]}
            />

            <div className='post-scrollytelling-container'>
                <MarkdownContent src='/content/ItalianParliamentGap/age/age_post_chart.md' className='post-scrollytelling-inner'/>
            </div>

            <CategoryIntro 
                icon={faGraduationCap}
                title="The Parliament of Lawyers"
            />

            <ParliamentSection 
                chartSteps={educationChartSteps}
                steps={[
                    { data: 0, src: '/content/ItalianParliamentGap/education/education_step1.md', position: 'left' },
                    { data: 1, src: '/content/ItalianParliamentGap/education/education_step2.md', position: 'right' },
                    { data: 2, src: '/content/ItalianParliamentGap/education/education_step3.md', position: 'left' },
                    { data: 3, src: '/content/ItalianParliamentGap/education/education_step4.md', position: 'right' },
                    { data: 4, src: '/content/ItalianParliamentGap/education/education_step5.md', position: 'left' },
                ]}
            />

            <div className='post-scrollytelling-container'>
                <MarkdownContent src='/content/ItalianParliamentGap/education/education_post_chart.md' className='post-scrollytelling-inner'/>
            </div>

            <CategoryIntro 
                icon={faEarthEurope}
                title="The Map of Representation"
            />

            <MapSection />

            <div className='post-scrollytelling-container'>
                <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_post_scrollytelling.md' className='post-scrollytelling-inner'/>
            </div>
            
            <ParliamentSection 
                chartSteps={foreignChartSteps}
                steps={[
                    { data: 0, src: '/content/ItalianParliamentGap/origin/foreign_step0.md', position: 'left' },
                    { data: 1, src: '/content/ItalianParliamentGap/origin/foreign_step1.md', position: 'right' },
                    { data: 2, src: '/content/ItalianParliamentGap/origin/foreign_step2.md', position: 'left' },
                ]}
            />

            <div className='post-scrollytelling-container'>
                <MarkdownContent src='/content/ItalianParliamentGap/conclusions.md' className='post-scrollytelling-inner'/>
            </div>

            <MarkdownContent src='/content/ItalianParliamentGap/footer.md' className='footer-container'/>
        </div>
    );
};

export default ItalianParliamentGap; 