import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-about">
          <h2 className="footer-logo">Tez Buy</h2>
          <p className="footer-description">
            O‘zbekiston bo‘ylab sifatli mahsulotlarni yetkazib beramiz. Biz
            bilan xarid qilish qulay va ishonchli!
          </p>
          <div className="footer-contact">
            <div>
              <Phone size={18} />
              <a href="tel:+998971034686" className="footer-contact-link">
                +998 97 103 46 86
              </a>
            </div>
            <div>
              <Mail size={18} />
              <a
                href="mailto:javohirabdusharipov676@gmail.com"
                className="footer-contact-link"
              >
                info@tezbuy.uz
              </a>
            </div>
            <div>
              <MapPin size={18} />
              <address>Urganch, O‘zbekiston</address>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h3>Tezkor havolalar</h3>
          <ul>
            <li>
              <a href="/products">Mahsulotlar</a>
            </li>
            <li>
              <a href="/offers">Aksiyalar</a>
            </li>
            <li>
              <a href="/about">Biz haqimizda</a>
            </li>
            <li>
              <a href="/faq">Savol-javob</a>
            </li>
            <li>
              <a href="/contact">Aloqa</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Ijtimoiy tarmoqlar</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
          </div>
          <h3>Yangiliklarga obuna bo‘ling</h3>
          <form
            className="footer-subscribe"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Obuna uchun rahmat!");
            }}
          >
            <input
              type="email"
              placeholder="Email manzilingiz"
              required
              className="footer-input"
            />
            <button type="submit" className="subscribe-btn">
              Obuna bo‘lish
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2025 Tez Buy . Barcha huquqlar himoyalangan.</p>
        <div className="footer-legal-links">
          <a href="/privacy">Maxfiylik siyosati</a>
          <a href="/terms">Foydalanish shartlari</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
