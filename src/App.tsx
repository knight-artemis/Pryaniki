import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../src/styles/App.css";
import LogForm from "./сomponents/LogForm";
import Data from "./сomponents/Data";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Header from "./сomponents/Header";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (location.pathname === "/data" && !token) {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LogForm />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
