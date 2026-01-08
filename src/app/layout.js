import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import AnalyticsScripts from '@/components/Analytics/AnalyticsScripts';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import Header from '@/components/Header/Header';
import PhoneTrackingHandler from '@/components/PhoneTrackingHandler/PhoneTrackingHandler';
import LocalBusinessSchema from '@/components/StructuredData/LocalBusinessSchema';
import theme from '@/theme';

export const metadata = {
  title: `MOOD BEAUTY - Maniküre & Pediküre | Permanent Make-Up | München`,
  description: `Professionelle Maniküre und Pediküre in München. Permanent Make-Up in München. Powder Brows,
  Hairstroke, Velvet Lips im MOOD BEAUTY Studio von Natalia Dorosh.`,
  keywords: [
    `Maniküre München`,
    `Pediküre München`,
    `Nagelpflege München`,
    `Gel-Lack München`,
    `Shellac München`,
    `Fußpflege München`,
    `Augenbrauen München`,
    `Lippenpigmentierung München`,
    `Wimpernkranz München`,
    `Permanent Make-Up München`,
    `Beauty Studio München`,
  ],
  openGraph: {
    type: `website`,
    locale: `de_DE`,
    url: `https://moodbeauty.de`,
    siteName: `MOOD BEAUTY München`,
    title: `MOOD BEAUTY - Maniküre & Pediküre & Permanent Make-Up München`,
    description: `Professionelle Maniküre und Pediküre in München. Permanent Make-Up in München. Powder Brows, Hairstroke, Velvet Lips im MOOD BEAUTY Studio von Natalia Dorosh.`,
    images: [
      {
        url: `https://moodbeauty.de/images/design/design_1.avif`,
        width: 1200,
        height: 630,
        alt: `MOOD BEAUTY München`,
      },
    ],
  },
  other: {
    'geo.region': `DE-BY`,
    'geo.placename': `München`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <LocalBusinessSchema />
        <link
          rel="dns-prefetch"
          href="//fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          httpEquiv="X-UA-Compatible"
          content="IE=edge"
        />
      </head>
      <body
        style={{
          display: `flex`,
          flexDirection: `column`,
          minHeight: `100vh`,
          backgroundColor: `background.default`,
        }}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* Analytics scripts only load on production (moodbeauty.de) */}
            <AnalyticsScripts />
            <CssBaseline />

            <Header />

            <Box
              sx={{
                maxWidth: `1200px`,
                margin: `0 auto`,
                width: `100%`,
              }}
            >
              <Breadcrumbs />
            </Box>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                backgroundColor: `background.default`,
              }}
            >
              {children}
            </Box>

            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: `auto`,
                bgcolor: `primary.main`,
              }}
            >
              <Box
                sx={{
                  maxWidth: `1200px`,
                  margin: `0 auto`,
                  textAlign: `center`,
                }}
              >
                <Typography
                  variant="body2"
                  color="secondary"
                >
                  <span suppressHydrationWarning>{new Date().getFullYear()}</span> MOOD BEAUTY - Natalia Dorosh
                </Typography>

                <Box
                  sx={{
                    display: `flex`,
                    gap: 2,
                    justifyContent: `center`,
                    mt: 2,
                    mb: 1,
                  }}
                >
                  <Link
                    href="/impressum"
                    variant="body2"
                    color="secondary"
                    sx={{ fontSize: 16 }}
                  >
                      Impressum
                  </Link>
                  <Link
                    href="/datenschutz"
                    variant="body2"
                    color="secondary"
                    sx={{ fontSize: 16 }}
                  >
                      Datenschutz
                  </Link>
                </Box>
              </Box>
            </Box>

            <CookieBanner />

            <PhoneTrackingHandler />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
