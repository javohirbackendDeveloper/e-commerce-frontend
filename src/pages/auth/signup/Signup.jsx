import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { X, Eye, EyeOff } from "lucide-react";
import "./Signup.css";
import { IMaskInput } from "react-imask";
import { AuthStore } from "../../../stores/auth.store";
import { toast } from "sonner";

function Signup({ open, onClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = AuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !phone || !password) {
      toast.error("Barcha maydonlarni to‘ldiring.");
      return;
    }
    if (phone.length < 17) {
      toast.error("Telefon raqamni to'liq kiriting");
      return;
    }

    const response = await signup({ username, phone_number: phone, password });
    if (response) {
      onClose(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <div className="login-modal">
        <div className="login-header">
          <h2>Ro'yxatdan o'tish</h2>
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
            <label>Telefon raqami</label>
            <IMaskInput
              mask="+998 00 000 00 00"
              placeholder="+998 90 123 45 67"
              value={phone}
              onAccept={(value) => setPhone(value)}
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
            Ro'yxatdan o'tish
          </button>
        </form>

        <div className="login-footer">
          <p>
            Allaqachon ro'yxatdan o'tgansizmi?{" "}
            <span className="link" onClick={onSwitchToLogin}>
              Kirish
            </span>
          </p>
          <p className="policy-text">
            Siz tizimga kirish orqali barcha shaxsiy ma'lumotlarni qayta ishlash
            siyosatiga rozilik bildirasiz.
          </p>
        </div>
      </div>
    </Dialog>
  );
}

export default Signup;
