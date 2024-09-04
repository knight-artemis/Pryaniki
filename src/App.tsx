import { Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import LogForm from "./сomponents/LogForm";
import Data from "./сomponents/Data";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/login" element={<LogForm />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
