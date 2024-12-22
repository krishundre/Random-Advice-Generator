import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [reactedAdvices, setReactedAdvices] = useState([]);
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

            if (userData.reactedAdvices && userData.reactedAdvices.length > 0) {
              const advices = await Promise.all(
                userData.reactedAdvices.map(async ({ adviceId, reaction }) => {
                  const adviceDoc = doc(db, 'advices', adviceId);
                  const adviceSnapshot = await getDoc(adviceDoc);

                  if (adviceSnapshot.exists()) {
                    return {
                      adviceText: adviceSnapshot.data().advice,
                      reaction,
                    };
                  } else {
                    return {
                      adviceText: 'Advice not found',
                      reaction,
                    };
                  }
                })
              );
              setReactedAdvices(advices);
            }
          } else {
            console.error('No such user document exists in the database.');
          }
        } else {
          console.error('No authenticated user found.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
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
            src={user.avatarUrl || 'https://via.placeholder.com/150'}
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
            <p className="no-advice">No reacted advice available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
