'use client';

import {
  Box,
  Typography,
  Button,
  Backdrop,
  Card,
  CardContent,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const COOKIE_CONSENT_NAME = 'cookieConsent';

// Cookie utility functions
const setCookie = (name, value, days = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // First useEffect to set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Second useEffect to check consent only after client hydration
  useEffect(() => {
    if (isClient) {
      const consent = getCookie(COOKIE_CONSENT_NAME);
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, [isClient]);

  const handleAccept = () => {
    // Save consent to cookie with 1 year expiration
    setCookie(COOKIE_CONSENT_NAME, 'accepted', 365);
    setShowBanner(false);
  };

  // Don't render anything until client hydration is complete
  if (!isClient || !showBanner) {
    return null;
  }

  return (
    <Backdrop
      open={showBanner}
      sx={{
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Card
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 600,
          width: '90%',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.3)',
          borderRadius: '16px',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Cookie-Hinweis
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
            Wir verwenden technisch notwendige Cookies, um Ihnen die bestmögliche
            Nutzung unserer Website zu ermöglichen. Diese Cookies sind für das
            Funktionieren der Website erforderlich und können nicht deaktiviert werden.
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Weitere Informationen finden Sie in unserer{' '}
            <Typography
              component="a"
              href="/datenschutz"
              sx={{
                color: 'primary.main',
                textDecoration: 'underline',
                fontWeight: 500,
              }}
            >
              Datenschutzerklärung
            </Typography>
            .
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Cookies akzeptieren
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  );
};

export default CookieBanner;