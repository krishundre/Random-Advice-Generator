import React, { useState, useEffect } from 'react';
import './Advices.css';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MdSkipNext, MdReport } from 'react-icons/md';
import { FaShareAlt } from 'react-icons/fa';
import Switch from 'react-switch';

const Advices = () => {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(null);
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [autoFetch, setAutoFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
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

      if (adviceList.length === 0) {
        setAdvice('No advice available.');
        setAdviceId(null);
        return;
      }

      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
      setAdvice(randomAdvice.advice);
      setAdviceId(randomAdvice.id);
      setReactions(randomAdvice.reactions || {});
      setUserReaction(null);
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update reactions in Firestore and track reacted advice
  const updateReaction = async (newReaction) => {
    if (!adviceId || !user) return;

    try {
      const adviceDoc = doc(db, 'advices', adviceId);
      const userDoc = doc(db, 'users', user.uid); // User's document in Firestore
      const updatedReactions = { ...reactions };

      // Remove the previous reaction
      if (userReaction) {
        updatedReactions[userReaction] = Math.max(0, (updatedReactions[userReaction] || 1) - 1);

        // Remove the previous advice from the user's reacted list
        await updateDoc(userDoc, {
          reactedAdvices: arrayRemove({ adviceId, reaction: userReaction }),
        });
      }

      // Add the new reaction
      updatedReactions[newReaction] = (updatedReactions[newReaction] || 0) + 1;

      // Update reactions in Firestore
      await updateDoc(adviceDoc, { reactions: updatedReactions });

      // Add the new advice to the user's reacted list
      await updateDoc(userDoc, {
        reactedAdvices: arrayUnion({ adviceId, reaction: newReaction }),
      });

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
      interval = setInterval(fetchAdvice, 10000);
    }
    return () => clearInterval(interval);
  }, [autoFetch]);

  return (
    <div className="main-page">
      <div className="advice-container">
        {loading ? (
          <p className="advice-text">Loading advice...</p>
        ) : (
          <p className="advice-text">{advice}</p>
        )}

        <div className="reaction-panel">
          {['smile', 'thumbsUp', 'heart', 'laugh', 'wow'].map((reaction) => (
            <button
              key={reaction}
              className={`reaction-btn ${userReaction === reaction ? 'active' : ''}`}
              onClick={() => updateReaction(reaction)}
            >
              {reaction === 'smile' && '😊'}
              {reaction === 'thumbsUp' && '👍'}
              {reaction === 'heart' && '❤️'}
              {reaction === 'laugh' && '😂'}
              {reaction === 'wow' && '😮'}
              {reactions[reaction] || 0}
            </button>
          ))}
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
              onChange={setAutoFetch}
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
