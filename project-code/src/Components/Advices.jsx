import React, { useState, useEffect } from 'react';
import './Advices.css';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MdSkipNext, MdReport } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import Switch from "react-switch";

const Advices = () => {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(null); // Store current advice ID
  const [reactions, setReactions] = useState({
    smile: 0,
    thumbsUp: 0,
    heart: 0,
    laugh: 0,
    wow: 0,
  });
  const [userReaction, setUserReaction] = useState(null); // Track user's current reaction
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
      const adviceList = adviceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Select a random advice
      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
      setAdvice(randomAdvice.advice);
      setAdviceId(randomAdvice.id); // Store the advice ID for reaction updates
      console.log(randomAdvice.id)
      setReactions(randomAdvice.reactions || {}); // Load reactions
      setUserReaction(null); // Reset user's reaction when advice changes
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update reactions in Firestore
  const updateReaction = async (newReaction) => {
    if (!adviceId) return;

    try {
      const adviceDoc = doc(db, 'advices', adviceId);
      const updatedReactions = { ...reactions };

      // Remove the previous reaction
      if (userReaction) {
        updatedReactions[userReaction] = Math.max(0, (updatedReactions[userReaction] || 1) - 1);
      }

      // Add the new reaction
      updatedReactions[newReaction] = (updatedReactions[newReaction] || 0) + 1;

      // Update the reactions in Firestore
      await updateDoc(adviceDoc, { reactions: updatedReactions });

      // Update state
      setReactions(updatedReactions);
      setUserReaction(newReaction);
    } catch (error) {
      console.error('Error updating reaction:', error);
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
          <button
            className={`reaction-btn ${userReaction === 'smile' ? 'active' : ''}`}
            onClick={() => updateReaction('smile')}
          >
            😊 {reactions.smile || 0}
          </button>
          <button
            className={`reaction-btn ${userReaction === 'thumbsUp' ? 'active' : ''}`}
            onClick={() => updateReaction('thumbsUp')}
          >
            👍 {reactions.thumbsUp || 0}
          </button>
          <button
            className={`reaction-btn ${userReaction === 'heart' ? 'active' : ''}`}
            onClick={() => updateReaction('heart')}
          >
            ❤️ {reactions.heart || 0}
          </button>
          <button
            className={`reaction-btn ${userReaction === 'laugh' ? 'active' : ''}`}
            onClick={() => updateReaction('laugh')}
          >
            😂 {reactions.laugh || 0}
          </button>
          <button
            className={`reaction-btn ${userReaction === 'wow' ? 'active' : ''}`}
            onClick={() => updateReaction('wow')}
          >
            😮 {reactions.wow || 0}
          </button>
        </div>

        <div className="button-container">
          <button className="next-btn" onClick={fetchAdvice}>
            <MdSkipNext />
          </button>
          <button className="btn btn-share">
            <FaShareAlt />
          </button>
        </div>

        <div className="reaction-panel">
          <button className="btn btn-danger report-btn">
            Report <MdReport className="fs-4 ms-1" />
          </button>
        </div>

        <div className="auto-refresh">
          <label>
            <Switch
              onChange={(checked) => setAutoFetch(checked)}
              checked={autoFetch}
              offColor="#3A3A3D"
              onColor="#E16A20"
              checkedIcon={false}
              uncheckedIcon={false}
              className="react-switch"
              height={20}
              width={48}
            />
            <span>Auto-refresh advice</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Advices;
