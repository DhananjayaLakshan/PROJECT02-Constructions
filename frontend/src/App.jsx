import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Home";
import Appointment from "./pages/Appointment";
import CreateClient from "./pages/CreateClient";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/client" element={<CreateClient />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
