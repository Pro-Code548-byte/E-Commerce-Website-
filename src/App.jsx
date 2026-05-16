import { Routes, Route } from "react-router";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import AccountPage from "./Pages/AccountPage";
import ContactPage from "./Pages/ContactPage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetails from "./Pages/ProductDetails";
import OrderPage from "./Pages/OrderPage";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}
