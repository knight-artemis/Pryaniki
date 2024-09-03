import { Button, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AddForm() {
  const [inputs, setInputs] = useState({
    employeeNumber: "",
    documentType: "",
    documentName: "",
    companySignatureName: "",
    employeeSignatureName: "",
    employeeSigDate: "",
    companySigDate: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  return (
    <>
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
        label="Сотрудник=подписант"
        name="employeeSignatureName"
        value={inputs.employeeSignatureName}
        onChange={handleChange}
      />
      <TextField
        label="Дата подписания сотрудником"
        type="date"
        name="employeeSigDate"
        value={inputs.employeeSigDate}
        onChange={handleChange}
      />
      <TextField
        label="Дата подписания компанией"
        type="date"
        name="companySigDate"
        value={inputs.companySigDate}
        onChange={handleChange}
      />
      <Button variant="contained" size="large" sx={{ mt: 2 }}>
        Добавить
      </Button>
    </>
  );
}
