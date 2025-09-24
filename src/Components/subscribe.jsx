import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './SubscribeStrip.css';

const SubscribeStrip = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.")
            return;
        }

        // Simulate a successful subscription
        toast('Thank you for subscribing to Our Newsletter',
            {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
        setErrorMessage('');
        setEmail('');
    };

    return (
        <div className="subscribe-strip">
            <Toaster />
            <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input
                    type="email"
                    className="subscribe-input"
                    placeholder="Enter your email to get Piece of Wisdom Everyday"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-subscribe">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default SubscribeStrip;
