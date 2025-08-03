'use client';

import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';

export const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const COLORS = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  CHARCOAL: '#1a1a1a',
  LIGHT_GRAY: '#f8f5f3',
  GOLD: '#D4AF37',
  CRIMSON: '#DC143C',
  GREEN: '#18b518',
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.BLACK,
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.WHITE,
      contrastText: COLORS.BLACK,
    },
    info: {
      main: COLORS.CHARCOAL,
      contrastText: COLORS.WHITE,
    },
    background: {
      default: COLORS.LIGHT_GRAY,
      paper: COLORS.WHITE,
    },
    error: {
      main: COLORS.CRIMSON,
    },
    success: {
      main: COLORS.GREEN,
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontSize: '3rem',
      fontFamily: cormorantGaramond.style.fontFamily,
      fontWeight: `700`,
    },
    h2: {
      fontSize: '2.6rem',
      fontFamily: cormorantGaramond.style.fontFamily,
      '@media (max-width: 392px)': {
        fontSize: '2.2rem',
      },
    },
    h3: {
      fontSize: '20px',
      fontWeight: `600`,
      fontFamily: cormorantGaramond.style.fontFamily,
    },
    h4: {
      fontSize: '1.8rem',
      fontFamily: cormorantGaramond.style.fontFamily,
    },
    caption: {
      fontSize: `1.2rem`,
      letterSpacing: `3px`,
      fontFamily: cormorantGaramond.style.fontFamily,
    },
    subtitle1: {
      fontSize: `1rem`,
      fontWeight: `200`,
      fontFamily: montserrat.style.fontFamily,
    },
    subtitle2: {
      fontSize: `1.1rem`,
      fontWeight: `400`,
      fontFamily: montserrat.style.fontFamily,
    },
    formOverview: {
      fontSize: `1.1rem`,
    },
    formSubtitle: {
      fontSize: `0.9rem`,
      color: alpha(COLORS.BLACK, 0.5),
    },
    selectLabel: {
      fontSize: '0.875rem',
      color: alpha(COLORS.BLACK, 0.7),
      fontFamily: montserrat.style.fontFamily,
      marginBottom: '4px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: `9999px`,
          padding: '2px 15px',
          fontSize: '1.2rem',
          fontFamily: montserrat.style.fontFamily,
        },
        primary: {
          backgroundColor: COLORS.GOLD,
          color: COLORS.BLACK,
        },
        contained: {
          textTransform: `capitalize`,
        },
        plain : {
          color: `inherit`,
          fontSize: `inherit`,
          fontWeight: `500`,
          backgroundColor: `transparent`,
          padding: 0,
          fontFamily: cormorantGaramond.style.fontFamily,
          textTransform: `lowercase`,
        },
        sizeSmall: {
          fontSize: `.8rem`,
          padding: `5px 20px`,
          textTransform: `capitalize`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: `10px 0px 0px 0px`,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          alignItems: `center`,
          justifyContent: `center`,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: `none`,
          borderRadius: `0`,
          backgroundColor: COLORS.LIGHT_GRAY,

          '&:before': {
            display: 'none',
          },

          '&:first-of-type': {
            borderRadius: `0`,
          },

          '&:last-of-type': {
            borderRadius: `0`,
          },

          '&:last-of-type .MuiAccordionSummary-root:not(.Mui-expanded)': {
            borderBottom: 'none',
          },

          '&.Mui-expanded': {
            margin: `0px`,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: `0px`,

          '&:not(.Mui-expanded)': {
            borderBottom: `1px solid ${alpha(COLORS.BLACK, 0.1)}`,
          },

          '&.Mui-expanded': {
            minHeight: `0px`,
          },



          '& .MuiAccordionSummary-content': {
            margin: `6px 0 !important`,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontSize: '1rem',
          backgroundColor: COLORS.LIGHT_GRAY,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(COLORS.BLACK, 0.2),
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(COLORS.BLACK, 0.4),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.BLACK,
            borderWidth: '1px',
          },
        },
        select: {
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          minHeight: '20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: COLORS.LIGHT_GRAY,
            borderRadius: '12px',
            fontSize: '1rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(COLORS.BLACK, 0.2),
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(COLORS.BLACK, 0.4),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.BLACK,
              borderWidth: '1px',
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-root': {
            borderRadius: '12px',
            backgroundColor: COLORS.LIGHT_GRAY,
          },
        },
        notchedOutline: {
          borderColor: alpha(COLORS.BLACK, 0.2),
          borderWidth: '1px',
        },
        input: {
          padding: '10px 14px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          marginTop: '4px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '4px 16px',
          fontSize: '0.95rem',
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: alpha(COLORS.BLACK, 0.04),
          },
          '&.Mui-selected': {
            backgroundColor: COLORS.LIGHT_GRAY,
            '&:hover': {
              backgroundColor: alpha(COLORS.LIGHT_GRAY, 0.8),
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '4px',
          '& .MuiSvgIcon-root': {
            fontSize: '1.2rem',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: alpha(COLORS.BLACK, 0.6),
          '&.Mui-checked': {
            color: COLORS.BLACK,
          },
          '&:hover': {
            backgroundColor: alpha(COLORS.BLACK, 0.04),
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: alpha(COLORS.BLACK, 0.7),
          fontFamily: montserrat.style.fontFamily,
          fontWeight: '500',
          '&.Mui-focused': {
            color: alpha(COLORS.BLACK, 0.7),
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            display: 'none', // Скрываем стандартный floating label
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: montserrat.style.fontFamily,
          fontSize: `0.8rem`,
          fontWeight: `400`,
          color: alpha(COLORS.BLACK, 0.7),
          marginLeft: 0,
          marginRight: 0,
          letterSpacing: `1.2px`,
        },
      },
    },
  },
});

export { COLORS };

export default theme;
