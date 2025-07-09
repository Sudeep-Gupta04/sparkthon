import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/index";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Products from "@/pages/products";
import Rewards from "@/pages/rewards";




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/rewards" element={<Rewards />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}
