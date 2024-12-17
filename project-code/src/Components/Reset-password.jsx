import React, { useState } from 'react';
import './ResetPassword.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Ensure db is imported for Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions
// import ResetPasswordImage from '../Assets/Reset-password.png'; // Correct path to your image

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        try {
            setLoading(true);

            // Query Firestore to check if the email exists
            const usersCollection = collection(db, 'users');
            const emailQuery = query(usersCollection, where('email', '==', email));
            const querySnapshot = await getDocs(emailQuery);

            if (querySnapshot.empty) {
                setError('No account found with this email.');
                setLoading(false);
                return;
            }

            // If email exists, send the password reset email
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset link sent! Please check your email.');
        } catch (err) {
            setError('Failed to send reset email. Please try again.');
            console.error('Error sending reset email:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                {/* <img src={ResetPasswordImage} alt="Reset Password" className="reset-password-image" /> */}
                <h2>Reset Password</h2>
                <p>Enter your email to receive a password reset link.</p>
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-reset" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
