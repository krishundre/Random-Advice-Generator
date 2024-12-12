import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { auth } from '../config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon
import toast, { Toaster } from 'react-hot-toast';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      // alert('Logged out successfully!');
      toast.success('Login Successful',
        {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            background: '#000',
            color: '#fff'
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        }

      );
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Toaster />
      {/* Development Banner */}
      <div className="development-banner text-center bg-danger">
        This project is still under development. 🚧
      </div>

      {/* Navbar */}
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
          <div className="d-flex align-items-center">
            {user ? (
              <>
                {/* Icon-only View Profile Button */}
                <a href="/profile" className="btn me-2 p-2" type="button" title="View Profile">
                  <FaUserCircle size={24} />
                </a>
                <button onClick={handleLogout} className="btn btn-logout" type="button">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="btn btn-login me-2" type="button">Log In</a>
                <a href="/signup" className="btn btn-create-account" type="button">Create Account</a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
