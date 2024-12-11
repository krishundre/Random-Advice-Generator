import React, { useState, useEffect } from 'react';
import "./Advices.css"
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLoading } from '../context/LoadingContext';
import { FaShareAlt } from "react-icons/fa";

const Advices = () => {
  const [advice, setAdvice] = useState('');
  const [autoFetch, setAutoFetch] = useState(false);
  const navigate = useNavigate();

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true); // Show the loader
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [setLoading]);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated or logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch advice from Firestore
  const fetchAdvice = async () => {
    try {
      const adviceCollection = collection(db, 'advices');
      const adviceSnapshot = await getDocs(adviceCollection);
      const adviceList = adviceSnapshot.docs.map((doc) => doc.data().advice);
      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
      setAdvice(randomAdvice);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };

  useEffect(() => {
    fetchAdvice();


    let interval;
    if (autoFetch) {
      interval = setInterval(fetchAdvice, 10000);
    }
    return () => clearInterval(interval);
  }, [autoFetch]);

  return (
    <div className="main-page">
      <div className="advice-container">
        <p className="advice-text">{advice || 'Loading advice...'}</p>
        <div className="reaction-panel">
          <button className="reaction-btn">😊</button>
          <button className="reaction-btn">👍</button>
          <button className="reaction-btn">❤️</button>
          <button className="reaction-btn">😂</button>
          <button className="reaction-btn">😮</button>
          <button className="btn btn-danger report-btn">Report</button>
        </div>
        <div className="auto-refresh">
          <label>
            <input
              type="checkbox"
              checked={autoFetch}
              onChange={() => setAutoFetch(!autoFetch)}
            />
            Auto-refresh advice
          </label>
        </div>
      </div>
      <button className="btn btn-share"><FaShareAlt /></button>
    </div>
  );
};

export default Advices;
