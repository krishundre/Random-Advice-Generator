import React, { useState, useEffect } from 'react';
import './Login.css';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDoc, getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [error, setError] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate('/'); // Redirect to home if logged in
        }
    }, [currentUser, navigate]);

    async function findUserByIdentifier(userId) {
        try {
            const db = getFirestore();
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return userSnap.data();
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error finding user:", error);
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        try {
            const userEmail = await findUserByIdentifier(identifier);

            if (!userEmail) {
                setError('No account found with this email or username');
                return;
            }

            // Attempt to sign in with the found email
            await signInWithEmailAndPassword(auth, userEmail, password);
            alert('Login successful!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Login error details:', {
                message: error.message,
                code: error.code,
                stack: error.stack
            });

            if (error.code === 'auth/user-not-found') {
                setError('No account found. Please sign up.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError(error.message);
            }
        }
    };


    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="form-container p-4">
                <div className="image-placeholder mb-3">
                    <img src="https://via.placeholder.com/100" alt="Login" className="img-fluid" />
                </div>

                <h2 className="text-center text-white mb-4">Login</h2>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="identifier" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="identifier"
                            placeholder="Enter your email or username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
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
                    <a href="/signup" className="create-account">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;