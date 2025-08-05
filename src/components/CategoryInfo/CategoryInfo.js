import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function CategoryInfo({
  title,
  subtitle,
  description,
  services,
  advantages,
  conclusion,
  ctaText = "Jetzt Termin vereinbaren",
  ctaHref = "/booking"
}) {
  return (
    <Box
      sx={{
        maxWidth: `800px`,
        margin: `0 auto`,
        padding: `24px 0`,
      }}
    >
      <Typography
        variant="h2"
        color="primary"
        sx={{
          textAlign: `center`,
          marginBottom: `16px`,
          fontSize: `2.2rem`,
          fontWeight: `bold`,
          textTransform: `uppercase`,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          textAlign: `center`,
          marginBottom: `32px`,
          fontSize: `1.4rem`,
          color: `text.secondary`,
          fontStyle: `italic`,
        }}
      >
        {subtitle}
      </Typography>

      <Typography
        sx={{
          lineHeight: 1.8,
          marginBottom: `32px`,
          fontSize: `1.1rem`,
          textAlign: `justify`,
        }}
      >
        {description}
      </Typography>

      {services && (
        <Box sx={{ marginBottom: `32px` }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: `16px`,
              fontSize: `1.3rem`,
              fontWeight: `600`,
              color: `primary.main`,
            }}
          >
            Unsere Leistungen:
          </Typography>
          <List>
            {services.map((service, index) => (
              <ListItem key={index} sx={{ paddingLeft: 0 }}>
                <ListItemIcon sx={{ minWidth: `32px` }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={service}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: `1rem`,
                      lineHeight: 1.6,
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {advantages && (
        <Box sx={{ marginBottom: `32px` }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: `16px`,
              fontSize: `1.3rem`,
              fontWeight: `600`,
              color: `primary.main`,
            }}
          >
            Vorteile unserer Techniken:
          </Typography>
          <List>
            {advantages.map((advantage, index) => (
              <ListItem key={index} sx={{ paddingLeft: 0 }}>
                <ListItemIcon sx={{ minWidth: `32px` }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={advantage}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: `1rem`,
                      lineHeight: 1.6,
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {conclusion && (
        <Typography
          sx={{
            lineHeight: 1.8,
            marginBottom: `32px`,
            fontSize: `1.1rem`,
            textAlign: `justify`,
            fontStyle: `italic`,
            color: `text.secondary`,
          }}
        >
          {conclusion}
        </Typography>
      )}

      <Box sx={{ textAlign: `center` }}>
        <Button
          component={Link}
          href={ctaHref}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: `12px 32px`,
            fontSize: `1.1rem`,
            fontWeight: `600`,
            borderRadius: `8px`,
            textTransform: `none`,
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
            '&:hover': {
              boxShadow: `0 6px 16px rgba(0, 0, 0, 0.2)`,
            }
          }}
        >
          {ctaText}
        </Button>
      </Box>
    </Box>
  );
}