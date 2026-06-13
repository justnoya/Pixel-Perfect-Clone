import { useRef, useEffect, useState } from "react";

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 1;
    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src={`${import.meta.env.BASE_URL}bg-video.mp4`} type="video/mp4" />
      </video>

      {/* Fallback dark bg while video loads */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 py-6">
          <span className="text-white text-2xl font-bold tracking-tight select-none">
            Brand
          </span>
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</a>
            <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Work</a>
            <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Contact</a>
            <a
              href="#"
              className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-24">
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-4">
            Welcome to the future
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight max-w-4xl mb-6">
            Experience Something
            <span className="block italic font-light">Extraordinary</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10">
            A bold vision brought to life. Scroll down to explore our story, or dive straight in.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Explore Now
            </a>
            <a
              href="#"
              className="border border-white/40 text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 flex items-center justify-between">
          <p className="text-white/40 text-xs">© 2026 Brand. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
