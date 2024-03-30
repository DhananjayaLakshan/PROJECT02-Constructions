import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import CreatePackage from "./pages/CreatePackage";
import CreateRestaurant from "./pages/CreateRestaurant";
import UpdatePackage from "./pages/UpdatePackage";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import Restaurants from "./pages/Restaurants";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-restaurant" element={<CreateRestaurant />} />
        <Route path="/update-restaurant/:id" element={<UpdateRestaurant />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/update-package/:id" element={<UpdatePackage />} />
        <Route path="/booking-package/:id" element={<Booking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
