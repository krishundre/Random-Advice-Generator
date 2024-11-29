import React, { useState, useEffect } from 'react';
import './AdditionalDetails.css';
import { db, auth } from '../config/firebase'; // Firestore and auth import
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore methods
import { useNavigate } from 'react-router-dom';

const AdditionalDetails = () => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [emailVerified, setEmailVerified] = useState(false); // Email verification status
    const [usernameError, setUsernameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch the current user's email verification status
    useEffect(() => {
        const checkUserVerification = () => {
            const user = auth.currentUser;
            if (user) {
                setEmailVerified(user.emailVerified);
            }
        };

        checkUserVerification();
    }, []);

    // Check if the username is available in Firestore
    const checkUsernameAvailability = async (value) => {
        if (!value.trim()) {
            setUsernameError('Username cannot be empty');
            return;
        }

        try {
            setLoading(true);
            const docRef = doc(db, 'usernames', value); // Firestore path to store usernames
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUsernameError('Username is already taken');
            } else {
                setUsernameError('');
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setUsernameError('An error occurred while verifying the username');
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        checkUsernameAvailability(value);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        if (!/^\d{10}$/.test(value)) { // Simple validation for phone number
            setPhoneError('Phone number must be 10 digits');
        } else {
            setPhoneError('');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (usernameError || phoneError || !emailVerified) {
            alert('Please fix the errors before submitting');
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                // Save username and phone number to the Firestore database
                await setDoc(doc(db, 'users', user.uid), {
                    username: username,
                    phone: phone,
                    emailVerified: emailVerified,
                    email: user.email, // Store the user's email
                    uid: user.uid // Store the user's UID for reference
                });

                // Save the username to the 'usernames' collection to avoid duplication
                await setDoc(doc(db, 'usernames', username), { userId: user.uid });

                alert('Details submitted successfully!');
                navigate('/'); // Redirect to home page after successful submission
            }
        } catch (error) {
            console.error('Error submitting details:', error);
            alert('Error submitting details. Please try again.');
        }
    };

    return (
        <div className="additional-details-container">
            <div className="form-container">
                <h2>Complete Your Profile</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Enter a unique username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {usernameError && <p className="error-text">{usernameError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        {phoneError && <p className="error-text">{phoneError}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email Verification</label>
                        {emailVerified ? (
                            <span className="badge bg-success">Verified</span>
                        ) : (
                            <span className="badge bg-danger">Not Verified</span>
                        )}
                    </div>

                    <button type="submit" className="btn custom-btn-primary" disabled={usernameError || phoneError || loading}>
                        {loading ? 'Checking...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdditionalDetails;
