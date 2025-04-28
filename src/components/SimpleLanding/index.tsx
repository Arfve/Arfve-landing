"use client"

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface SimpleLandingProps {
  // Hero Section Props
  videoUrl?: string;
  mobileVideoUrl?: string;
  
  // Text Section Props
  mainHeading?: string;
  subHeading?: string;
  
  // Email Section Props
  emailHeading?: string;
  emailSubtext?: string;
  emailImage?: string;
}

export default function SimpleLanding({
  videoUrl = "/HeroVideo 1.mp4",
  mobileVideoUrl,
  mainHeading,
  subHeading,
  emailHeading,
  emailSubtext,
  emailImage = "/Arfve6.jpg"
}: SimpleLandingProps) {
  // Hero Section State
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero Section Effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoading(false);
      video.play().catch(error => {
        console.error('Video autoplay failed:', error);
        setIsVideoLoading(false);
      });
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Video error:', event);
      setIsVideoLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Hero Section Handlers
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Email Section Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement email signup
      console.log('Email submitted:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormState('success');
      setEmail('');
    } catch {
      setFormState('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full bg-black">
        <div className="relative w-full" style={{ paddingTop: 'min(56.25%, calc(100vh - 80px))' }}>
          <div className="absolute inset-0 w-full">
            <video
              ref={videoRef}
              className={`
                absolute inset-0 w-full h-full
                object-cover object-center
                transition-opacity duration-300
                ${isVideoLoading ? 'opacity-0' : 'opacity-100'}
              `}
              playsInline
              muted={isMuted}
              loop
              autoPlay
              preload="auto"
            >
              <source 
                src={mobileVideoUrl || videoUrl} 
                type="video/mp4" 
                media="(max-width: 768px)"
              />
              <source 
                src={videoUrl} 
                type="video/mp4" 
                media="(min-width: 769px)"
              />
              Your browser does not support the video tag.
            </video>
            
            {isVideoLoading && (
              <div className="absolute inset-0 w-full bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Video Controls */}
            <button
              onClick={toggleMute}
              className="absolute bottom-6 right-6 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Image
                src={isMuted ? "/volume-off.svg" : "/volume-on.svg"}
                alt={isMuted ? "Unmute" : "Mute"}
                width={24}
                height={24}
                className="w-6 h-6 text-white"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="w-full bg-white">
        <div className="w-full py-12 md:py-24">
          <div className="w-[92%] lg:w-[80%] xl:w-[618px] mx-auto px-4 md:px-0">
            <h2 className="font-poppins font-normal 
                       text-[20px] xs:text-[24px] sm:text-[28px] md:text-[40px] lg:text-[50px]
                       leading-[1.3]
                       text-center uppercase tracking-[-0.02em] text-[#192124]
                       transition-all duration-300
                       animate-fade-up">
              {mainHeading}
            </h2>
            {subHeading && (
              <p className="font-poppins font-normal 
                        text-[16px] xs:text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px]
                        leading-[1.3]
                        text-center uppercase tracking-[-0.02em] text-[#192124]
                        transition-all duration-300
                        animate-fade-up
                        mt-4 md:mt-6">
                {subHeading}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Email Section */}
      <section className="w-full bg-[#F3F3F3]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="relative w-full pb-[75%] md:pb-0 md:h-full min-h-[400px]">
              <Image
                src={emailImage}
                alt="Arfve earbuds"
                fill
                className={`
                  object-cover
                  duration-700 ease-in-out
                  ${imageLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
                onLoad={() => setImageLoading(false)}
              />
            </div>

            {/* Content */}
            <div className="px-4 md:px-8 py-8 md:py-12 flex flex-col justify-center">
              <div className="max-w-[480px]">
                <h2 className="font-poppins font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-[1.2] text-[#192124]">
                  {emailHeading || "We're shaping a sustainable future for audio devices."}
                </h2>
                <p className="font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[24px] leading-[1.2] text-[#192124] mt-2">
                  {emailSubtext || "More to come - stay tuned"}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
                  <div className="flex h-[42px] md:h-[48px] w-full max-w-[400px]">
                    <div className="flex-[3] min-w-0">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        disabled={isSubmitting}
                        className={`
                          w-full h-full px-4
                          border border-[#192124] border-r-0
                          text-[16px] md:text-[18px]
                          placeholder:text-[#192124]/60
                          focus:outline-none focus:ring-2 focus:ring-[#192124]
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-200
                        `}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className={`
                        flex-1 min-w-[100px]
                        bg-[#192124] text-white
                        text-[16px] md:text-[18px]
                        font-medium
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-[#192124]/90
                        transition-all duration-200
                      `}
                    >
                      {isSubmitting ? 'Sending...' : 'Sign up'}
                    </button>
                  </div>
                  {formState === 'success' && (
                    <p className="mt-2 text-green-600">Thank you for signing up!</p>
                  )}
                  {formState === 'error' && (
                    <p className="mt-2 text-red-600">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 