'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function ParallaxHero({
  src,
  alt,
  headline,
  subHeadline,
  height = `80vh`,
}) {
  const imageLayerRef = useRef(null);
  const contentLayerRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || 0;
      const imgT = Math.min(y * 0.2, 120);
      const contentT = Math.min(y * 0.1, 60);
      if (imageLayerRef.current) {
        imageLayerRef.current.style.transform = `translate3d(0, ${imgT}px, 0) scale(1.05)`;
      }
      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(0, ${contentT}px, 0)`;
      }
    };
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener(`scroll`, onScroll, { passive: true });
    window.addEventListener(`resize`, onScroll);
    return () => {
      window.removeEventListener(`scroll`, onScroll);
      window.removeEventListener(`resize`, onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const imageStyle = {
    transformOrigin: `center`,
    objectFit: `cover`,
    objectPosition: `center`,
    willChange: `transform`,
  };

  return (
    <Box
      component="section"
      sx={{
        position: `relative`,
        width: `100%`,
        height,
      }}
    >
      <Box
        sx={{
          position: `absolute`,
          inset: 0,
        }}
      >
        <Box
          sx={{
            position: `relative`,
            height: `100%`,
            maxWidth: `1200px`,
            mx: `auto`,
            overflow: `hidden`,
            borderRadius: {
              xs: 0,
              md: `24px`,
            },
          }}
        >
          <Box
            ref={imageLayerRef}
            sx={{
              position: `absolute`,
              inset: 0,
              willChange: `transform`,
              transform: `translate3d(0, 0, 0) scale(1.05)`,
              backfaceVisibility: `hidden`,
              transformStyle: `preserve-3d`,
              contain: `paint`,
            }}
          >
            <OptimizedImage
              src={src}
              alt={alt}
              priority
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              quality={90}
              placeholder="empty"
              style={imageStyle}
            />
          </Box>

          <Box
            sx={{
              position: `absolute`,
              inset: 0,
              background:
                `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.35) 100%)`,
            }}
          />
        </Box>
      </Box>

      <Box
        ref={contentLayerRef}
        sx={{
          position: `relative`,
          zIndex: 1,
          height: `100%`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          textAlign: `center`,
          px: {
            xs: 2,
            md: 6,
          },
          transition: `transform 0.2s ease-out`,
        }}
      >
        <Box sx={{ maxWidth: 980 }}>
          {headline && (
            <Typography
              variant="h1"
              sx={{
                color: `common.white`,
                textTransform: `uppercase`,
                letterSpacing: {
                  xs: `0.08em`,
                  md: `0.12em`,
                },
                fontSize: {
                  xs: `2rem`,
                  md: `3rem`,
                },
                fontWeight: 700,
              }}
            >
              {headline}
            </Typography>
          )}

          {subHeadline && (
            <Typography
              sx={{
                color: `grey.100`,
                mt: 2,
                fontSize: {
                  xs: `1rem`,
                  md: `1.25rem`,
                },
                lineHeight: 1.6,
              }}
            >
              {subHeadline}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}


