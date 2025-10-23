import { MenuItem, Select, Box, Typography } from '@mui/material';

const POPULAR_COUNTRIES = [
  {
    code: `DE`,
    dialCode: `+49`,
    name: `Deutschland`,
    flag: `🇩🇪`,
  },
  {
    code: `FR`,
    dialCode: `+33`,
    name: `Frankreich`,
    flag: `🇫🇷`,
  },
  {
    code: `UA`,
    dialCode: `+380`,
    name: `Ukraine`,
    flag: `🇺🇦`,
  },
  {
    code: `AT`,
    dialCode: `+43`,
    name: `Österreich`,
    flag: `🇦🇹`,
  },
  {
    code: `CH`,
    dialCode: `+41`,
    name: `Schweiz`,
    flag: `🇨🇭`,
  },
  {
    code: `IT`,
    dialCode: `+39`,
    name: `Italien`,
    flag: `🇮🇹`,
  },
];

const OTHER_COUNTRIES = [
  {
    code: `GB`,
    dialCode: `+44`,
    name: `Vereinigtes Königreich`,
    flag: `🇬🇧`,
  },
  {
    code: `ES`,
    dialCode: `+34`,
    name: `Spanien`,
    flag: `🇪🇸`,
  },
  {
    code: `NL`,
    dialCode: `+31`,
    name: `Niederlande`,
    flag: `🇳🇱`,
  },
  {
    code: `BE`,
    dialCode: `+32`,
    name: `Belgien`,
    flag: `🇧🇪`,
  },
  {
    code: `PL`,
    dialCode: `+48`,
    name: `Polen`,
    flag: `🇵🇱`,
  },
  {
    code: `CZ`,
    dialCode: `+420`,
    name: `Tschechien`,
    flag: `🇨🇿`,
  },
  {
    code: `RU`,
    dialCode: `+7`,
    name: `Russland`,
    flag: `🇷🇺`,
  },
  {
    code: `TR`,
    dialCode: `+90`,
    name: `Türkei`,
    flag: `🇹🇷`,
  },
  {
    code: `US`,
    dialCode: `+1`,
    name: `USA`,
    flag: `🇺🇸`,
  },
  {
    code: `CA`,
    dialCode: `+1`,
    name: `Kanada`,
    flag: `🇨🇦`,
  },
  {
    code: `GR`,
    dialCode: `+30`,
    name: `Griechenland`,
    flag: `🇬🇷`,
  },
  {
    code: `PT`,
    dialCode: `+351`,
    name: `Portugal`,
    flag: `🇵🇹`,
  },
  {
    code: `SE`,
    dialCode: `+46`,
    name: `Schweden`,
    flag: `🇸🇪`,
  },
  {
    code: `NO`,
    dialCode: `+47`,
    name: `Norwegen`,
    flag: `🇳🇴`,
  },
  {
    code: `DK`,
    dialCode: `+45`,
    name: `Dänemark`,
    flag: `🇩🇰`,
  },
  {
    code: `FI`,
    dialCode: `+358`,
    name: `Finnland`,
    flag: `🇫🇮`,
  },
  {
    code: `RO`,
    dialCode: `+40`,
    name: `Rumänien`,
    flag: `🇷🇴`,
  },
  {
    code: `BG`,
    dialCode: `+359`,
    name: `Bulgarien`,
    flag: `🇧🇬`,
  },
  {
    code: `HR`,
    dialCode: `+385`,
    name: `Kroatien`,
    flag: `🇭🇷`,
  },
  {
    code: `SI`,
    dialCode: `+386`,
    name: `Slowenien`,
    flag: `🇸🇮`,
  },
  {
    code: `SK`,
    dialCode: `+421`,
    name: `Slowakei`,
    flag: `🇸🇰`,
  },
  {
    code: `HU`,
    dialCode: `+36`,
    name: `Ungarn`,
    flag: `🇭🇺`,
  },
  {
    code: `LU`,
    dialCode: `+352`,
    name: `Luxemburg`,
    flag: `🇱🇺`,
  },
  {
    code: `IE`,
    dialCode: `+353`,
    name: `Irland`,
    flag: `🇮🇪`,
  },
  {
    code: `AL`,
    dialCode: `+355`,
    name: `Albanien`,
    flag: `🇦🇱`,
  },
  {
    code: `BA`,
    dialCode: `+387`,
    name: `Bosnien und Herzegowina`,
    flag: `🇧🇦`,
  },
  {
    code: `RS`,
    dialCode: `+381`,
    name: `Serbien`,
    flag: `🇷🇸`,
  },
  {
    code: `ME`,
    dialCode: `+382`,
    name: `Montenegro`,
    flag: `🇲🇪`,
  },
  {
    code: `MK`,
    dialCode: `+389`,
    name: `Nordmazedonien`,
    flag: `🇲🇰`,
  },
  {
    code: `MD`,
    dialCode: `+373`,
    name: `Moldawien`,
    flag: `🇲🇩`,
  },
  {
    code: `BY`,
    dialCode: `+375`,
    name: `Belarus`,
    flag: `🇧🇾`,
  },
  {
    code: `LT`,
    dialCode: `+370`,
    name: `Litauen`,
    flag: `🇱🇹`,
  },
  {
    code: `LV`,
    dialCode: `+371`,
    name: `Lettland`,
    flag: `🇱🇻`,
  },
  {
    code: `EE`,
    dialCode: `+372`,
    name: `Estland`,
    flag: `🇪🇪`,
  },
  {
    code: `IS`,
    dialCode: `+354`,
    name: `Island`,
    flag: `🇮🇸`,
  },
];

