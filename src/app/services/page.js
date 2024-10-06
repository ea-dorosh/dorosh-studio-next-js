import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from 'next/image';
import Link from "next/link";

export default function ServicesPage() {

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
      bgcolor="background.secondary"
    >
      <Typography
        color="primary"
        sx={{
          padding: `30px 20px 10px 20px`,
          textAlign: `center`,

          '@media (max-width: 440px)': {
            fontSize: `2.4rem`,
          },
        }}
        variant="h1"
      >
        Unsere Services
      </Typography>
      
      <Box>
        <Box
          id="powder-brows"
          sx={{
            padding: `20px 0`,
          }}
        >
          <Typography
            variant="h2"
            color={"primary"}
            sx={{
              padding: `0 24px`,
            }}
          >
            Powder Brows
          </Typography>

          <Typography
            variant="subtitle2"
            color="primary"
            sx={{
              padding: `0 24px`,
            }}
          >
            Preis: 290€
          </Typography>

          <Box sx={{
            padding: `0 24px`,
            margin: `10px 0 0 0`,
          }}>
            Powder Brows, Pudertechnik, Ombre Brows. Hochwertiges Permanent Make-Up hält 1,5-2 Jahre & die Augenbrauen wirken sehr natürlich, sehen dicht und voll aus.
          </Box>

          <Box
            sx={{
              padding: `10px 24px 0 24px`,
              overflow: `hidden`,
            }}
          >
            <Box 
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '90%',
                overflow: 'hidden',
              }}
            >
              <Image 
                src="/images/services-page/service-brows.jpg"
                alt="Permanent Make-up Powder Brows"
                width="300"
                height="200"
                style={imageStyles}
              />
            </Box>

            <Button
              component={Link}
              variant="contained"
              color="primary"
              href="/booking/powder-brows"
              sx={{
                marginTop: `20px`,
                width: `100%`,
              }}
            >
              Online Termine
            </Button>
          </Box>
        </Box>

        <Box
          id="hairstroke"
          sx={{
            padding: `20px 0`,
          }}
        >
          <Typography
            variant="h2"
            color={"primary"}
            sx={{
              padding: `0 24px`,
            }}
          >
            Hairstroke
          </Typography>

          <Typography
            variant="subtitle2"
            color="primary"
            sx={{
              padding: `0 24px`,
            }}
          >
            Preis: 350€
          </Typography>

          <Box
            component="p"
            sx={{
              padding: `0 24px`,
              margin: `10px 0 0 0`,
            }}
          >
            Permanent Augenbrauen Make-Up in Haar Technik.
            <br/>
            Die natürlichste und realistischste Technik.
            <br/>
            Nicht zu verwechseln mit Microblading! Hairstroke - eine leichte, oberflächliche Technik ohne Hauttrauma
          </Box>

          <Box
            sx={{
              padding: `10px 24px 0 24px`,
              overflow: 'hidden',
            }}
          >
            <Box 
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '90%',
                overflow: 'hidden',
              }}
            >
              <Image 
                src="/images/services-page/service-hairstroke.webp"
                alt="Permanent Make-up Hairstroke Brows"
                width="300"
                height="200"
                style={imageStyles}
              />
            </Box>

            <Button
              component={Link}
              variant="contained"
              color="primary"
              href="/booking/hairstroke"
              sx={{
                marginTop: `20px`,
                width: `100%`,
              }}
            >
              Online Termine
            </Button>
          </Box>
        </Box>

        <Box
          id="velvet-lips"
          sx={{
            padding: `20px 0`,
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={{
              padding: `0 24px`,
            }}
          >
            Velvet Lips
          </Typography>

          <Typography
            variant="subtitle2"
            color="primary"
            sx={{
              padding: `0 24px`,
            }}
          >
            Preis: 290€
          </Typography>

          <Box
            component="p"
            sx={{
              padding: `0 24px`,
              margin: `10px 0 0 0`,
            }}
          >
            Lippenpigmentierung.Velvet Lips, Nude Lips, Lipstick Effect Es sieht sehr harmonisch & natürlich aus. 
            <br/>
            Schmerzfreie Behandlung. Auf jede Kundin tüchtig abgestimmte Pigmentfarbe & Formkorrektur.
          </Box>

          <Box
            sx={{
              padding: `10px 24px 0 24px`,
              overflow: `hidden`,
            }}
          >
            <Box 
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '90%',
                overflow: 'hidden',
              }}
            >
              <Image 
                src="/images/services-page/service-lips.webp"
                alt="Permanent Make-up Velvet Lips"
                width="300"
                height="200"
                style={imageStyles}
              />
            </Box>

            <Button
              component={Link}
              variant="contained"
              color="primary"
              href="/booking/velvet-lippen"
              sx={{
                marginTop: `20px`,
                width: `100%`,
              }}
            >
              Online Termine
            </Button>
          </Box>
        </Box>

        <Box
          id="wimpernkranz"
          sx={{
            padding: `20px 0`,
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={{
              padding: `0 24px`,
            }}
          >
            Wimpernkranz
          </Typography>

          <Typography
            variant="subtitle2"
            color="primary"
            sx={{
              padding: `0 24px`,
            }}
          >
            Preis: 240€
          </Typography>

          <Box
            component="p"
            sx={{
              padding: `0 24px`,
              margin: `10px 0 0 0`,
            }}
          >
            Der Effekt eines frisch geöffneten Looks Schmerlos und sicher Bechandlung.
            <br/>
            <br/>
            Sterilisation, Qualität & Komfort.
          </Box>

          <Box
            sx={{
              padding: `10px 24px 0 24px`,
              overflow: `hidden`,
            }}
          >
            <Box 
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '90%',
                overflow: 'hidden',
              }}
            >
              <Image 
                src="/images/services-page/service-wimpernkranz.webp"
                alt="Permanent Make-up Wimpernkranzverdichtung"
                width="300"
                height="200"
                style={imageStyles}
              />
            </Box>

            <Button
              component={Link}
              variant="contained"
              color="primary"
              href="/booking/wimpernkranz"
              sx={{
                marginTop: `20px`,
                width: `100%`,
              }}
            >
              Online Termine
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
