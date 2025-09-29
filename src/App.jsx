import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddShiftForm from "./pages/AddShiftForm";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-shift" element={<AddShiftForm />} />
      </Routes>
    </Router>
  );
}