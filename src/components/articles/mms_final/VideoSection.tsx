import React, { useRef, useState, useEffect } from 'react';
import styles from './styles/mms_final.module.css';

interface VideoSectionProps {
    videoSource: any; // Imported video file
    introText?: string;
    intrinsicMargins?: {
        introText?: number;
        placeholder?: number;
    };
    intrinsicTop?: {
        introText?: number;
        placeholder?: number;
    };
    intrinsicTranslate?: {
        introText?: number;
        placeholder?: number;
    };
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoSource, introText, intrinsicMargins = {}, intrinsicTop = {}, intrinsicTranslate = {} }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const audioPlaceholderRef = useRef<HTMLDivElement>(null);
    const audioIntroTextRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [geometryAdjustment, setGeometryAdjustment] = useState({ introText: {
        marginBottom: 0,
        top: 0,
    }, placeholder: {
        marginBottom: 0,
        top: 0,
    } });
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastTouchTimeRef = useRef<number>(0);

    useEffect(() => {
        const videoContainer = videoContainerRef.current;
        const video = videoRef.current;

        if (!videoContainer || !video) return;

        // Update time and duration
        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleLoadedData = () => {
            if (video.duration && video.duration !== Infinity) {
                setDuration(video.duration);
            }
        };

        const handleCanPlay = () => {
            if (video.duration && video.duration !== Infinity) {
                setDuration(video.duration);
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', handleCanPlay);

        // Fallback: check duration periodically
        const checkDuration = () => {
            if (video.duration && video.duration !== Infinity && video.duration !== duration) {
                setDuration(video.duration);
            }
        };

        const durationInterval = setInterval(checkDuration, 1000);

        // Auto-hide controls when video plays
        const handlePlay = () => {
            setIsPlaying(true);
            // Hide controls after 2 seconds of playing
            hideTimeoutRef.current = setTimeout(() => {
                if (isPlaying) {
                    setShowControls(false);
                }
            }, 2000);
        };

        // Check for touch inactivity on mobile
        const checkTouchInactivity = () => {
            if (isPlaying) {
                const now = Date.now();
                if (now - lastTouchTimeRef.current > 2000) {
                    setShowControls(false);
                }
            }
            // Explicitly prevent fade out if video is paused
            if (!isPlaying) {
                setShowControls(true);
            }
        };

        // Set up periodic check for touch inactivity
        const touchInactivityInterval = setInterval(checkTouchInactivity, 1000);

        const handlePause = () => {
            setIsPlaying(false);
            setShowControls(true); // Show controls when paused
            // Clear any pending hide timeout
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
            // Reset touch time to prevent immediate fade out
            lastTouchTimeRef.current = Date.now();
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting && isPlaying) {
                        // Video is off screen and playing, so pause it
                        video.pause();
                        setIsPlaying(false);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the video is visible
                rootMargin: '0px'
            }
        );

        observer.observe(videoContainer);

        return () => {
            observer.disconnect();
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            clearInterval(durationInterval);
            clearInterval(touchInactivityInterval);
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [isPlaying, duration]);

    // Effect to calculate sizes and adjust margins
    useEffect(() => {
        const calculateMargins = () => {
            const introTextElement = audioIntroTextRef.current;
            const placeholderElement = audioPlaceholderRef.current;
            
            const introTextIntrinsicMargin = intrinsicMargins.introText || 0 * window.innerHeight;
            const placeholderIntrinsicMargin = intrinsicMargins.placeholder || 0 * window.innerHeight;

            // Get intrinsic top values (convert to pixels for calculation)
            const introTextIntrinsicTop = (intrinsicTop.introText || 0) * window.innerHeight;
            const placeholderIntrinsicTop = (intrinsicTop.placeholder || 0) * window.innerHeight;

            // Get intrinsic translate values and convert to pixel offsets
            const introTextTranslate = intrinsicTranslate.introText || 0;
            const placeholderTranslate = intrinsicTranslate.placeholder || 0;

            // Get element heights (without any CSS margins)
            const introTextHeight = (introTextElement?.getBoundingClientRect().height || 0)
            const placeholderHeight = (placeholderElement?.getBoundingClientRect().height || 0)
            
            // Calculate translate offsets in pixels (percentage of element height)
            const introTextTranslateOffset = introTextHeight * introTextTranslate;
            const placeholderTranslateOffset = placeholderHeight * placeholderTranslate;

            const actualTextTop = introTextIntrinsicTop + introTextTranslateOffset;
            const actualPlaceholderTop = placeholderIntrinsicTop + placeholderTranslateOffset;

            // Calculate total heights including intrinsic margins and top values (without translate)
            const introTextTotalHeight = introTextHeight + introTextIntrinsicMargin + actualTextTop;
            const placeholderTotalHeight = placeholderHeight + placeholderIntrinsicMargin + actualPlaceholderTop;

            // Calculate which element is smaller and how much additional margin to add
            const heightDifference = Math.abs(introTextTotalHeight - placeholderTotalHeight);
            
            const adjustedMarginBottom = {
                introText: 0,
                placeholder: 0,
            }
            
            if (introTextTotalHeight < placeholderTotalHeight) {
                // IntroText is smaller, add additional margin to it, plus apply translate offset
                adjustedMarginBottom.introText = introTextIntrinsicMargin + heightDifference;
                adjustedMarginBottom.placeholder = placeholderIntrinsicMargin;
            } else if (placeholderTotalHeight < introTextTotalHeight) {
                // Placeholder is smaller, add additional margin to it, plus apply translate offset
                adjustedMarginBottom.introText = introTextIntrinsicMargin;
                adjustedMarginBottom.placeholder = placeholderIntrinsicMargin + heightDifference;
            } else {
                // They're the same height, use intrinsic margins with translate offsets
                adjustedMarginBottom.introText = introTextIntrinsicMargin;
                adjustedMarginBottom.placeholder = placeholderIntrinsicMargin;
            }

            // If after margin adjustment there's still room in the viewport, 
            // add additional margin bottom.
            // Note: using introText here but they should be guaranteed to be the same.
            const newCommonHeight = adjustedMarginBottom.introText + introTextHeight + actualTextTop;
            if (newCommonHeight < window.innerHeight) {
                adjustedMarginBottom.introText += window.innerHeight - newCommonHeight;
                adjustedMarginBottom.placeholder += window.innerHeight - newCommonHeight;
            }

            setGeometryAdjustment({ 
                introText: {
                    marginBottom: adjustedMarginBottom.introText,
                    top: actualTextTop
                }, 
                placeholder: {
                    marginBottom: adjustedMarginBottom.placeholder,
                    top: actualPlaceholderTop
                }
            });

        };

        // Calculate margins after a short delay to ensure elements are rendered
        const timeoutId = setTimeout(calculateMargins, 100);

        // Recalculate on window resize
        const handleResize = () => {
            calculateMargins();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [introText, intrinsicMargins, intrinsicTop, intrinsicTranslate, videoSource]); // Re-run when any intrinsic values change

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setShowControls(true); // Show controls when user interacts
            lastTouchTimeRef.current = Date.now(); // Update touch time
            // Clear any pending hide timeout
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (videoRef.current && !isNaN(newTime)) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
        lastTouchTimeRef.current = Date.now(); // Update touch time
    };

    return (
        <div className={styles.audioSection}>
            {introText && (
                <div 
                    className={styles.audioIntroText}
                    ref={audioIntroTextRef}
                    style={{ 
                        marginBottom: `${geometryAdjustment.introText.marginBottom}px`,
                        top: `${geometryAdjustment.introText.top}px`,
                    }}
                >
                    <p>{introText}</p>
                </div>
            )}
            <div 
                className={styles.audioPlaceholder}
                ref={audioPlaceholderRef}
                style={{ 
                    marginBottom: `${geometryAdjustment.placeholder.marginBottom}px`,
                    top: `${geometryAdjustment.placeholder.top}px`,
                }}
            >
                <div 
                    className={styles.videoContainer} 
                    ref={videoContainerRef}
                    onMouseEnter={() => {
                        setShowControls(true);
                        // Clear any pending hide timeout
                        if (hideTimeoutRef.current) {
                            clearTimeout(hideTimeoutRef.current);
                            hideTimeoutRef.current = null;
                        }
                    }}
                    onMouseLeave={() => {
                        if (isPlaying) {
                            hideTimeoutRef.current = setTimeout(() => {
                                if (isPlaying) { // Double-check video is still playing
                                    setShowControls(false);
                                }
                            }, 2000);
                        }
                    }}
                    onMouseMove={() => {
                        if (isPlaying) {
                            setShowControls(true);
                            // Clear existing timeout and set new one
                            if (hideTimeoutRef.current) {
                                clearTimeout(hideTimeoutRef.current);
                            }
                            hideTimeoutRef.current = setTimeout(() => {
                                if (isPlaying) { // Double-check video is still playing
                                    setShowControls(false);
                                }
                            }, 2000);
                        }
                    }}
                    onTouchStart={() => {
                        lastTouchTimeRef.current = Date.now();
                        setShowControls(true);
                        // Clear any pending hide timeout
                        if (hideTimeoutRef.current) {
                            clearTimeout(hideTimeoutRef.current);
                            hideTimeoutRef.current = null;
                        }
                    }}
                    onTouchMove={() => {
                        lastTouchTimeRef.current = Date.now();
                        if (isPlaying) {
                            setShowControls(true);
                        }
                    }}
                    onClick={() => {
                        // On mobile, clicking the video screen while playing should start a 2s timer
                        if (isPlaying && 'ontouchstart' in window) {
                            setShowControls(true);
                            // Clear any existing timeout and set new 2s timer
                            if (hideTimeoutRef.current) {
                                clearTimeout(hideTimeoutRef.current);
                            }
                            hideTimeoutRef.current = setTimeout(() => {
                                if (isPlaying) {
                                    setShowControls(false);
                                }
                            }, 2000);
                        }
                        lastTouchTimeRef.current = Date.now();
                    }}
                >
                    <video 
                        ref={videoRef}
                        onEnded={handleVideoEnded}
                        style={{width: '100%' }}
                    >
                        <source src={videoSource} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className={`${styles.videoControls} ${showControls ? styles.showControls : styles.hideControls}`}>
                        <button 
                            className={styles.playPauseButton}
                            onClick={togglePlayPause}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16"/>
                                    <rect x="14" y="4" width="4" height="16"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5,3 19,12 5,21"/>
                                </svg>
                            )}
                        </button>
                        <div className={styles.videoSlider}>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSliderChange}
                                className={styles.slider}
                                aria-label="Video progress"
                            />
                            <div className={styles.timeDisplay}>
                                {Math.floor(currentTime)}s / {Math.floor(duration)}s
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height: '100vh'}}></div>
        </div>
    );
};

export default VideoSection;
