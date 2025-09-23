import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function CategoryInfo({
  description,
  services,
  advantages,
  conclusion,
  ctaText = `Jetzt Termin vereinbaren`,
  ctaHref = `/booking`,
}) {
  return (
    <Box
      sx={{
        maxWidth: `800px`,
        margin: `0 auto`,
        padding: `0`,
      }}
    >
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
              <ListItem
                key={index}
                sx={{ paddingLeft: 0 }}
              >
                <ListItemIcon sx={{ minWidth: `32px` }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={service}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: `1rem`,
                      lineHeight: 1.6,
                    },
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
              <ListItem
                key={index}
                sx={{ paddingLeft: 0 }}
              >
                <ListItemIcon sx={{ minWidth: `32px` }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={advantage}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: `1rem`,
                      lineHeight: 1.6,
                    },
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
        >
          {ctaText}
        </Button>
      </Box>
    </Box>
  );
}
