import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function SubCategoryCardInfo({
  id,
  title,
  price,
  imageSrc,
  imageAlt,
  children,
}) {
  return (
    <Box
      id={id}
      sx={{
        borderRadius: `16px`,
        padding: `24px`,
        backgroundColor: `#fff`,
        boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '67%',
          overflow: 'hidden',
          borderRadius: `16px`,
        }}
      >
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          quality={80}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
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
            fontSize: `1.3rem`,
            fontWeight: `600`,
            marginBottom: `8px`,
          }}
        >
          {title}
        </Typography>

        <Typography
          aria-label={`Preis: ${price} Euro`}
          sx={{
            fontSize: `1.2rem`,
            fontWeight: `bold`,
            color: `primary.main`,
            marginBottom: `12px`,
          }}
        >
          {price}€
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.6,
            marginBottom: `16px`,
          }}
        >
          {children}
        </Typography>

        <Button
          component={Link}
          href="/booking"
          sx={{
            marginTop: `8px`,
            width: `100%`,
          }}
          color="info"
          size="medium"
          variant="contained"
        >
          Jetzt buchen
        </Button>
      </Box>
    </Box>
  );
}