import React, { useMemo } from 'react';

const BACKGROUND_IMAGES = [
  "https://i.postimg.cc/26J58g2F/1.gif",
  "https://i.postimg.cc/XY7rjMW4/2.gif",
  "https://i.postimg.cc/qM9jCGmv/10.gif",
  "https://i.postimg.cc/mZ9wW9Lq/11.gif",
  "https://i.postimg.cc/L5WvDkmS/12.gif",
  "https://i.postimg.cc/BvCgkfJm/13.gif",
  "https://i.postimg.cc/SQ9rb9Qn/14.gif",
  "https://i.postimg.cc/SNWDCMwp/15.gif",
  "https://i.postimg.cc/RFsTC16z/16.jpg",
  "https://i.postimg.cc/nrXGXsBC/17.jpg",
  "https://i.postimg.cc/Fzwg39Vw/18.jpg",
  "https://i.postimg.cc/7hjM0xN6/19.jpg",
  "https://i.postimg.cc/y6GTwPCv/20.jpg",
  "https://i.postimg.cc/GhsjrycL/21.jpg",
  "https://i.postimg.cc/T3MJP3wn/22.jpg",
  "https://i.postimg.cc/rw1CR20j/23.jpg",
  "https://i.postimg.cc/25TQTdx0/24.jpg",
  "https://i.postimg.cc/JhKNK3Qg/25.jpg",
  "https://i.postimg.cc/mDDQncd6/26.jpg",
  "https://i.postimg.cc/zBcnYJ65/27.jpg",
  "https://i.postimg.cc/GtTvcWnV/28.jpg",
  "https://i.postimg.cc/CMR2BdFj/29.jpg",
  "https://i.postimg.cc/FstTYZCx/3.jpg",
  "https://i.postimg.cc/jqBFzK2b/30.gif",
  "https://i.postimg.cc/X7FDLhB5/31.gif",
  "https://i.postimg.cc/RZBpDRwR/32.jpg",
  "https://i.postimg.cc/65dYnvFD/4.jpg",
  "https://i.postimg.cc/NjBb40wz/5.jpg",
  "https://i.postimg.cc/zG8pjfrZ/6.webp",
  "https://i.postimg.cc/qBKLHKJW/7.gif",
  "https://i.postimg.cc/T1NNSMqm/8.webp",
  "https://i.postimg.cc/C52J7CwT/9.gif",
  "https://i.postimg.cc/8PBjhp4f/x1-COIN-MARKET-ICON-1.png",
  "https://i.postimg.cc/02dbpknD/x1-dex-icon.png",
  "https://i.postimg.cc/BQcXxSpF/x1-x-icon.png"
];

const ChaosBackground: React.FC = () => {
  // Generate a dense grid of images. 
  // We use a fixed grid but apply random offsets to make it look like a collage.
  const images = useMemo(() => {
    const cols = 8;
    const rows = 6;
    const items = [];
    let id = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const randomImg = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
        items.push({
          id: id++,
          imageUrl: randomImg,
          seed: Math.floor(Math.random() * 99999),
          // Random offset from grid center
          offsetX: (Math.random() - 0.5) * 40, 
          offsetY: (Math.random() - 0.5) * 40,
          rotation: (Math.random() - 0.5) * 15,
          delay: Math.random() * 2,
        });
      }
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black z-0 pointer-events-none select-none">
      <div className="grid grid-cols-8 grid-rows-6 w-[120vw] h-[120vh] -ml-[10vw] -mt-[10vh] gap-0">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-full h-full animate-vibe-shake hover:z-10 transition-all duration-75 pointer-events-auto"
            style={{
              animationDelay: `${img.delay}s`,
              transform: `translate(${img.offsetX}px, ${img.offsetY}px) rotate(${img.rotation}deg)`,
            }}
          >
            <img
              src={img.imageUrl}
              alt="chaos"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-125 hover:skew-x-12 hover-chaos-color transition-transform duration-100 border border-black"
              style={{
                filter: `hue-rotate(${img.seed % 360}deg) contrast(1.2)`,
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* Overlay to darken slightly so text pops a bit more if needed, though we want CHAOS */}
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default ChaosBackground;