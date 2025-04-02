import React, { useState } from 'react';
import './SignIn.css';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Create user account with email and password
            const date = new Date();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, date);
            // Send email verification            
            await sendEmailVerification(userCredential.user);
            alert('Account created! Please verify your email.');
            navigate('/additional-details');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists. Please log in.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="sign-in-container d-flex justify-content-center align-items-center">
            <div className="form-container p-4">
                <h2 className="text-center text-white mb-4"><b>Sign up</b> to get the advices you didn't know you needed</h2>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={handleSignUp}>
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
                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p className='text-light'>Min. 8 characters, 1 letter, 1 number and 1 special character</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary custom-btn-primary">Sign Up</button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <a href="/login" className="forgot-password">Already have an account? Log in</a>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
