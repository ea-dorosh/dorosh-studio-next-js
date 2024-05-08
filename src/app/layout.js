import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import * as React from "react";
import Logo from "@/components/Logo/Logo";
import Menu from "@/components/Menu/Menu";
import theme from "@/theme";

export const metadata = {
  title: "Dorosh Studio Permanent Make-Up München",
  description: "Permanent Make-Up in München",
};

const LINKS = [
  { text: "Home", href: "/" },
  { text: "Unsere Services", href: "/services" },
  { text: "Online Termin", href: "/appointment" },
];

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>

            <CssBaseline />

            <AppBar 
              position="static" sx={{ 
                zIndex: 2000,
                bgcolor: "background.main",
              }}>
              <Box sx={{
                textAlign: `center`,
                p: 1.2,
                bgcolor: "primary.main",
              }}>
                <Typography variant="caption" noWrap component="div" color="primary.contrastText">
                  kostenlose Beratung
                </Typography>
              </Box>

              <Toolbar sx={{ 
                padding: `0 70px`,
              }}>
                <Box sx={{
                  width: `250px`,
                  maxWidth: `90%`,
                  padding: `18px 0`,
                }}
                >

                  <Logo sx={{margin: `auto`}}/>
                </Box>

                <Box sx={{
                  position: `absolute`,
                  right: 20,
                }}>
                  <Menu links={LINKS} />
                </Box>
              </Toolbar>
            </AppBar>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                padding: `0 24px 24px 24px`,
              }}
            >
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
