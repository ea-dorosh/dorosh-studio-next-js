'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function RevealSection({
  src,
  alt,
  title,
  text,
  imageSide = `right`, // 'left' | 'right'
  height = 560,
}) {
  const containerRef = useRef(null);
  const [visible] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(() => {}, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const imageBlock = (
    <Box
      sx={{
        position: `relative`,
        flex: `1 1 55%`,
        mx: {
          xs: `calc(50% - 50vw)`,
          md: 0,
        },
        width: {
          xs: `100vw`,
          md: `auto`,
        },
        minHeight: {
          xs: 280,
          md: height,
        },
        overflow: `hidden`,
        borderRadius: {
          xs: 0,
          md: `24px`,
        },
        transform: visible ? `none` : `translateY(24px)`,
        opacity: visible ? 1 : 0,
        transition: `opacity .6s ease, transform .6s ease`,
      }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        style={{
          objectFit: `cover`,
          objectPosition: `center`,
        }}
      />
    </Box>
  );

  const copyBlock = (
    <Box
      sx={{
        flex: `1 1 45%`,
        px: {
          xs: 2,
          md: 4,
        },
        mt: {
          xs: 2,
          md: 0,
        },
        transform: visible ? `none` : `translateY(24px)`,
        opacity: visible ? 1 : 0,
        transition: `opacity .6s ease .1s, transform .6s ease .1s`,
      }}
    >
      {title && (
        <Typography
          variant="h3"
          color="primary"
          sx={{
            fontWeight: 700,
            mb: 2,
            letterSpacing: `.02em`,
          }}
        >
          {title}
        </Typography>
      )}
      {text && (
        <Typography
          color="primary"
          sx={{ lineHeight: 1.75 }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        my: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: `flex`,
            flexDirection: {
              xs: `column`,
              md: imageSide === `right` ? `row` : `row-reverse`,
            },
            gap: {
              xs: 2,
              md: 4,
            },
            alignItems: `stretch`,
          }}
        >
          {imageBlock}
          {copyBlock}
        </Box>
      </Box>
    </Box>
  );
}


