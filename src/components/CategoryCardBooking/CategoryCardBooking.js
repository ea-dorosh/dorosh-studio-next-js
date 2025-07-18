import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from 'next/image';

export default function CategoryCardBooking({
  title,
  imageSrc,
  imageAlt,
  onClick,
}) {

  return (
    <Box
      onClick={onClick}
      bgcolor="background.paper"
      sx={{
        borderRadius: `12px`,
        boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
        position: `relative`,
        overflow: `hidden`,
        padding: `24px`,
        cursor: onClick ? 'pointer' : 'default',
        textDecoration: `none`,
        '&:hover': onClick ? {
          boxShadow: `0 0 15px 0 rgba(0, 0, 0, 0.2)`,
        } : {},
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          borderRadius: `8px`,
          overflow: `hidden`,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            objectFit: `cover`,
          }}
        />
      </Box>

      <Box
        sx={{
          marginTop: `16px`,
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          sx={{
            fontSize: `1.5rem`,
            fontWeight: `600`,
            textAlign: `center`,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
