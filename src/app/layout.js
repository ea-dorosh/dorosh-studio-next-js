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
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: "background.paper",
        }}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <AppBar position="static" sx={{ backgroundColor: 'background.paper' }}>
              <Toolbar sx={{
                justifyContent: 'flex-start',
              }}>
                <LogoLink />

                <Box sx={{ marginLeft: `auto` }}>
                  <Menu links={LINKS} />
                </Box>
              </Toolbar>
            </AppBar>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                backgroundColor: "background.paper",
              }}
            >
              {children}
            </Box>

            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
                bgcolor: "primary.main",
              }}
            >
              <Typography variant="body2" color="secondary">
                {new Date().getFullYear()} Dorosh Studio.
              </Typography>

              <Link href="/privacy-policy" variant="body2" color="secondary">
                  Privacy Policy
              </Link>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