const ALL_COUNTRIES = [...POPULAR_COUNTRIES, ...OTHER_COUNTRIES];

export default function CountryCodeSelector({
  value, onChange, error,
}) {
  return (
    <Select
      value={value}
      onChange={onChange}
      error={error}
      sx={{
        minWidth: 100,
        maxWidth: 120,
        '& .MuiSelect-select': {
          display: `flex`,
          alignItems: `center`,
          gap: 0.5,
          paddingRight: `32px !important`, // Space for dropdown icon
        },
      }}
      renderValue={(selected) => {
        // Show only flag and code in the selected value (compact view)
        const country = ALL_COUNTRIES.find(c => c.dialCode === selected);
        return (
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              gap: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: `1.2rem`,
                lineHeight: 1,
              }}
            >
              {country?.flag}
            </Box>
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                fontSize: `0.95rem`,
              }}
            >
              {selected}
            </Typography>
          </Box>
        );
      }}
    >
      {POPULAR_COUNTRIES.map((country) => (
        <MenuItem
          key={country.code}
          value={country.dialCode}
          sx={{
            display: `flex`,
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: `1.2rem`,
              lineHeight: 1,
            }}
          >
            {country.flag}
          </Box>
          <Typography
            component="span"
            sx={{
              fontWeight: 500,
              minWidth: `45px`,
            }}
          >
            {country.dialCode}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: `0.9rem`,
              color: `text.secondary`,
            }}
          >
            {country.name}
          </Typography>
        </MenuItem>
      ))}

      <MenuItem
        disabled
        sx={{
          borderTop: `1px solid`,
          borderColor: `divider`,
          opacity: `1 !important`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: `text.secondary`,
            fontWeight: 600,
          }}
        >
          Weitere Länder
        </Typography>
      </MenuItem>

      {OTHER_COUNTRIES.map((country) => (
        <MenuItem
          key={country.code}
          value={country.dialCode}
          sx={{
            display: `flex`,
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: `1.2rem`,
              lineHeight: 1,
            }}
          >
            {country.flag}
          </Box>
          <Typography
            component="span"
            sx={{
              fontWeight: 500,
              minWidth: `45px`,
            }}
          >
            {country.dialCode}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: `0.9rem`,
              color: `text.secondary`,
            }}
          >
            {country.name}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
}

export { ALL_COUNTRIES, POPULAR_COUNTRIES };
