import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Image from 'next/image';
import Link from "next/link";

export default function ServiceCard({
  id,
  title,
  children,
  imageSrc,
  imageAlt,
  bookingLink,
}) {
  const imageStyles = {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

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
          paddingTop: '90%',
          overflow: 'hidden',
          borderRadius: `16px`,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width="300"
          height="200"
          style={imageStyles}
        />
      </Box>

      <Typography
        variant="h3"
        color={"primary"}
        sx={{
          fontWeight: `bold`,
          fontSize: `1.6rem`,
          marginTop: `8px`,
          marginBottom: `8px`,
        }}
      >
        {title}
      </Typography>

      <Box sx={{
        marginTop: `8px`,
      }}>
        {children}
      </Box>

      <Box
        sx={{
          padding: `12px 26px 0 26px`,
        }}
      >
        <Button
          component={Link}
          variant="contained"
          color="primary"
          href={bookingLink}
          sx={{
            width: `100%`,
          }}
        >
          Online Termine
        </Button>
      </Box>
    </Box>
  );
}