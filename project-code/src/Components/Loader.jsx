import React, { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext'; // Ensure correct import of useLoading
import './Loader.css'; // Optional: Custom styles for the loader

const Loader = () => {
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false); // Hide loader after 10 seconds
            }, 10000); // 10000ms = 10 seconds

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [loading, setLoading]);

    if (!loading) return null; // If not loading, don't render anything

    return (
        <div className="loader-container">
            <div className="blob"></div>
        </div>
    );
};

export default Loader;
