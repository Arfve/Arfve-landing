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
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
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
              className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
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
        {/* Mobile Layout */}
        <div className="md:hidden w-full py-12">
          <div className="w-full px-4">
            <h2 className="font-poppins font-normal 
                         text-[20px] xs:text-[24px] sm:text-[28px]
                         leading-[1.3]
                         text-center uppercase tracking-[-0.02em] text-[#192124]
                         max-w-[500px] mx-auto">
              {mainHeading}
            </h2>
            {subHeading && (
              <p className="font-poppins font-normal 
                          text-[16px] xs:text-[20px] sm:text-[24px]
                          leading-[1.3]
                          text-center uppercase tracking-[-0.02em] text-[#192124]
                          max-w-[500px] mx-auto
                          mt-4">
                {subHeading}
              </p>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="relative w-full" style={{ paddingTop: '36.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[92%] lg:w-[80%] xl:w-[618px] 
                            px-fluid-4
                            transition-all duration-300">
                <h2 className="font-poppins font-normal 
                             text-[clamp(28px,3.5vw,50px)]
                             leading-[1.3]
                             text-center uppercase tracking-[-0.02em] text-[#192124]
                             transition-all duration-300
                             animate-fade-up">
                  {mainHeading}
                </h2>
                {subHeading && (
                  <p className="font-poppins font-normal 
                              text-[clamp(24px,2.5vw,40px)]
                              leading-[1.3]
                              text-center uppercase tracking-[-0.02em] text-[#192124]
                              transition-all duration-300
                              animate-fade-up
                              mt-6">
                    {subHeading}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Section */}
      <section className="w-full bg-[#F3F3F3]">
        <div className="relative w-full">
          {/* Mobile layout */}
          <div className="md:hidden">
            <div className="w-full relative pb-[75%]">
              <Image
                src={emailImage}
                alt="Arfve earbuds"
                fill
                className={`
                  object-cover
                  duration-700 ease-in-out
                  ${imageLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
                `}
                sizes="(max-width: 768px) 100vw, 33.89vw"
                quality={90}
                priority
                onLoad={() => setImageLoading(false)}
              />
            </div>

            <div className="w-full px-4 py-6">
              <div className="w-full">
                <div className="flex flex-col gap-1">
                  <h2 className="font-[&apos;Poppins&apos;] font-semibold text-[20px] leading-[1.2] text-[#192124]">
                    {emailHeading || "We're shaping a sustainable future for audio devices."}
                  </h2>
                  <p className="font-[&apos;Poppins&apos;] font-semibold text-[20px] leading-[1.2] text-[#192124]">
                    {emailSubtext || "More to come - stay tuned"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex h-[42px] w-full">
                    <div className="flex-[3] min-w-0">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        disabled={isSubmitting}
                        className={`
                          w-full h-full px-3
                          rounded-l-lg border border-r-0 border-gray-300 
                          focus:outline-none focus:border-gray-500
                          transition-all duration-300
                          text-[14px]
                          disabled:bg-gray-50 disabled:cursor-not-allowed
                          ${formState === 'error' ? 'border-red-500 focus:border-red-500' : ''}
                          ${formState === 'success' ? 'border-green-500 focus:border-green-500' : ''}
                        `}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        h-full px-3 flex-1
                        rounded-r-lg font-medium 
                        bg-[#B17864] text-white
                        hover:bg-[#9A6753] 
                        transition-all duration-300 
                        whitespace-nowrap
                        text-[14px]
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${isSubmitting ? 'bg-[#9A6753]' : ''}
                      `}
                    >
                      Sign up
                    </button>
                  </div>
                  <div className="mt-2 w-full">
                    <p className="text-[12px] text-gray-600">
                      Sign up with your email address, pay €1 to get our best opening offer
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 flex">
              <div className="w-[33.89%] relative">
                <div className="absolute inset-0">
                  <Image
                    src={emailImage}
                    alt="Arfve earbuds"
                    fill
                    className={`
                      object-cover
                      duration-700 ease-in-out
                      ${imageLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
                    `}
                    sizes="(max-width: 768px) 100vw, 33.89vw"
                    quality={90}
                    priority
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center pl-[8.61%] pr-[5%] py-12">
                <div className="w-full">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-[&apos;Poppins&apos;] font-semibold text-[clamp(16px,2.08vw,30px)] leading-[1.2] text-[#192124] break-words">
                      {emailHeading || "We're shaping a sustainable future for audio devices."}
                    </h2>
                    <p className="font-['Poppins'] font-semibold text-[clamp(16px,2.08vw,30px)] leading-[1.2] text-[#192124] break-words">
                      {emailSubtext || "More to come - stay tuned"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-[clamp(16px,1.67vw,24px)]">
                    <div className="flex h-[46px] w-full">
                      <div className="flex-[2] min-w-0">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email"
                          disabled={isSubmitting}
                          className={`
                            w-full h-full px-[clamp(12px,1.11vw,16px)]
                            rounded-l-lg border border-r-0 border-gray-300 
                            focus:outline-none focus:border-gray-500
                            transition-all duration-300
                            text-[clamp(12px,1.11vw,16px)]
                            disabled:bg-gray-50 disabled:cursor-not-allowed
                            ${formState === 'error' ? 'border-red-500 focus:border-red-500' : ''}
                            ${formState === 'success' ? 'border-green-500 focus:border-green-500' : ''}
                          `}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                          h-full px-[clamp(12px,1.11vw,16px)] flex-1
                          rounded-r-lg font-medium 
                          bg-[#B17864] text-white
                          hover:bg-[#9A6753] 
                          transition-all duration-300 
                          whitespace-nowrap
                          text-[clamp(12px,1.11vw,16px)]
                          disabled:opacity-50 disabled:cursor-not-allowed
                          ${isSubmitting ? 'bg-[#9A6753]' : ''}
                        `}
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="mt-2 w-full">
                      <p className="text-[clamp(10px,0.97vw,14px)] text-gray-600 break-words">
                        Sign up with your email address, pay €1 to get our best opening offer
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 