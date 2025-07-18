import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Image from 'next/image';
import Link from "next/link";

export default function SubCategoryCardInfo({
  id,
  title,
  price,
  imageSrc,
  imageAlt,
  children,
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
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        marginTop: `8px`,
        marginBottom: `16px`,
      }}>
        {price && (
          <Typography
            variant="h6"
            color={"primary"}
          >
            {price} €
          </Typography>
        )}
      </Box>

      {children && (
        <Box>
          {children}
        </Box>
      )}

      <Box
        sx={{
          padding: `12px 0 0 0`,
        }}
      >
        <Button
          component={Link}
          href="/booking"
          variant="contained"
          color="primary"
          sx={{
            width: `200px`,
          }}
        >
          Online Termine
        </Button>
      </Box>
    </Box>
  );
}