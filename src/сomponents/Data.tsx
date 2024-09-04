import axios from "axios";
import { useEffect, useState } from "react";
import { DataType } from "../core/types";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import AddForm from "./AddForm";

export default function Data() {
  const [data, setData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  const getData = async (): Promise<void> => {
    try {
      axios
        .get(
          `${
            import.meta.env["VITE_API_URL"]
          }/ru/data/v3/testmethods/docs/userdocs/get`,
          {
            headers: {
              "x-auth": `${token}`,
            },
          }
        )
        .then((res) => setData(res.data.data))
        .then(() => console.log("Данные получены успешно"))
        .catch((err) => console.log("Ошибка при получении данных", err));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoc = async (id: string): Promise<void> => {
    console.log(id, "я id для удаления");
    console.log(token, "я токен для авторизации запроса");
    console.log(
      `${
        import.meta.env["VITE_API_URL"]
      }/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
      "я url для запроса"
    );
    try {
      axios
        .post(
          `${
            import.meta.env["VITE_API_URL"]
          }/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
          {
            headers: {
              "x-auth": `${token}`,
            },
          }
        )
        .then((res) => console.log(res.data, "мы получили данные"))
        .then(() => console.log("Удаление прошло успешно"))
        .catch((err) =>
          console.log("В процессе удаление произошла ошибка", err)
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Статус документа</TableCell>
              <TableCell align="right">Номер сотрудника</TableCell>
              <TableCell align="right">Тип документа</TableCell>
              <TableCell align="right">Наименование документа</TableCell>
              <TableCell align="right">Компания-подписант</TableCell>
              <TableCell align="right">Сотрудник=подписант</TableCell>
              <TableCell align="right">Дата подписания сотрудником</TableCell>
              <TableCell align="right">Дата подписания компанией</TableCell>
              <TableCell align="right">Удаление документа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.documentStatus}
                </TableCell>
                <TableCell align="right">{el.employeeNumber}</TableCell>
                <TableCell align="right">{el.documentType}</TableCell>
                <TableCell align="right">{el.documentName}</TableCell>
                <TableCell align="right">{el.companySignatureName}</TableCell>
                <TableCell align="right">{el.employeeSignatureName}</TableCell>
                <TableCell align="right">
                  {moment(el.employeeSigDate).format("DD.MM.YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(el.companySigDate).format("DD.MM.YYYY")}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteDoc(el.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
        onClick={handleOpen}
      >
        Добавить документ
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddForm />
        </Box>
      </Modal>
    </>
  );
}
