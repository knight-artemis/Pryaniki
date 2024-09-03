import { Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import LogForm from "./сomponents/LogForm";
import Data from "./сomponents/Data";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Data />} />
      <Route path="/login" element={<LogForm />} />
    </Routes>
  );
}

export default App;
