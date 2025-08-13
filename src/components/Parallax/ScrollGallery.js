'use client';

import Box from '@mui/material/Box';
import { useRef, useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function ScrollGallery({ images = [] }) {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const windowH = window.innerHeight;
        const start = Math.max(0, windowH - rect.top);
        const end = rect.height + windowH;
        const p = Math.min(1, Math.max(0, start / end));
        // Apply transforms directly to reduce React re-renders
        itemRefs.current.forEach((el, index) => {
          if (!el) return;
          const base = 1 + index * 0.04;
          const translateY = (1 - p) * (60 - index * 15);
          el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${base})`;
        });
      });
    };
    onScroll();
    window.addEventListener(`scroll`, onScroll, { passive: true });
    window.addEventListener(`resize`, onScroll);
    return () => {
      window.removeEventListener(`scroll`, onScroll);
      window.removeEventListener(`resize`, onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        my: {
          xs: 6,
          md: 10,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: `relative`,
            height: {
              xs: 480,
              md: 640,
            },
            overflow: `hidden`,
            borderRadius: {
              xs: `16px`,
              md: `24px`,
            },
            willChange: `transform`,
            transform: `translateZ(0)`,
            backfaceVisibility: `hidden`,
          }}
        >
          {images.slice(0, 3).map((img, index) => {
            const base = 1 + index * 0.04;
            const z = 10 - index;
            const widthPct = index === 0 ? `52%` : index === 1 ? `38%` : `28%`;
            const leftPct = index === 0 ? `6%` : index === 1 ? `48%` : `72%`;
            const topPct = index === 0 ? `10%` : index === 1 ? `24%` : `54%`;
            return (
              <Box
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                sx={{
                  position: `absolute`,
                  top: topPct,
                  left: leftPct,
                  width: {
                    xs: `calc(${widthPct} + 6%)`,
                    md: widthPct,
                  },
                  aspectRatio: `3 / 4`,
                  transform: `translate3d(0, 0, 0) scale(${base})`,
                  zIndex: z,
                  boxShadow: `0 10px 20px rgba(0,0,0,.18)`,
                  borderRadius: {
                    xs: `12px`,
                    md: `16px`,
                  },
                  overflow: `hidden`,
                  willChange: `transform, opacity`,
                  backfaceVisibility: `hidden`,
                  transformStyle: `preserve-3d`,
                  contain: `paint`,
                }}
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.alt || ``}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={90}
                  style={{
                    objectFit: `cover`,
                    objectPosition: `center`,
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}


