import React from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Headline from './Headline';
import Graf from './Graf';
import Graf2 from './Graf2';
import VideoSection from './VideoSection';
import PasswordProtection from './PasswordProtection';
import AlternatingSection from './AlternatingSection';
import audioFile from './media/simona_cervasio_owens_mixdown.mp4';
import rosaInterview from './media/video_mms_final.mp4';
import visaImage from './media/visa.JPG';
import rosaCloseUp from './media/RN_close_up_serious.jpg';
import rosaWorking from './media/RN_working.jpg';
import rosaHandsOnPhone from './media/RN_hands_on_phone.jpg';
import rosaSmileAtPhone from './media/RN_smile_at_the_phone.jpg';
import rosaSmileAtCamera from './media/RN_looks_at_the_camera.jpg';
import ImageGraf from './ImageGraf';

import styles from './styles/mms_final.module.css';

const MmsFinal = () => {
    // Define text steps for different sections
    const ledeTextSteps = [
        "Rosa Nieves holds a cinematography degree and years of design experience, but immigration law forces her to remain unemployed in Silicon Valley's tech boom.",
    ];

    const detailsTextSteps = [
        "As one of the world’s major tech hubs, the region is largely made up of immigrants holding H-1B visas. Their spouses and children are issued H-4 visas. Canadian and Mexican citizens can obtain similar work visas under the TN program, with their spouses and children receiving TD visas.",
    ];

    const rosaWorkingTextSteps = [
        "Rosa Nieves, 40, a Mexican immigrant, has lived on a dependent visa for the past four years. The sudden loss of professional identity triggered depression, eroded her self-esteem, and strained her marriage.",
    ];

    // const rosaHandsOnPhoneTextSteps = [
    //     // "Support came from a group of women in the same situation."] Finding that she was not alone gave her invaluable comfort.",
    // ];

    const dataTextSteps = [
        "While accurate data for the TN and TD visas is not available, federal figures on the H-1B and H-4 are clear: 70-75% of H-1B workers are male, and  90% of H-4 visa holders are women. Only 27% of them are employed. Moreover, most are highly educated: 90% of H-4 visa holders have at least a bachelor’s degree.",
    ];

    const conclusionSteps = [
        "Women like Rosa Nieves.",
    ];

    const audioFileIntroTextMarginTop = 0.1;

    return (
        <PasswordProtection articleTag="berkeley123">
            <div className={styles.blackBackground}>
                <Headline/>          
                <Graf 
                    name="Lede"
                    image={rosaCloseUp}
                    caption=""
                    textSteps={ledeTextSteps}
                    position="left"
                />
                <Graf 
                    name="Details"
                    image={visaImage}
                    caption=""
                    textSteps={detailsTextSteps}
                    position="right"
                />
                <div style={{height: `${audioFileIntroTextMarginTop * 100}vh`}}></div>
                <VideoSection 
                    videoSource={audioFile}
                    introText="Immigration attorney Simona Cervasio Owens explains that H-4 and TD visas carry strict limitations."
                    intrinsicMargins={{
                        introText: 800, // 100vh equivalent - will be calculated dynamically inside component
                        placeholder: 0
                    }}
                    intrinsicTop={{
                        introText: audioFileIntroTextMarginTop, // top: 0 (from CSS)
                        placeholder: 0.5 // top: 380px
                    }}
                    intrinsicTranslate={{
                        introText: 0.0, // No translation
                        placeholder: -0.5 // No translation
                    }}
                />
                <div className={styles.textOnlyContainer}>
                    <div className={styles.textOnlySection}>
                        <p>In Silicon Valley's immigrant-heavy tech industry, a visa system designed for skilled workers creates an unintended consequence: it systematically prevents their spouses – the vast majority women – from pursuing careers, despite being highly educated themselves. The stakes are rising as immigration advocates warn that the second Trump administration could again target work authorization for dependent visa holders, after attempting to end it during Trump’s first term.</p>
                    </div>
                </div>
                <Graf
                    name="rosaWorking"
                    image={rosaWorking}
                    caption="Rosa Nieves, years ago, when she was still working as a graphic designer in Mexico."
                    textSteps={rosaWorkingTextSteps}
                    position="left"
                />
                {/* <ImageGraf
                    text="Rosa Nieves, 40, a Mexican immigrant, has lived on a dependent visa for the past four years. The sudden loss of professional identity triggered depression, eroded her self-esteem, and strained her marriage."
                    image={[rosaWorking]}
                    caption="Rosa Nieves, years ago, when she was still working as a graphic designer in Mexico."
                    textPosition="left"
                /> */}
                <ImageGraf
                    text="Support came from a group of women in the same situation."
                    image={[rosaHandsOnPhone]}
                    caption="Rosa Nieves’s hands on her phone as she chats with friends in the WhatsApp group for immigrant women on dependent visas."
                    textPosition="right"
                />
                <ImageGraf
                    text="Finding that she was not alone gave her invaluable comfort."
                    image={[rosaSmileAtPhone]}
                    caption="Rosa Nieves smiles while looking at her phone."
                    textPosition="left"
                />
                <VideoSection 
                    videoSource={rosaInterview}
                    intrinsicMargins={{
                        introText: 0, // No introText for this instance
                        placeholder: 0
                    }}
                    intrinsicTop={{
                        introText: 0, // No introText for this instance
                        placeholder: 0.5 // top: 0
                    }}
                    intrinsicTranslate={{
                        introText: 0, // No introText for this instance
                        placeholder: -0.5 // No translation
                    }}
                />
                <div className={styles.textOnlyContainer}>
                    <div className={styles.textOnlySection}>
                        <p>While accurate data for the TN and TD visas is not available, federal figures on the H-1B and H-4 are clear: 70-75% of H-1B workers are <a href="https://www.uscis.gov/sites/default/files/document/data/OLA_Signed_H-1B_Characteristics_Congressional_Report_FY2022.pdf" target="_blank" className={styles.link}>male</a>, and  90% of H-4 visa holders are <a href="https://nfap.com/wp-content/uploads/2022/11/H-4-Visa-Holders.NFAP-Policy-Brief.2022-2.pdf" target="_blank" className={styles.link}>women</a>. Only one third of them are employed. Moreover, most are highly educated: 90% of H-4 visa holders have at least a <a href="https://nfap.com/wp-content/uploads/2022/11/H-4-Visa-Holders.NFAP-Policy-Brief.2022-2.pdf" target="_blank" className={styles.link}>bachelor’s degree</a>.</p>
                    </div>
                </div>
                <div className={styles.textOnlyContainer}>
                    <div className={styles.textOnlySection}>
                        <p>This is not just a gender issue: it’s a loss of talent and expertise. Immigration rules sideline a highly skilled segment of the population, and women are the ones rendered invisible.</p>
                    </div>
                </div>
                <div className={styles.conclusionContainer}>
                    <img src={rosaSmileAtCamera} alt="Rosa Nieves smiling at the camera" />
                    <div className={styles.conclusionTextContainer}>
                        Women like Rosa Nieves.
                    </div>
                </div>
            </div>
        </PasswordProtection>
    );
};

export default MmsFinal;
