import './ui/App.css'
import { Routes, Route } from "react-router-dom";

import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
     
    </Routes>
  );
}

export default App
