import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  // Placeholder user details
  const user = {
    profilePhoto: 'https://via.placeholder.com/150',
    name: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    reactedAdvice: [
      'Take time to do what makes your soul happy.',
      'Success is not the key to happiness. Happiness is the key to success.',
      'Be yourself; everyone else is already taken.',
    ],
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Photo */}
        <div className="profile-photo">
          <img src={user.profilePhoto} alt="Profile" />
        </div>

        {/* User Details */}
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <p className="user-info"><strong>Username:</strong> {user.username}</p>
          <p className="user-info"><strong>Email:</strong> {user.email}</p>
          <p className="user-info"><strong>Phone:</strong> {user.phone}</p>
        </div>

        {/* Reacted Advice */}
        <div className="reacted-advice">
          <h2 className="section-title">Reacted Advice</h2>
          <ul className="advice-list">
            {user.reactedAdvice.map((advice, index) => (
              <li key={index} className="advice-item">{advice}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
