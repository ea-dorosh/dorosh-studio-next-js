import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function ServiceCard({
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
        borderRadius: `16px`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.08)`,
        position: `relative`,
        overflow: `hidden`,
        padding: `24px`,
        width: `100%`,
        border: `1px solid rgba(0,0,0,0.06)`,
        transition: `transform .2s ease, box-shadow .2s ease`,
        '&:hover': {
          transform: `translateY(-2px)`,
          boxShadow: `0 16px 40px rgba(0,0,0,0.12)`,
        },
      }}
    >
      <Box
        sx={{
          position: `relative`,
          width: `100%`,
          paddingTop: {
            xs: `64%`,
            md: `56%`,
          },
          overflow: `hidden`,
        }}
      >
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          quality={85}
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
          sx={{ marginTop: `12px` }}
          color="primary"
          size="medium"
          variant="contained"
        >
          Mehr Erfahren
        </Button>
      </Box>
    </Box>
  );
}
