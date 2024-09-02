import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export default function LogForm() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">Авторизация</Typography>
        <TextField
          // id="username"
          label="Имя пользователя"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <TextField
          // id="password"
          label="Пароль"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <Button variant="contained" size="large">
          Авторизоваться
        </Button>
      </CardContent>
    </Card>
  );
}
