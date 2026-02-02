'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState, useCallback } from 'react';

const MOSAIC_PATTERNS = [
  {
    gridColumn: `span 1`,
    gridRow: `span 2`,
  }, // Tall
  {
    gridColumn: `span 1`,
    gridRow: `span 1`,
  }, // Square
  {
    gridColumn: `span 1`,
    gridRow: `span 1`,
  }, // Square
  {
    gridColumn: `span 1`,
    gridRow: `span 2`,
  }, // Tall
  {
    gridColumn: `span 1`,
    gridRow: `span 1`,
  }, // Square
  {
    gridColumn: `span 1`,
    gridRow: `span 1`,
  }, // Square
];

const getMosaicStyle = (index) => {
  const patternIndex = index % MOSAIC_PATTERNS.length;
  return MOSAIC_PATTERNS[patternIndex];
};

export default function MosaicGallery({
  images = [],
  title = `Unsere Arbeiten`,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === images.length - 1 ? 0 : previousIndex + 1
    );
  }, [images.length]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === `ArrowLeft`) {
      goToPrevious();
    } else if (event.key === `ArrowRight`) {
      goToNext();
    } else if (event.key === `Escape`) {
      closeLightbox();
    }
  }, [goToPrevious, goToNext, closeLightbox]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        marginTop: `48px`,
        marginBottom: `32px`,
      }}
    >
      {title && (
        <Typography
          variant="h4"
          sx={{
            marginBottom: `24px`,
            fontSize: `1.3rem`,
            fontWeight: `600`,
            color: `primary.main`,
            textAlign: `center`,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Mosaic Grid */}
      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(2, 1fr)`,
          gridAutoRows: `140px`,
          gap: `8px`,
          '@media (min-width: 600px)': {
            gridTemplateColumns: `repeat(3, 1fr)`,
            gridAutoRows: `180px`,
            gap: `12px`,
          },
          '@media (min-width: 900px)': {
            gridAutoRows: `200px`,
            gap: `16px`,
          },
        }}
      >
        {images.map((image, index) => {
          const mosaicStyle = getMosaicStyle(index);

          return (
            <Box
              key={image.src}
              role="button"
              tabIndex={0}
              aria-label={image.alt || `Gallery image ${index + 1}`}
              onClick={() => openLightbox(index)}
              onKeyDown={(event) => {
                if (event.key === `Enter` || event.key === ` `) {
                  event.preventDefault();
                  openLightbox(index);
                }
              }}
              sx={{
                position: `relative`,
                overflow: `hidden`,
                borderRadius: `12px`,
                cursor: `pointer`,
                transition: `transform 0.3s ease, box-shadow 0.3s ease`,
                outline: `none`,
                '&:focus-visible': {
                  outline: `2px solid #000`,
                  outlineOffset: `2px`,
                },
                '&:hover': {
                  transform: `scale(1.02)`,
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.15)`,
                },
                '&:hover img': {
                  transform: `scale(1.05)`,
                },
                ...mosaicStyle,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 33vw"
                style={{
                  objectFit: `cover`,
                  transition: `transform 0.4s ease`,
                }}
              />
            </Box>
          );
        })}
      </Box>

      {/* Fullscreen Lightbox Modal */}
      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        onKeyDown={handleKeyDown}
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <Box
          sx={{
            position: `relative`,
            width: `100vw`,
            height: `100vh`,
            backgroundColor: `rgba(0, 0, 0, 0.95)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            outline: `none`,
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <IconButton
            onClick={closeLightbox}
            sx={{
              position: `absolute`,
              top: `60px`,
              right: {
                xs: `16px`,
                md: `24px`,
              },
              color: `white`,
              backgroundColor: `rgba(255, 255, 255, 0.1)`,
              backdropFilter: `blur(10px)`,
              zIndex: 10,
              '&:hover': {
                backgroundColor: `rgba(255, 255, 255, 0.2)`,
              },
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                sx={{
                  position: `absolute`,
                  left: {
                    xs: `8px`,
                    md: `24px`,
                  },
                  top: `50%`,
                  transform: `translateY(-50%)`,
                  color: `white`,
                  backgroundColor: `rgba(255, 255, 255, 0.1)`,
                  backdropFilter: `blur(10px)`,
                  zIndex: 10,
                  '&:hover': {
                    backgroundColor: `rgba(255, 255, 255, 0.2)`,
                  },
                }}
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                sx={{
                  position: `absolute`,
                  right: {
                    xs: `8px`,
                    md: `24px`,
                  },
                  top: `50%`,
                  transform: `translateY(-50%)`,
                  color: `white`,
                  backgroundColor: `rgba(255, 255, 255, 0.1)`,
                  backdropFilter: `blur(10px)`,
                  zIndex: 10,
                  '&:hover': {
                    backgroundColor: `rgba(255, 255, 255, 0.2)`,
                  },
                }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </>
          )}

          {/* Image Counter */}
          <Typography
            sx={{
              position: `absolute`,
              bottom: {
                xs: `16px`,
                md: `24px`,
              },
              left: `50%`,
              transform: `translateX(-50%)`,
              color: `rgba(255, 255, 255, 0.8)`,
              fontSize: `0.9rem`,
              letterSpacing: `2px`,
            }}
          >
            {currentIndex + 1} / {images.length}
          </Typography>

          {/* Main Image */}
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{
              position: `relative`,
              width: {
                xs: `90vw`,
                md: `80vw`,
              },
              height: {
                xs: `70vh`,
                md: `80vh`,
              },
              maxWidth: `1200px`,
            }}
          >
            <Image
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt || `Gallery image`}
              fill
              sizes="100vw"
              style={{
                objectFit: `contain`,
              }}
              priority
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
