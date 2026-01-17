import { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-logo">
                    <img src="/logo.png" alt="Hexalabs" />
                </div>
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <p className="loading-text">Loading Excellence...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
