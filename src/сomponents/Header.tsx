import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyWarning } from "../core/toasters";

export default function Header() {
  const navigate = useNavigate();

  const logOut = async (): Promise<void> => {
    try {
      sessionStorage.removeItem("token");
      navigate("/login");
      notifySuccess("Вы вышли из системы.");
    } catch (error) {
      notifyWarning(
        "Произошла ошибка при выхрде из системы, попробуйте еще раз."
      );
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
