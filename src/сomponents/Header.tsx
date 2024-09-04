import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logOut = async (): Promise<void> => {
    try {
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Сервис работы с документами
          </Typography>
          <Button color="inherit" onClick={logOut}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
