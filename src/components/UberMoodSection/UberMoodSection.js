import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
// import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import ScrollGallery from '@/components/Parallax/ScrollGallery';

export default function UberMoodSection() {
  return (
    <Box
      component="section"
      sx={{
        mx: `calc(50% - 50vw)`,
        width: `100vw`,
        py: {
          xs: 4,
          md: 8,
        },
        background: `linear-gradient(180deg, rgba(250,248,252,1) 0%, rgba(200,180,200,0.1) 50%, rgba(250,248,252,1) 100%)`,
      }}
    >
      <Container
        sx={{
          maxWidth: `1200px`,
          px: {
            xs: 0,
            md: 4,
          },
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          textAlign="center"
          sx={{
            fontWeight: 700,
            letterSpacing: `.02em`,
            mb: 2,
          }}
        >
          Über MOOD
        </Typography>

        <Typography
          color="primary"
          textAlign="center"
          sx={{
            opacity: 0.85,
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          Modernes Beautystudio in München. Präzision, Ästhetik und echte Wohlfühlmomente -
          für natürliche Ergebnisse, die zu Ihnen passen.
        </Typography>

        <Box
          sx={{
            display: `flex`,
            flexDirection: {
              xs: `column`,
              md: `row`,
            },
            alignItems: `stretch`,
            gap: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Box
            sx={{
              position: `relative`,
              flex: `1 1 55%`,
              minHeight: {
                xs: 300,
                md: 520,
              },
              overflow: `hidden`,
              borderRadius: {
                xs: 0,
                md: `24px`,
              },
              mx: {
                xs: `calc(50% - 50vw)`,
                md: 0,
              },
              width: {
                xs: `100vw`,
                md: `auto`,
              },
            }}
          >
            {/* <OptimizedImage
              src="/images/design/lashes_2.avif"
              alt="Über MOOD - Permanent Make-up und Maniküre"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              style={{
                objectFit: `cover`,
                objectPosition: `center`,
              }}
            /> */}
            <ScrollGallery
              images={[
                {
                  src: `/images/design/lashes_2.avif`,
                  alt: `Mood Beauty - Gallery 1`,
                },
                {
                  src: `/images/design/lashes_2.avif`,
                  alt: `Mood Beauty - Gallery 2`,
                },
                {
                  src: `/images/design/lashes_2.avif`,
                  alt: `Mood Beauty - Gallery 3`,
                },
              ]}
            />
          </Box>

          <Box
            sx={{
              flex: `1 1 45%`,
              backgroundColor: {
                xs: `transparent`,
                md: `background.paper`,
              },
              borderRadius: {
                xs: 0,
                md: `24px`,
              },
              p: {
                xs: 2,
                md: 4,
              },
              display: `flex`,
              flexDirection: `column`,
              gap: 2,
              justifyContent: `space-between`,
              boxShadow: {
                xs: `none`,
                md: `0 10px 30px rgba(0,0,0,.06)`,
              },
            }}
          >
            <Typography
              color="primary"
              sx={{
                lineHeight: 1.75,
              }}
            >
              Wir vereinen präzise Techniken mit einem klaren, zeitlosen Designanspruch. Ob Powder Brows,
              Velvet Lips oder ästhetische Maniküre - bei uns stehen Natürlichkeit, Hygiene und ihr Wohlbefinden im Fokus.
            </Typography>

            <Box>
              <Typography
                color="primary"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Unser Versprechen
              </Typography>
              <Stack
                component="ul"
                sx={{
                  m: 0,
                  pl: 2,
                }}
              >
                <Typography
                  component="li"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  Individuelle Beratung und natürliche Ergebnisse
                </Typography>
                <Typography
                  component="li"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  Moderne Techniken und hochwertige Materialien
                </Typography>
                <Typography
                  component="li"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  Ruhige Atmosphäre, minimalistisches Studioambiente
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                pt: 1,
              }}
            >
              <Button
                component={Link}
                href="/ueber-uns"
                color="primary"
                variant="contained"
                size="medium"
              >
                Mehr über uns erfahren
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


