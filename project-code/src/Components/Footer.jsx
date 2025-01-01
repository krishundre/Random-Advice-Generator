import React from 'react';
import './Footer.css';
import logo from '../Assets/Logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo Placeholder */}
      <div className="text-center logo-placeholder">
        <a href="/" rel="noopener noreferrer">
          <img src={logo} alt="Placeholder Logo" />
        </a>
      </div>

      <div className="container">
        <div className="row">
          {/* Section 1: Info Section */}
          <div className="col-md-3">
            <h5 className="section-title">Contact Info</h5>
            <ul className="list-unstyled">
              <li>Email: krisundre@gmail.com / vaibhskulk@gmail.com</li>
              <li>Phone: +91 85914 81281 / +91 75179 76019</li>
              <li>Developer: Krish Undre & Vaibhavi Kulkarni</li>
            </ul>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-md-3">
            <h5 className="section-title">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Section 3: Social Media Links */}
          <div className="col-md-3">
            <h5 className="section-title">Connect with Us</h5>
            <ul className="list-unstyled social-icons">
              <li><a href="https://www.instagram.com/randomlyright24?igsh=amVkNGoxenBraG9q" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="https://x.com/randomlyright24" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> X</a></li>
              {/*<li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn</a></li>*/}
            </ul>
          </div>

          {/* Section 4: Legal */}
          <div className="col-md-3">
            <h5 className="section-title">Legal</h5>
            <ul className="list-unstyled">

              <li><a href="/termsofservice">Terms of Service</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="https://docs.google.com/document/d/1HDF6Vc3-4t81tS5lN868tsQEW9g4kcgP/edit?usp=sharing&ouid=112010709532649457590&rtpof=true&sd=true" target='_blank'>Documentation</a></li>
            </ul>
          </div>
        </div>



        {/* Bottom Section: Copyright */}
        <div className="footer-bottom text-center">
          <p>© 2024 Random Advice Generator India. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
