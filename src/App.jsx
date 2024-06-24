import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ReactDom from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Competition from "./Pages/Competition/Competition";
import Navbar from "./Components/Navbar/Nav";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About/About";
import UploadCompetition from "./Pages/UploadCompetition/UploadCompetition";
import CompetitionDetail from "./Pages/Competition/CompetitionDetail";
import Login from "./Pages/Login";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/competition/:id" element={<CompetitionDetail />} />
        <Route path="/competition/category/:categoryId" element={<Competition />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload/competition" element={<UploadCompetition />} />

        <Route path="/LupaPassword" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* component design */}

        {/* <Route path="/Desaingrafis/:id" element={<DesaignGrafis />} /> */}

        {/* Jika page tidak ditemukan, tampilkan page 404 NotFound */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />

      <Toaster />
    </Router>
  );
}

export default App;
