import React, { useState, useEffect } from 'react';
import './Advices.css';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MdSkipNext, MdReport } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";

const Advices = () => {
  const [advice, setAdvice] = useState('');
  const [autoFetch, setAutoFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const adviceCollection = collection(db, 'advices');
      const adviceSnapshot = await getDocs(adviceCollection);
      const adviceList = adviceSnapshot.docs.map((doc) => doc.data().advice);
      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
      setAdvice(randomAdvice);
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();

    let interval;
    if (autoFetch) {
      interval = setInterval(fetchAdvice, 10000); // Fetch every 10 seconds if auto-refresh is on
    }
    return () => clearInterval(interval); // Clean up interval when component is unmounted
  }, [autoFetch]);

  return (
    <div className="main-page">
      <div className="advice-container">
        {loading ? (
          <p className="advice-text">Loading advice...</p>
        ) : (
          <p className="advice-text">{advice || 'No advice available'}</p>
        )}

        <div className="reaction-panel">

          <button className="reaction-btn">😊</button>
          <button className="reaction-btn">👍</button>
          <button className="reaction-btn">❤️</button>
          <button className="reaction-btn">😂</button>
          <button className="reaction-btn">😮</button>
        </div>

        <div className="button-container">
          <button className="next-btn" onClick={fetchAdvice} >
            <MdSkipNext />
          </button>
          <button className="btn btn-share">
            <FaShareAlt />
          </button>
        </div>



        <div className="reaction-panel">
          <button className="btn btn-danger report-btn">Report <MdReport className='fs-4 ms-1' /> </button>
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


    </div>
  );
};

export default Advices;
