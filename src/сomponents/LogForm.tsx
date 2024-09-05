import { useState } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { notifySuccess, notifyWarning } from "../core/toasters";

export default function LogForm() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const saveToken = (token: string) => {
    sessionStorage.setItem("token", token);
  };

  const logUser = async () => {
    if (!inputs.username) {
      notifyWarning("Вы не ввели имя пользователя.");
    } else if (!inputs.password) {
      notifyWarning("Вы не ввели пароль.");
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${
            import.meta.env["VITE_API_URL"]
          }/ru/data/v3/testmethods/docs/login`,
          inputs
        );
        if (response.data.error_code === 0) {
          saveToken(response.data.data.token);
          navigate("/data");
          notifySuccess("Добро пожаловать!");
        } else {
          notifyWarning("Неверное имя пользователя или пароль.");
        }
      } catch (error) {
        notifyWarning(
          "В процессе авторизации произошла ошибка, попробуйте снова."
        );
      } finally {
        setIsLoading(false);
      }
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
        <LoadingButton
          variant="contained"
          size="large"
          onClick={logUser}
          loading={isLoading}
        >
          Авторизоваться
        </LoadingButton>
      </CardContent>
    </Card>
  );
}
