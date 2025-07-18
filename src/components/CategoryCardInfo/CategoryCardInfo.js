import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from 'next/image';
import Link from "next/link";

export default function CategoryCard({
  title,
  subtitle,
  linkHref,
  imageSrc,
  imageAlt,
}) {

  return (
    <Box
      bgcolor="background.paper"
      sx={{
        borderRadius: `12px`,
        boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
        position: `relative`,
        overflow: `hidden`,
        padding: `24px`,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '69%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            objectFit: `cover`,
            objectPosition: `center 0px`,
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
        >
          {title}
        </Typography>

        <Typography
          aria-label={subtitle}
          sx={{
            marginTop: `8px`,
          }}
        >
          {subtitle}
        </Typography>

        <Button
          component={Link}
          href={linkHref}
          sx={{
            marginTop: `8px`,
            width: `200px`,
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
