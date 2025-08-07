import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/Button";

export default function ContactSection() {

  return (
    <Box
      color="primary.main"
      bgcolor="background.default"
      sx={{padding: `24px`}}
    >
      <Typography
        variant="h2"
        color="primary"
        sx={{
          fontSize: `2.2rem`,
          textAlign: `center`,
        }}
      >
        Unsere Kontakte
      </Typography>

      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          fontSize: `1rem`,
          lineHeight: `1.5`,
        }}
        color="primary"
      >
        <Typography
          variant="caption"
          component="span"
          marginTop={2}
          sx={{ fontSize: `14px` }}
        >
          Call
        </Typography>

        <Button
          variant="plain"
          color="primary"
          href="tel:015207389443"
        >
          0152 073 89 443
        </Button>
      </Box>

      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          fontSize: `1rem`,
          lineHeight: `1.5`,
        }}
        color="primary"
      >
        <Typography
          variant="caption"
          component="span"
          marginTop={2}
          sx={{ fontSize: `14px` }}
        >
          Email
        </Typography>

        <Button
          variant="plain"
          color="primary"
          href="mailto:moodbeauty.de@gmail.com"
        >
          moodbeauty.de@gmail.com
        </Button>
      </Box>

      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          fontSize: `1rem`,
          lineHeight: `1.5`,
        }}
        color="primary"
      >
        <Typography
          variant="caption"
          component="span"
          marginTop={2}
          sx={{ fontSize: `14px` }}
        >
          Adresse
        </Typography>

        <Button
          variant="plain"
          color="primary"
          href="https://maps.app.goo.gl/7jed5oouJkNUf3xA8"
          sx={{
            textAlign: `center`,
            textTransform: `capitalize`,
          }}
        >
          Theresienstraße 38, <br/> 80333 München
        </Button>
      </Box>

      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          fontSize: `1.2rem`,
          lineHeight: `1.5`,
        }}
        color="primary"
      >
        <Typography
          variant="caption"
          component="span"
          marginTop={2}
          sx={{ fontSize: `14px` }}
        >
          Follow
        </Typography>

        <Box>
          <IconButton
            size="large"
            color="primary"
            sx={{
              padding: `6px`,
              minWidth: `auto`,
            }}
            href="https://www.facebook.com/dorosh.studio"
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            size="large"
            color="primary"
            href="https://www.instagram.com/dorosh_studio/"
            sx={{
              padding: `6px`,
              minWidth: `auto`,
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
