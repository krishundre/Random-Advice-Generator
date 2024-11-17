import React, { useState } from 'react';
import './Login.css';  // Custom CSS file
import { FcGoogle } from 'react-icons/fc';  // Google icon
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // Ensure navigate hook is imported

function Login() {
    const [error, setError] = useState(''); // Initialize state for error handling
    const [email, setEmail] = useState(''); // Initialize state for email input
    const [password, setPassword] = useState(''); // Initialize state for password input
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError(error.message); // Update error state
        }
    };

    const handlePasswordReset = async () => {
        setError(''); // Reset error state
        if (!email) {
            setError('Please enter your email to reset your password.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent!');
        } catch (error) {
            console.error('Error sending password reset email:', error.message);
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

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <button type="button" className="btn btn-link forgot-password" onClick={handlePasswordReset}>Forgot Password?</button> |
                    <a href="/signup" className="create-account">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;