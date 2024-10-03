import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import * as React from "react";
import LogoLink from "@/components/LogoLink/LogoLink";
import Menu from "@/components/Menu/Menu";
import theme from "@/theme";

export const metadata = {
  title: "Dorosh Studio Permanent Make-Up München",
  description: "Permanent Make-Up in München",
};

const LINKS = [
  { text: "Home", href: "/" },
  { text: "Unsere Services", href: "/services" },
  { text: "Online Termin", href: "/booking" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />


            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <AppBar position="static">
                <Box
                  sx={{
                    textAlign: `center`,
                    padding: `1.6px`,
                    bgcolor: `background.secondary`,
                  }}
                >
                  <Typography variant="caption" noWrap component="div" color="primary">
                    kostenlose Beratung
                  </Typography>
                </Box>

                <Toolbar sx={{ padding: `0 70px` }}>
                  <Box
                    sx={{
                      width: `250px`,
                      maxWidth: `90%`,
                      height: `90px`,
                      position: `relative`,
                    }}
                  >
                    <LogoLink />
                  </Box>

                  <Box sx={{ position: `absolute`, right: 20 }}>
                    <Menu links={LINKS} />
                  </Box>
                </Toolbar>
              </AppBar>

              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>

              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: 'auto',
                  textAlign: 'center',
                  bgcolor: "background.main",
                }}
              >
                <Typography variant="body2" color="secondary">
                  {new Date().getFullYear()} Dorosh Studio.
                </Typography>

                <Link href="/privacy-policy" variant="body2" color="secondary">
                  Privacy Policy
                </Link>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
