import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogForm() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const saveToken = (token: string) => {
    sessionStorage.setItem("token", token);
  };

  const logUser = async (): Promise<void> => {
    try {
      axios
        .post(
          `${
            import.meta.env["VITE_API_URL"]
          }/ru/data/v3/testmethods/docs/login`,
          inputs
        )
        .then((res) => saveToken(res.data.data.token))
        .then(() => navigate("/"))
        .then(() => console.log("Авторизация прошла успешно"))
        .catch((err) => console.log("Ошибка авторизации", err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">Авторизация</Typography>
        <TextField
          label="Имя пользователя"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <Button variant="contained" size="large" onClick={logUser}>
          Авторизоваться
        </Button>
      </CardContent>
    </Card>
  );
}
