'use client'

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import * as React from "react";

export default function Menu({ links }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={()=>setOpen(true)}>
        <MenuIcon
          fontSize='large'
          color="secondary"
        />
      </IconButton>

      <Drawer
        open={open}
        sx={{
          width: `100%`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            bgcolor: `background.default`,
            width: `100%`,
            height: `auto`,
            bottom: 0,
            padding: `0 24px`,
          },
        }}
        variant="temporary"
        anchor="right"
      >
        <Box sx={{
          display: `flex`,
          justifyContent: `flex-end`,
          paddingTop: `68px`,
        }}>
          <IconButton onClick={handleClose}>
            <CloseIcon
              fontSize='large'
              color="primary"
            />
          </IconButton>
        </Box>

        <List>
          {links.map(({ text, href }) => (
            <ListItem
              key={href}
              disablePadding
              onClick={handleClose}
            >
              <ListItemButton
                component={Link}
                href={href}
              >
                <ListItemText
                  primary={text}
                  color="primary"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: `2rem`,
                      textAlign: `center`,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
