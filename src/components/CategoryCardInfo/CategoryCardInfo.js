import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function CategoryCard({
  title,
  subtitle,
  linkHref,
  imageSrc,
  imageAlt,
}) {

  return (
    <Box
      bgcolor="background.default"
      sx={{
        borderRadius: `12px`,
        boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
        position: `relative`,
        overflow: `hidden`,
        padding: `24px`,
        width: `100%`,
      }}
    >
      <Box
        sx={{
          position: `relative`,
          width: `100%`,
          paddingTop: {
            xs: `69%`,
            md: `60%`,
          },
          overflow: `hidden`,
        }}
      >
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          quality={80}
          style={{
            objectFit: `cover`,
            objectPosition: `center 0px`,
            borderRadius: `12px`,
          }}
        />
      </Box>

      <Box sx={{ padding: `16px 0px 0px 0px` }}>
        <Typography
          variant="h3"
          aria-label={title}
        >
          {title}
        </Typography>

        <Typography
          aria-label={subtitle}
          sx={{
            marginTop: `8px`,
            lineHeight: `1.5`,
          }}
        >
          {subtitle}
        </Typography>

        <Button
          component={Link}
          href={linkHref}
          sx={{
            marginTop: `8px`,
            width: {
              xs: `200px`,
              md: `220px`,
              lg: `240px`,
            },
          }}
          color="info"
          size="medium"
          variant="contained"
        >
          Mehr Erfahren
        </Button>
      </Box>
    </Box>
  );
}
