import { Close } from "@mui/icons-material";
import {
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalFullScreen({
  open,
  handleClose,
  children,
}) {
  const theme = useTheme();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: `background.paper`,
        }
      }}
    >
      <AppBar
        sx={{
          position: `relative`,
          backgroundColor: `transparent`,
        }}
      >
        <Toolbar sx={{ justifyContent: `flex-start`}}>
          <IconButton
            edge="start"
            color="primary"
            bgcolor="background.main"
            onClick={handleClose}
            aria-label="close"
            size="large"
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      { children }
    </Dialog>
  );
}
