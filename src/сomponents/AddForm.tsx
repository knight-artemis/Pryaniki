import { Button, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function AddForm() {
  const token = sessionStorage.getItem("token");
  const [inputs, setInputs] = useState({
    documentStatus: "",
    employeeNumber: "",
    documentType: "",
    documentName: "",
    companySignatureName: "",
    employeeSignatureName: "",
    employeeSigDate: moment(),
    companySigDate: moment(),
  });

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
    console.log(inputs, "мы данные для отправки");
    console.log(token, "я токен для отправки");

    try {
      axios
        .post(
          `${
            import.meta.env["VITE_API_URL"]
          }/ru/data/v3/testmethods/docs/userdocs/create}`,
          inputs,
          {
            headers: {
              "x-auth": `${token}`,
            },
          }
        )
        .then((res) => console.log(res.data))
        .then(() => console.log("Добавление прошло успешно"))
        .catch((err) =>
          console.log("В процессе добавления произошла ошибка", err)
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <>
      <TextField
        label="Статус документа"
        name="documentStatus"
        value={inputs.documentStatus}
        onChange={handleChange}
      />
      <TextField
        label="Номер сотрудника"
        name="employeeNumber"
        value={inputs.employeeNumber}
        onChange={handleChange}
      />
      <TextField
        label="Тип документа"
        name="documentType"
        value={inputs.documentType}
        onChange={handleChange}
      />
      <TextField
        label="Наименование документа"
        name="documentName"
        value={inputs.documentName}
        onChange={handleChange}
      />
      <TextField
        label="Компания-подписант"
        name="companySignatureName"
        value={inputs.companySignatureName}
        onChange={handleChange}
      />
      <TextField
        label="Сотрудник-подписант"
        name="employeeSignatureName"
        value={inputs.employeeSignatureName}
        onChange={handleChange}
      />
      <DemoItem label="Дата подписания сотрудником">
        <DatePicker
          format="DD.MM.YYYY"
          value={moment(inputs.employeeSigDate)}
          onChange={(date) => handleDateChange(date, "employeeSigDate")}
        />
      </DemoItem>
      <DemoItem label="Дата подписания компанией">
        <DatePicker
          format="DD.MM.YYYY"
          value={moment(inputs.companySigDate)}
          onChange={(date) => handleDateChange(date, "companySigDate")}
        />
      </DemoItem>
      <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={addDoc}>
        Добавить
      </Button>
    </>
  );
}
