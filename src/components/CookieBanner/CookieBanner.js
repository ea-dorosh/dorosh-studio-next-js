'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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

  useEffect(() => {
    // Check if user has already given consent via cookie
    const consent = getCookie(COOKIE_CONSENT_NAME);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Save consent to cookie with 1 year expiration
    setCookie(COOKIE_CONSENT_NAME, 'accepted', 365);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          maxWidth: 650,
          width: '100%',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.3)',
          borderRadius: '16px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <CardContent sx={{ p: 3, pb: 0 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Cookie-Hinweis
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
            Diese Website verwendet technisch notwendige Cookies für die
            Grundfunktionen unseres Online-Buchungssystems. Ohne diese
            Cookies können Sie keine Termine buchen oder sich anmelden.
          </Typography>

          {/* ACCORDION WITH COOKIE DETAILS */}
          <Accordion
            sx={{
              mb: 2,
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px !important',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'grey.50',
                borderRadius: '8px',
                minHeight: '48px',
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Details zu verwendeten Cookies
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Typography variant="body2" sx={{ mb: 2, fontSize: '0.9rem', color: 'text.secondary' }}>
                <strong>Verwendete Cookies:</strong><br />
                • <strong>cookieConsent:</strong> Speichert Ihre Cookie-Einwilligung (365 Tage)<br />
                • <strong>Session-Cookies:</strong> Für Anmeldung und Buchungssystem (bis Session-Ende)<br />
                • <strong>Cloudflare-Cookies:</strong> Für Website-Sicherheit und Performance
              </Typography>

              <Typography variant="body2" sx={{ mb: 2, fontSize: '0.85rem', color: 'text.secondary' }}>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Funktionalität)
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Weitere Informationen finden Sie in unserer{' '}
                <Typography
                  component="a"
                  href="/datenschutz"
                  target="_blank"
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
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => window.open('/datenschutz', '_blank')}
              sx={{
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                order: { xs: 2, sm: 1 }
              }}
              size="small"
            >
              Datenschutzerklärung
            </Button>
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                order: { xs: 1, sm: 2 }
              }}
              size="small"
            >
              Alle Cookies akzeptieren
            </Button>
          </Box>
        </CardContent>

        <Typography variant="caption" sx={{
          display: 'block',
          textAlign: 'left',
          m: 0,
          color: 'text.secondary',
          fontStyle: 'italic',
          fontSize: '0.8rem',
          padding: `10px 24px`,
          fontFamily: 'Montserrat, sans-serif',
        }}>
            Hinweis: Die Website funktioniert nur mit aktivierten Cookies
        </Typography>
      </Card>
    </Box>
  );
};

export default CookieBanner;