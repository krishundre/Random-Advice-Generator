import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { auth } from '../config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Check if a user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle log out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src="https://placehold.co/150x50?text=Logo+Here" alt="Logo" />
        </a>

        {/* Navbar Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center justify-content-center">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item d-flex align-items-center justify-content-center">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item d-flex align-items-center justify-content-center">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="d-flex">
          {user ? (
            <button onClick={handleLogout} className="btn btn-logout" type="button">
              Log Out
            </button>
          ) : (
            <>
              <a href='/login' className="btn btn-login me-2" type="button">Log In</a>
              <a href='/signup' className="btn btn-create-account" type="button">Create Account</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
