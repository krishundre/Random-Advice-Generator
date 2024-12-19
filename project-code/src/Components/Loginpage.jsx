import React, { useState, useEffect } from 'react';
import './Login.css';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already authenticated
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/'); // Redirect to home if logged in
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            // Authenticate with email and password
            await signInWithEmailAndPassword(auth, email, password);
            // alert('Login successful!');
            toast.success('Login Successful')
            navigate('/'); // Redirect to home after login
        } catch (error) {
            console.error('Login error:', error.message);
            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email. Please sign up.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError('Failed to log in. Please try again later.');
            }
        }
    };


    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="form-container p-4">
                <h2 className="text-center text-white mb-4">Login</h2>
                <Toaster />
                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="identifier" className="form-label">Email or Username</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary custom-btn-primary">
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <a href="/reset-password" className="create-account">Forgot Password?</a> |
                    <a href="/signup" className="create-account">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
