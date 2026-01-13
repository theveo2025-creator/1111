import React, { useState, useEffect, useRef } from 'react';
import { Music, Terminal, Cpu, Zap, X, Gamepad2 } from 'lucide-react';
import ChaosBackground from './components/ChaosBackground';
import CSuiteSurgeGame from './components/CSuiteSurgeGame';

const LOADING_TEXTS = [
  "Initializing cheeseburger...",
  "Loading liquidity...",
  "Longing the schlongs...",
  "Saving the whales...",
];

const LOG_MESSAGES = [
  "Lubing up the doorframe for entry...",
  "Ignoring the 'Maximum Occupancy' sign...",
  "Releasing the pheromones of a thousands of dead chickens...",
  "Injecting the fat...",
  "Drowning the hard drive in ranch dressing...",
  "Scanning for cheeseburgers...",
  "Pump pump pump...",
  "Deep frying a nigga...",
];

const App: React.FC = () => {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const cursorRef = useRef<HTMLImageElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Logic
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  // Loading Sequence Logic
  useEffect(() => {
    const totalSteps = LOADING_TEXTS.length;
    let step = 0;

    const mainInterval = setInterval(() => {
      step++;
      if (step < totalSteps) {
        setLoadingIndex(step);
      } else {
        clearInterval(mainInterval);
        startExplosion();
      }
    }, 1500);

    const logInterval = setInterval(() => {
      const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 2 } as any);
      setLogs(prev => [...prev.slice(-6), `[${timestamp}] > ${randomLog}`]);
    }, 400);

    return () => {
      clearInterval(mainInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startExplosion = () => {
    setIsExploding(true);
    setTimeout(() => {
      setHasLoaded(true);
      setIsExploding(false);
    }, 800);
  };

  const handlePlayAnthem = () => {
    setIsVideoOpen(true);
    document.body.style.filter = 'invert(1)';
    setTimeout(() => {
      document.body.style.filter = 'invert(0)';
    }, 100);
  };

  if (!hasLoaded && !isExploding) {
    return (
      <div className="fixed inset-0 bg-degen-pink z-50 flex items-center justify-center overflow-hidden font-mono select-none cursor-none">
        <img 
          ref={cursorRef}
          src="https://i.postimg.cc/XY7rjMW4/2.gif" 
          alt="" 
          className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9999]" 
        />
        <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className={`whitespace-nowrap text-8xl md:text-9xl font-black italic text-black leading-none ${i % 2 === 0 ? 'animate-marquee-left' : 'animate-marquee-right'}`}
              style={{ animationDuration: `${15 + i * 2}s` }}
            >
              LOADING /// WAITING /// PUMPING /// LOADING /// WAITING /// PUMPING /// LOADING /// WAITING /// PUMPING ///
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-2xl mx-4 transform animate-wiggle">
          <div className="bg-black border-4 border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-1">
            <div className="bg-white text-black px-4 py-2 font-bold flex justify-between items-center border-b-4 border-black mb-1">
              <span className="flex items-center gap-2"><Terminal size={18} /> WHALE_ACCESS_GRANTED</span>
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-black border border-white"></div>
                <div className="w-4 h-4 bg-black border border-white"></div>
                <div className="w-4 h-4 bg-black border border-white"></div>
              </div>
            </div>
            <div className="p-6 md:p-10 flex flex-col gap-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
                  {LOADING_TEXTS[loadingIndex]}
                </h1>
                {loadingIndex === LOADING_TEXTS.length - 1 && (
                  <p className="text-degen-yellow animate-pulse font-bold tracking-widest text-sm md:text-base mt-2">
                    ( INSHALLAH )
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-degen-green uppercase font-bold">
                  <span>Progress</span>
                  <span>{Math.round(((loadingIndex + 1) / LOADING_TEXTS.length) * 100)}%</span>
                </div>
                <div className="w-full h-12 border-2 border-white relative bg-white/10">
                  <div 
                    className="h-full bg-degen-green absolute top-0 left-0 border-r-4 border-black transition-all duration-300 ease-out"
                    style={{ width: `${((loadingIndex + 1) / LOADING_TEXTS.length) * 100}%` }}
                  >
                    <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-white/20 bg-white/5 p-4 h-32 overflow-hidden relative font-mono text-xs md:text-sm text-cyan-400">
                <div className="absolute top-0 right-0 p-1 text-[10px] text-white/40 border-l border-b border-white/20 bg-black">FAT_LOGS</div>
                <div ref={scrollContainerRef} className="h-full overflow-y-auto space-y-1 no-scrollbar">
                  {logs.map((log, idx) => (
                    <div key={idx} className="opacity-80">{">"} {log}</div>
                  ))}
                  <div className="animate-pulse">{">"} _</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-white/50 border-t border-white/10 pt-4 uppercase">
                <div className="flex items-center gap-2">
                  <Cpu size={14} />
                  <span>MEME: $WHALE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-degen-yellow" />
                  <span>VOLTAGE: FAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans cursor-none">
      <img 
        ref={cursorRef}
        src="https://i.postimg.cc/XY7rjMW4/2.gif" 
        alt="" 
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9999]" 
      />
      {isExploding && (
        <div className="fixed inset-0 z-[1000] bg-white flex items-center justify-center animate-explode pointer-events-none">
           <img src="https://i.postimg.cc/XY7rjMW4/2.gif" alt="BOOM" className="w-96 h-96 object-contain" />
        </div>
      )}
      <ChaosBackground />
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
        <div className="pointer-events-auto relative bg-white border-4 md:border-6 border-black shadow-[8px_8px_0px_0px_#000] md:shadow-[16px_16px_0px_0px_#000] flex flex-col max-w-4xl mx-auto transform transition-transform duration-200 hover:rotate-1 hover:scale-[1.01]">
            <div className="bg-black text-white px-3 py-1.5 font-mono text-xs flex justify-between items-center select-none border-b-4 border-black">
                <span className="tracking-widest">THE_WHITE_WHALE.EXE</span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-degen-green rounded-full border border-white/50"></div>
                    <div className="w-2.5 h-2.5 bg-degen-yellow rounded-full border border-white/50"></div>
                    <div className="w-2.5 h-2.5 bg-degen-pink rounded-full border border-white/50"></div>
                </div>
            </div>
            <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,#f5f5f5_10px,#f5f5f5_20px)] z-0 animate-moving-stripes"></div>
                <div className="relative group z-10 shrink-0">
                    <div className="absolute inset-0 bg-degen-green translate-x-3 translate-y-3 border-4 border-black group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300"></div>
                    <div className="absolute inset-0 bg-degen-pink -translate-x-2 -translate-y-2 border-4 border-black mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                        src="https://i.postimg.cc/1zMtbJ2F/LOGO-MAIN.jpg" 
                        alt="The Whale" 
                        className="relative w-48 h-48 md:w-64 md:h-64 lg:w-[280px] lg:h-[280px] object-cover border-4 md:border-8 border-black grayscale contrast-125 group-hover:grayscale-0 group-hover:rotate-2 transition-all duration-300 z-10 bg-white"
                    />
                    <div className="absolute -top-4 -left-4 z-20 bg-degen-yellow text-black font-black text-xs md:text-sm px-3 py-1 border-4 border-black -rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform">
                        100% WHALE
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 flex-1 min-w-0">
                    <h1 className="font-black leading-[0.8] tracking-tighter uppercase select-none flex flex-col items-center md:items-start mb-6 w-full">
                        <span className="text-3xl md:text-5xl bg-black text-white px-2 py-1 mb-2 rotate-[-3deg] inline-block shadow-[4px_4px_0px_0px_#FF00FF]">
                          THE
                        </span>
                        <span className="text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-cyan-300 drop-shadow-[3px_3px_0px_#000] stroke-black" style={{ WebkitTextStroke: '1.5px black' }}>
                          WHITE
                        </span>
                        <span className="text-6xl md:text-7xl lg:text-8xl text-black drop-shadow-[6px_6px_0px_#00FF00] hover:translate-x-2 transition-transform cursor-crosshair">
                          WHALE
                        </span>
                    </h1>
                     <div className="w-full bg-white/80 backdrop-blur-sm border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] flex flex-col xl:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2">
                             <SocialIcon src="https://i.postimg.cc/BQcXxSpF/x1-x-icon.png" alt="X" />
                             <SocialIcon src="https://i.postimg.cc/02dbpknD/x1-dex-icon.png" alt="Dex" />
                             <SocialIcon src="https://i.postimg.cc/8PBjhp4f/x1-COIN-MARKET-ICON-1.png" alt="CMC" href="https://www.pornpics.com/?q=fat+woman" />
                        </div>
                        <button 
                          onClick={handlePlayAnthem}
                          className="w-full xl:w-auto group relative inline-flex items-center justify-center px-3 py-2 text-base md:text-lg font-black text-black bg-degen-green border-4 border-black hover:bg-black hover:text-white transition-all duration-200 shadow-[3px_3px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#FF00FF] hover:-translate-y-1 active:translate-y-1 active:shadow-none whitespace-nowrap"
                        >
                          <span className="mr-2 animate-spin-slow group-hover:animate-spin"><Music size={20} /></span>
                          <span>PLAY_ANTHEM</span>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 animate-pulse pointer-events-none"></div>
                        </button>
                     </div>
                </div>
            </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 z-[60] flex flex-col gap-4 pointer-events-auto">
        <div className="bg-degen-yellow border-4 border-black p-2 rotate-[-12deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce hidden md:block">
          <span className="font-black text-xl uppercase">BUY NOW</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsGameOpen(true);
          }}
          className="bg-purple-600 hover:bg-purple-500 text-white border-4 border-black p-2 rotate-[-5deg] shadow-[8px_8px_0px_0px_#00FF00] hover:scale-110 transition-transform flex items-center gap-2 group cursor-pointer"
        >
          <Gamepad2 size={24} className="group-hover:rotate-180 transition-transform" />
          <span className="font-black text-xl uppercase">PLAY GAME</span>
        </button>
      </div>
      
      <a 
        href="https://tenor.com/de/search/fat-woman-gifs"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-10 right-10 z-40 bg-degen-pink border-4 border-black p-3 rotate-[12deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden md:block hover:scale-110 transition-transform"
      >
        <span className="font-mono text-lg font-bold">MEMES 🍔</span>
      </a>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-auto" onClick={() => setIsVideoOpen(false)}>
            <div className="relative w-full max-w-4xl bg-black border-4 border-white shadow-[12px_12px_0px_0px_#FF00FF]" onClick={(e) => e.stopPropagation()}>
                <div className="bg-degen-green text-black border-b-4 border-white px-4 py-2 flex justify-between items-center font-black">
                    <span className="flex items-center gap-2"><Music size={20} /> WHALE_ANTHEM.EXE</span>
                    <button onClick={() => setIsVideoOpen(false)} className="hover:bg-black hover:text-white px-2 py-1 uppercase border-2 border-black transition-colors">
                      <X size={20} />
                    </button>
                </div>
                <div className="aspect-video w-full bg-black">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://drive.google.com/file/d/1_C4kGaN6q8kCazEIc92BfOHK5c6-YLDt/preview" 
                        title="Anthem Video" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                    ></iframe>
                </div>
            </div>
        </div>
      )}

      {isGameOpen && (
        <CSuiteSurgeGame onClose={() => setIsGameOpen(false)} />
      )}
    </div>
  );
};

interface SocialIconProps {
  src: string;
  alt: string;
  href?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt, href = "#" }) => {
  const isExternal = href.startsWith('http');
  return (
    <a 
      href={href} 
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      className={`group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_#000] p-1`}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </a>
  );
};

export default App;