'use client';

import {
  Typography,
  Button,
  Box,
} from "@mui/material";
import Image from 'next/image';

export default function SubCategoryCardBooking({
  title,
  imageSrc,
  imageAlt,
  subCategory,
  onSubCategoryClick,
}) {
  return (
    <Box
      bgcolor="background.paper"
      sx={{
        borderRadius: `12px`,
        boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
        position: `relative`,
        overflow: `hidden`,
        padding: `18px`,
        textDecoration: `none`,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '40%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            objectFit: `cover`,
            objectPosition: `center`,
            borderRadius: `12px`,
          }}
        />
      </Box>

      <Box sx={{
        padding: `16px 0px 0px 0px`,
      }}>
        <Typography
          variant="h3"
          aria-label={title}
          sx={{
            fontSize: `1.6rem`,
            fontWeight: `bold`,
            color: `primary.main`,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            textAlign: `left`,
            fontSize: `1rem`,
            color: `primary.main`,
            opacity: 0.8,
          }}
        >
          {subCategory.services.length} {subCategory.services.length === 1 ? 'Service' : 'Services'} verfügbar
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: `1.2rem`,
            width: `250px`,
          }}
          onClick={onSubCategoryClick || (() => {})}
        >
          Buchen
        </Button>
      </Box>
    </Box>
  );
}
