import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import * as React from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import LogoLink from "@/components/LogoLink/LogoLink";
import Menu from "@/components/Menu/Menu";
import theme from "@/theme";

export const metadata = {
  title: `MOOD BEAUTY - Permanent Make-Up München | Natalia Dorosh`,
  description: `Professionelles Permanent Make-Up in München. Powder Brows, Hairstroke, Velvet Lips im MOOD BEAUTY Studio von Natalia Dorosh.`,
};

const LINKS = [
  { text: `Home`, href: `/` },
  { text: `Über uns`, href: `/ueber-uns` },
  { text: `Unsere Services`, href: `/services` },
  { text: `Online Termin`, href: `/booking` },
  { text: `Datenschutz`, href: `/datenschutz`, subLink: true },
  { text: `Impressum`, href: `/impressum`, subLink: true },
];

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        style={{
          display: `flex`,
          flexDirection: `column`,
          minHeight: `100vh`,
          backgroundColor: `background.paper`,
        }}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <AppBar position="static" sx={{ backgroundColor: `background.paper` }}>
              <Toolbar sx={{
                justifyContent: `flex-start`,
              }}>
                <LogoLink />

                <Box sx={{ marginLeft: `auto` }}>
                  <Menu links={LINKS} />
                </Box>
              </Toolbar>
            </AppBar>

            <Breadcrumbs />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                backgroundColor: `background.paper`,
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
                textAlign: `center`,
                bgcolor: `primary.main`,
              }}
            >
              <Typography variant="body2" color="secondary">
                <span suppressHydrationWarning>{new Date().getFullYear()}</span> MOOD BEAUTY - Natalia Dorosh
              </Typography>

              <Box sx={{
                display: `flex`,
                gap: 2,
                justifyContent: `center`,
                mt: 2,
                mb: 1,
              }}>
                <Link href="/impressum" variant="body2" color="secondary" sx={{ fontSize: 16 }}>
                  Impressum
                </Link>

                <Link href="/datenschutz" variant="body2" color="secondary" sx={{ fontSize: 16 }}>
                  Datenschutz
                </Link>
              </Box>
            </Box>

            <CookieBanner />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
