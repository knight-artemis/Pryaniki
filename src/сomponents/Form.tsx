import { Box, Button, Grid, TextField } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { DataType } from "../core/types";
import { LoadingButton } from "@mui/lab";

export default function Form({
  closeModal,
  getData,
  doc,
  isUpdate,
}: {
  closeModal: () => void;
  getData: () => Promise<void>;
  doc: DataType;
  isUpdate: boolean;
}) {
  const token = sessionStorage.getItem("token");
  const [inputs, setInputs] = useState(doc);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleDateChange = (date: moment.Moment | null, name: string) => {
    if (date) {
      const formattedDate = date.toISOString();
      setInputs((prevInputs) => ({ ...prevInputs, [name]: formattedDate }));
    }
  };

  const addDoc = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${
          import.meta.env["VITE_API_URL"]
        }/ru/data/v3/testmethods/docs/userdocs/create`,
        inputs,
        {
          headers: {
            "x-auth": `${token}`,
          },
        }
      );
      await getData();
      console.log("Добавление прошло успешно");
    } catch (error) {
      console.log("В процессе добавления произошла ошибка", error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const updateDoc = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${
          import.meta.env["VITE_API_URL"]
        }/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        inputs,
        {
          headers: {
            "x-auth": `${token}`,
          },
        }
      );
      await getData();
      console.log("Изменение произошло успешно");
    } catch (error) {
      console.log("В процессе изменения произошла ошибка", error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Статус документа"
            name="documentStatus"
            value={inputs.documentStatus}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Номер сотрудника"
            name="employeeNumber"
            value={inputs.employeeNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Тип документа"
            name="documentType"
            value={inputs.documentType}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Наименование документа"
            name="documentName"
            value={inputs.documentName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Компания-подписант"
            name="companySignatureName"
            value={inputs.companySignatureName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Сотрудник-подписант"
            name="employeeSignatureName"
            value={inputs.employeeSignatureName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Дата подписания сотрудником"
            format="DD.MM.YYYY"
            value={moment(inputs.employeeSigDate)}
            onChange={(date) => handleDateChange(date, "employeeSigDate")}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Дата подписания компанией"
            format="DD.MM.YYYY"
            value={moment(inputs.companySigDate)}
            onChange={(date) => handleDateChange(date, "companySigDate")}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {isUpdate ? (
          <LoadingButton
            variant="contained"
            sx={{ mt: 2, height: 40, width: 200 }}
            onClick={() => updateDoc(doc.id)}
            loading={isLoading}
          >
            Изменить
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            sx={{ mt: 2, height: 40, width: 200 }}
            onClick={addDoc}
            loading={isLoading}
          >
            Добавить
          </LoadingButton>
        )}
      </Box>
    </>
  );
}
