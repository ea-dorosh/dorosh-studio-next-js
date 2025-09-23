import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import { categoriesData } from '@/constants/staticData';

export default function ServicesPage() {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Container
        sx={{
          maxWidth: `1200px`,
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          textAlign="center"
          sx={{
            fontWeight: 700,
            letterSpacing: `.02em`,
            mb: 4,
          }}
        >
          Unsere Services
        </Typography>

        <Grid
          container
          spacing={{
            xs: 2,
            md: 3,
          }}
        >
          {categoriesData.map((service, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              sx={{
                display: {
                  md: `flex`,
                },
                justifyContent: {
                  md: `center`,
                },
              }}
            >
              <Link
                href={service.href}
                style={{
                  textDecoration: `none`,
                  color: `inherit`,
                  display: `block`,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: `background.paper`,
                    borderRadius: {
                      xs: `16px`,
                      md: `24px`,
                    },
                    overflow: `hidden`,
                    boxShadow: `0 10px 30px rgba(0,0,0,.06)`,
                    height: `100%`,
                    width: {
                      xs: `100%`,
                      md: 400,
                    },
                    flexShrink: 0,
                    display: `flex`,
                    flexDirection: `column`,
                    transition: `transform .15s ease, box-shadow .15s ease`,
                    '&:hover': {
                      transform: `translateY(-2px)`,
                      boxShadow: `0 14px 36px rgba(0,0,0,.1)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: `relative`,
                      aspectRatio: `16 / 9`,
                    }}
                  >
                    <OptimizedImage
                      src={service.img}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      style={{
                        objectFit: `cover`,
                        objectPosition: `center`,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      p: {
                        xs: 2,
                        md: 3,
                      },
                      display: `flex`,
                      flexDirection: `column`,
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      color="primary"
                      sx={{
                        opacity: 0.9,
                        lineHeight: 1.6,
                      }}
                    >
                      {service.text}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
