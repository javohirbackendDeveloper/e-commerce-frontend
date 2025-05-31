import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import ScrollToTopBtn from "./components/scrollToTopBtn/ScrollToTopBtn";
import Login from "./pages/auth/login/Login";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { AuthStore } from "./stores/auth.store";
import Cart from "./pages/cart/Cart";
import Success from "./pages/redirecters/Success";
import Cancel from "./pages/redirecters/Cancel";

function App() {
  const { fetchUserInfo, user } = AuthStore();

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      {/* Other default pages */}
      <ScrollToTopBtn />
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
}

export default App;
