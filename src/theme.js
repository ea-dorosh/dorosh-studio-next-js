'use client';

import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Cinzel, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
});

export const cinzel = Cinzel({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const COLORS = {
  SOFT_RED: '#FCBCB2',
  WHITE: '#ffffff',
  VERY_DARK_GRAYISH_BLUE: '#3b3c43',
  VERY_SOFT_RED: '#FFE9E6',
  BRAUN: '#A06054',
  RED: '#c82d2d',
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.VERY_DARK_GRAYISH_BLUE,
      contrastText: COLORS.SOFT_RED,
    },
    secondary: {
      main: COLORS.SOFT_RED,
      contrastText: COLORS.VERY_DARK_GRAYISH_BLUE,
    },
    info: {
      main: COLORS.BRAUN,
      contrastText: COLORS.WHITE,
    },
    background: {
      default: COLORS.VERY_SOFT_RED,
      paper: COLORS.SOFT_RED,
    },
    error: {
      main: COLORS.RED,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontSize: '3rem',
      fontFamily: cinzel.style.fontFamily,
    },
    h2: {
      fontSize: '2.6rem',
      fontFamily: cinzel.style.fontFamily,
      '@media (max-width: 392px)': {
        fontSize: '2.2rem',
      },
    },
    h3: {
      fontSize: '2.2rem',
      fontFamily: cinzel.style.fontFamily,
    },
    h4: {
      fontSize: '1.8rem',
      fontFamily: cinzel.style.fontFamily,
    },
    caption: {
      fontSize: `1.2rem`,
      letterSpacing: `3px`,
      fontFamily: cinzel.style.fontFamily,
    },
    subtitle1: {
      fontSize: `1.2rem`,
      fontWeight: `200`,
    },
    subtitle2: {
      fontSize: `1.4rem`,
      fontWeight: `400`,
      fontFamily: cinzel.style.fontFamily,
    },
    formOverview: {
      fontSize: `1.1rem`,
    },
    formSubtitle: {
      fontSize: `0.9rem`,
      color: alpha(COLORS.VERY_DARK_GRAYISH_BLUE, 0.5),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 30px',
          fontSize: '1.2rem',
          fontFamily: poppins.style.fontFamily,
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
          fontFamily: cinzel.style.fontFamily,
          textTransform: `lowercase`,
        },
        sizeSmall: {
          fontSize: `.8rem`,
          padding: `5px 20px`,
          textTransform: `lowercase`,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: `0.8rem`,
          fontFamily: `Verdana, Arial, sans-serif`,
          marginLeft: 0,
          marginRight: 0,
          letterSpacing: `1.2px`,
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
  },
});

export { COLORS };

/**
 * 🎨 СТАНДАРТНАЯ MUI СТРУКТУРА ЦВЕТОВ
 *
 * Используем ТОЛЬКО стандартные свойства Material-UI:
 *
 * background.default - основной фон приложения (очень светло-розовый)
 * background.paper - фон для карточек, модалов, "бумажных" компонентов (светло-розовый)
 *
 * primary.main - основной темный цвет (для темных секций и текста)
 * secondary.main - акцентный розовый цвет (для кнопок)
 * info.main - коричневый цвет (для специальных элементов)
 * error.main - красный цвет (для ошибок)
 *
 * ✅ Никаких кастомных свойств - только стандарт MUI!
 * ✅ Легко менять цвета - просто изменив COLORS объект
 * ✅ Типобезопасность и автокомплит в IDE
 */

export default theme;
