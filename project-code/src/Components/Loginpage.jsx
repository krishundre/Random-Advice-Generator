import React, { useState, useEffect } from 'react';
import './Login.css'; // Custom CSS file
import { FcGoogle } from 'react-icons/fc'; // Google icon
import { auth, googleProvider, db } from '../config/firebase'; // Ensure db is imported for Firestore
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom'; // Ensure navigate hook is imported
import { useAuth } from '../context/AuthContext';

function Login() {
    const [error, setError] = useState(''); // Initialize state for error handling
    const [email, setEmail] = useState(''); // Initialize state for email input
    const [password, setPassword] = useState(''); // Initialize state for password input
    const navigate = useNavigate(); // Initialize navigate hook

    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate('/'); // Redirect to home if logged in
        }
    }, [currentUser, navigate]);

    // Check if user exists in Firestore
    const checkUserExistsInFirestore = async (emailOrUid) => {
        try {
            // Check Firestore for a document where email or UID matches
            const userDoc = await getDoc(doc(db, 'users', emailOrUid)); // Firestore document by UID or email
            return userDoc.exists();
        } catch (error) {
            console.error('Error checking Firestore:', error.message);
            setError('Error verifying your account. Please try again.');
            return false;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        try {
            // Validate Firestore before attempting Firebase Authentication
            const userExists = await checkUserExistsInFirestore(email);

            if (userExists) {
                // Proceed with Firebase Authentication if user exists in Firestore
                await signInWithEmailAndPassword(auth, email, password);
                alert('Login successful!');
                navigate('/'); // Redirect to the home page after successful login
            } else {
                setError('No account found with this email. Please sign up.');
                alert('No account found with this email. Please sign up.');
                navigate('/signup'); // Redirect to the home page after successful login

            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email. Please sign up.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError(error.message); // Generic error handling
            }
            console.error('Error logging in:', error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(''); // Reset error state

        try {
            // Prompt user to select a Google account
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if the user exists in Firestore
            const userExists = await checkUserExistsInFirestore(user.uid);

            if (userExists) {
                alert('Login successful!');
                navigate('/'); // Redirect to the home page after successful login
            } else {
                // If user doesn't exist, prevent login and show error
                await auth.signOut();
                setError('No account associated with this Google account. Please sign up.');
                alert('No account associated with this Google account. Please sign up.');

            }
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
                    <a href="/signup" className="create-account">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
