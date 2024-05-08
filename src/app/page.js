import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import * as React from "react";

export default function HomePage() {
  return (
    <Box sx={{ 
      display: `flex`,
      flexDirection: `column`,
      width: `calc(100% + 48px)`,
      margin: `0 -24px`,
      backgroundColor: `#151211`,
      '@media (min-width: 1024px)': {
        flexDirection: `row`,
      }
    }}>
      <Box sx={{
        padding: `0 24px`,
      }}>
        <Typography
          sx={{
            marginTop: `35px`,
          }}
          variant="h1"
        >
          Permanent<br/>
          Make-up<br/>
          in München
        </Typography>

        <Button 
          component={Link}
          href="/services"
          sx={{
            marginTop: `30px`,
            width: `100%`,
          }}
          color="primary"
          size="large"
          variant="contained"
        >
          Unsere Services
        </Button>
      </Box>

      <Box sx={{
        backgroundImage: `url(/images/main.webp)`,
        marginTop: `auto`,
        backgroundSize: `100%`,
        height: `350px`,
        backgroundRepeat: `no-repeat`,

        '@media (min-width: 500px)': {
          backgroundPositionY: `-37px`,
        },
        '@media (min-width: 630px)': {
          backgroundPositionY: `-72px`,
        },
        '@media (min-width: 770px)': {
          backgroundPositionY: `-116px`,
          height: `380px`,
        },
        '@media (min-width: 1024px)': {
          backgroundPositionY: `-60px`,
          height: `500px`,
          width: `100%`,
        },
        '@media (min-width: 1224px)': {
          backgroundPositionY: `0px`,
          height: `700px`,
        },
      }}>
      </Box>
    </Box>
  );
}
