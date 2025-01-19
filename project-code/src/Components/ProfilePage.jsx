import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';


const reactionMap = {
  smile: '😊',
  thumbsUp: '👍',
  heart: '❤️',
  laugh: '😂',
  wow: '😮',
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [reactedAdvices, setReactedAdvices] = useState([]);
  const [addedAdvices, setAddedAdvices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userDoc = doc(db, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUser(userData);

            // Fetch Reacted Advice
            if (userData.reactedAdvices?.length) {
              const advices = await Promise.all(
                userData.reactedAdvices.map(async ({ adviceId, reaction }) => {
                  const adviceDoc = doc(db, 'advices', adviceId);
                  const adviceSnapshot = await getDoc(adviceDoc);

                  if (adviceSnapshot.exists()) {
                    return {
                      adviceText: adviceSnapshot.data().advice,
                      reaction: reactionMap[reaction] || reaction, // Use emoji or fallback to name
                    };
                  } else {
                    return {
                      adviceText: 'Advice not found',
                      reaction: reactionMap[reaction] || reaction,
                    };
                  }
                })
              );
              setReactedAdvices(advices);
            }

            // Fetch Added Advice
            const addedAdviceQuery = query(
              collection(db, 'advices'),
              where('source', '==', userData.email)
            );
            const addedAdviceSnapshot = await getDocs(addedAdviceQuery);
            const addedAdviceList = addedAdviceSnapshot.docs.map((doc) => ({
              ...doc.data(),
              addedDate: doc.data().addedDate?.toDate() || new Date(),
            }));
            setAddedAdvices(addedAdviceList);
          } else {
            toast.error('No user document found.');
          }
        } else {
          toast.error('No authenticated user found.');
        }
      } catch (error) {
        toast.error('Error fetching profile details.');
        console.error('Error fetching profile details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error">User data not found. Please log in again.</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Photo */}
        <div className="profile-photo">
          <img
            src={user.avatarUrl || 'https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Aiden'}
            alt="Profile"
          />
        </div>

        {/* User Details */}
        <div className="user-details">
          <h1 className="user-name">{user.username || 'N/A'}</h1>
          <p className="user-info"><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p className="user-info"><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        </div>

        {/* Reacted Advice */}
        <div className="reacted-advice">
          <h2 className="section-title">Reacted Advice</h2>
          {reactedAdvices.length > 0 ? (
            <ul className="advice-list">
              {reactedAdvices.map((advice, index) => (
                <li key={index} className="advice-item">
                  <p>{advice.adviceText}</p>
                  <span className="reaction-tag">Reacted with: {advice.reaction}</span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="no-advice">No reacted advice available.</p>
              <a className="btn btn-danger" href="/advices">
                Get Advices 👵
              </a>
            </>
          )}
        </div>

        {/* Added Advice */}
        <div className="added-advice">
          <h2 className="section-title">Your Added Advice</h2>
          {addedAdvices.length > 0 ? (
            <ul className="advice-list">
              {addedAdvices.map((advice, index) => (
                <li key={index} className="advice-item">
                  <p>{advice.advice}</p>
                  <span className="category-tag">Category: {advice.category}</span>
                  <span className="date-tag">
                    Added on: {new Date(advice.addedDate).toLocaleDateString()}
                  </span>
                  <span className="category-tag fw-bold">Status: {advice.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="no-advice">No advice added yet.</p>
              <a className="btn btn-success" href="/add-advice">
                Add Advice <FaPlus />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
