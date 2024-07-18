import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from 'next/image';
import Link from "next/link";

export default function ServicesCard({
  title,
  subtitle,
  linkHref,
  imageSrc,
  imageAlt,
}) {

  return (
    <Box
      bgcolor="background.secondary"
    >
      <Box 
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '50%',
          overflow: 'hidden',
        }}
      >
        <Image 
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          objectPosition="center 0px"
        />
      </Box>

      <Box sx={{
        padding: `12px 24px 24px 24px`,
      
      }}>
        <Typography
          variant="h3"
          aria-label="Velvet Lips Permanent Make-up"
        >
          {title}
        </Typography>

        <Typography
          variant="subtitle1"
          aria-label="Lippenpigmentierung"
        >
          {subtitle}
        </Typography>

        <Button 
          component={Link}
          href={linkHref}
          sx={{
            marginTop: `12px`,
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
