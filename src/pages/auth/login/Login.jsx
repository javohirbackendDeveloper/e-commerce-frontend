import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { X, Eye, EyeOff } from "lucide-react";
import "./Login.css";
import Signup from "../signup/Signup";
import { AuthStore } from "../../../stores/auth.store";

function Login({ open, onClose }) {
  // input qiymatlari
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [showSignup, setShowSignup] = useState(false);

  const { login } = AuthStore();

  const handleSwitchToLogin = () => {
    setShowSignup(false);
  };

  const handleX = () => {
    setShowSignup(false);
    onClose(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ username, password });

    setTimeout(() => {
      onClose(false);
    }, 3000);
  };

  return (
    <>
      {!showSignup && open && (
        <Dialog open={open} onClose={() => onClose(false)}>
          <div className="login-modal">
            <div className="login-header">
              <h2>Tizimga kirish</h2>
              <X className="close-icon" onClick={() => onClose(false)} />
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Foydalanuvchi nomi</label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Parol</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span onClick={togglePassword} className="password-toggle">
                    {showPassword ? <Eye /> : <EyeOff />}
                  </span>
                </div>
              </div>

              <button type="submit" className="login-button">
                Kirish
              </button>
            </form>

            <div className="login-footer">
              <p>
                Hali ro'yxatdan o'tmaganmisiz?{" "}
                <span className="link" onClick={() => setShowSignup(true)}>
                  Ro'yxatdan o'tish
                </span>
              </p>
              <p className="policy-text">
                Siz tizimga kirish orqali barcha shaxsiy ma'lumotlarni qayta
                ishlash siyosatiga rozilik bildirasiz.
              </p>
            </div>
          </div>
        </Dialog>
      )}

      {showSignup && (
        <Signup
          open={showSignup}
          onClose={handleX}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
}

export default Login;
