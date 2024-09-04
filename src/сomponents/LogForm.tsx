import { useState } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env["VITE_API_URL"]}/ru/data/v3/testmethods/docs/login`,
        inputs
      );
      saveToken(response.data.data.token);
      navigate("/data");
      console.log("Авторизация прошла успешно");
    } catch (error) {
      console.log("Ошибка авторизации", error);
    } finally {
      setIsLoading(false);
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
