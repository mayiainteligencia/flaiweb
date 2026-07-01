import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import img1 from '@/assets/images/hero/2.jpg';
import img2 from '@/assets/images/hero/flaiCar.jpg';
import img3 from '@/assets/images/hero/4.jpg';

// Coverflow para la imagen del Home. Mantiene el tamaño original (w-72, aspect-[3/4]).
const IMAGES = [
  { src: img1, alt: 'FLAI' },
  { src: img2, alt: 'FLAI' },
  { src: img3, alt: 'FLAI' },
];

export default function CloudCarousel() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(Math.floor(IMAGES.length / 2));
  const next = useCallback(() => setCurrent((i) => (i + 1) % IMAGES.length), []);
  const prev = () => setCurrent((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, reduce]);

  return (
    <div className="relative flex w-60 justify-center [perspective:1000px]">
      <div className="relative aspect-[3/4] w-60">
        {IMAGES.map((img, index) => {
          const total = IMAGES.length;
          let pos = (index - current + total) % total;
          if (pos > Math.floor(total / 2)) pos -= total;
          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;
          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${pos * 32}%) scale(${isCenter ? 1 : isAdjacent ? 0.78 : 0.6}) rotateY(${pos * -10}deg)`,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full rounded-3xl object-cover shadow-lg"
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border-subtle bg-card/80 p-2 text-text-primary shadow-sm backdrop-blur transition-colors hover:bg-hover-bg"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border-subtle bg-card/80 p-2 text-text-primary shadow-sm backdrop-blur transition-colors hover:bg-hover-bg"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
