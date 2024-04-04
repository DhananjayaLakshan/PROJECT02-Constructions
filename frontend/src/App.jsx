import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Home";
import Appointment from "./pages/Appointment";
import CreateClient from "./pages/CreateClient";
import Signup from "./pages/Singup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import UpdateClient from "./pages/UpdateClient";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/" element={<Restaurants />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/client" element={<CreateClient />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-client/:id" element={<UpdateClient />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
