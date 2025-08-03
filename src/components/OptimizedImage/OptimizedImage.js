'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  style,
  className,
  fill = false,
  loading = 'lazy',
  quality = 75,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (fill) {
    return (
      <>
        {isLoading && !error && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          loading={priority ? 'eager' : loading}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          style={{
            ...style,
            ...(!isLoading ? {} : { opacity: 0 }),
            transition: 'opacity 0.3s ease-in-out',
          }}
          {...props}
        />

        {error && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.200',
              color: 'grey.600',
              fontSize: '0.875rem',
            }}
          >
            Bild konnte nicht geladen werden
          </Box>
        )}
      </>
    );
  }

  return (
    <Box position="relative" style={style} className={className}>
      {isLoading && !error && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        style={{
          ...(!isLoading ? {} : { opacity: 0 }),
          transition: 'opacity 0.3s ease-in-out',
        }}
        {...props}
      />

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.200',
            color: 'grey.600',
            fontSize: '0.875rem',
            width: width,
            height: height,
          }}
        >
          Bild konnte nicht geladen werden
        </Box>
      )}
    </Box>
  );
}