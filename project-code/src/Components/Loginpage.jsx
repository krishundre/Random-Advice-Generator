import React, { useState } from 'react';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';  // Google icon
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // Ensure navigate hook is imported

function Login() {
    const [error, setError] = useState(''); // Initialize state for error handling
    const navigate = useNavigate(); // Initialize navigate hook

    const handleGoogleSignIn = async () => {
        setError(''); // Reset error state

        try {
            // Firebase Google sign-in
            await signInWithPopup(auth, googleProvider);
            alert('Sign-up successful!');
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
            setError(error.message); // Update error state
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="form-container p-4">
                {/* Image placeholder */}
                <div className="image-placeholder mb-3">
                    <img src="https://via.placeholder.com/100" alt="Login" className="img-fluid" />
                </div>

                <h2 className="text-center text-white mb-4">Login</h2>

                {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Display error if exists */}

                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary custom-btn-primary">
                            Login
                        </button>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn custom-btn-google d-flex align-items-center" onClick={handleGoogleSignIn}>
                            Log in with Google <FcGoogle className="ms-2" />
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <a href="/" className="forgot-password">Forgot Password?</a> |
                    <a href="/signup" className="create-account">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
