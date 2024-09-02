import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function RegLogForm() {
  const [isReg, setIsReg] = useState(true);

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">
          {isReg ? "Регистрация" : "Авторизация"}
        </Typography>
        <TextField id="standard-basic" label="Имя пользователя"></TextField>
        <TextField id="standard-basic" label="Пароль"></TextField>
        {/* Если будет время - прикрутить повторение пароля */}
        {/* {isReg ? (
          <TextField id="standard-basic" label="Повторите пароль"></TextField>
        ) : null} */}
        {isReg ? (
          <Button variant="contained" size="large">
            Зарегестрироваться
          </Button>
        ) : (
          <Button variant="contained" size="large">
            Авторизоваться
          </Button>
        )}
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsReg(!isReg)}
        >
          {isReg ? "Перейти к авторизации" : "Перейти к регистрации"}
        </Button>
      </CardContent>
    </Card>
  );
}
