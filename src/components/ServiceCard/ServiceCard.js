import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Image from 'next/image';

export default function ServiceCard({
  id,
  title,
  description,
  price,
  duration,
  imageSrc,
  imageAlt,
  bookingLink,
  onClick,
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

      {description && (
        <Typography
          variant="body1"
          sx={{
            color: `text.secondary`,
            marginBottom: `8px`,
          }}
        >
          {description}
        </Typography>
      )}

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
            sx={{
              fontWeight: `bold`,
            }}
          >
            {price} €
          </Typography>
        )}
        {duration && (
          <Typography
            variant="body2"
            sx={{
              color: `text.secondary`,
            }}
          >
            {duration} Min
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          padding: `12px 26px 0 26px`,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{
            width: `100%`,
          }}
        >
          {bookingLink ? 'Online Termine' : 'Buchen'}
        </Button>
      </Box>
    </Box>
  );
}