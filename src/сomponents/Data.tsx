import axios from "axios";
import { useEffect, useState } from "react";
import { DataType } from "../core/types";
import {
  Box,
  Button,
  CircularProgress,
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
import Form from "./Form";

export default function Data() {
  const [data, setData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [isLoading, setIsLoading] = useState(false);

  const initialDoc = {
    id: "",
    documentStatus: "",
    employeeNumber: "",
    documentType: "",
    documentName: "",
    companySignatureName: "",
    employeeSignatureName: "",
    employeeSigDate: moment(),
    companySigDate: moment(),
  };

  const [selectedDoc, setSelectedDoc] = useState<DataType>(initialDoc);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "grid",
    flexDirection: "column",
    gap: 2,
  };
  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env["VITE_API_URL"]
        }/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: {
            "x-auth": `${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log("Данные получены успешно");
    } catch (error) {
      console.log("Ошибка при получении данных", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDoc = async (id: string): Promise<void> => {
    try {
      await axios.delete(
        `${
          import.meta.env["VITE_API_URL"]
        }/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        {
          headers: {
            "x-auth": `${token}`,
          },
        }
      );
      setData((prevData) => prevData.filter((el) => el.id !== id));
      console.log("Удаление прошло успешно");
    } catch (error) {
      console.log("В процессе удаление произошла ошибка", error);
    } finally {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Статус документа</TableCell>
                <TableCell align="right">Номер сотрудника</TableCell>
                <TableCell align="right">Тип документа</TableCell>
                <TableCell align="right">Наименование документа</TableCell>
                <TableCell align="right">Компания-подписант</TableCell>
                <TableCell align="right">Сотрудник-подписант</TableCell>
                <TableCell align="right">Дата подписания сотрудником</TableCell>
                <TableCell align="right">Дата подписания компанией</TableCell>
                <TableCell align="right">Удаление документа</TableCell>
                <TableCell align="right">Изменение документа</TableCell>
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
                  <TableCell align="right">
                    {el.employeeSignatureName}
                  </TableCell>
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
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedDoc(el);
                        handleOpen2();
                      }}
                    >
                      Изменить
                    </Button>
                    <Modal open={open2} onClose={handleClose2}>
                      <Box sx={style}>
                        <Form
                          closeModal={handleClose2}
                          getData={getData}
                          doc={selectedDoc}
                          isUpdate={true}
                        />
                      </Box>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
          <Form
            closeModal={handleClose}
            getData={getData}
            doc={initialDoc}
            isUpdate={false}
          />
        </Box>
      </Modal>
    </>
  );
}
