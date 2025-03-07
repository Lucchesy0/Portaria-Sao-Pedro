import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="copyright">© 2025 Accenture. All rights reserved.</span>
        <div className="social-icons">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visite nosso Facebook"
            className="icon-link"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visite nosso Instagram"
            className="icon-link"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a 
            href="https://linkedin.com/company/accenture" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visite nosso LinkedIn"
            className="icon-link"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}