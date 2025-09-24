import React, { useState, useEffect } from 'react';
import './AddAdvice.css';
import { db, auth } from '../config/firebase'; // Import Firebase configurations
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import { toast, Toaster } from 'react-hot-toast';

const guidelines = [
  "No personal details like phone numbers, emails, or addresses.",
  "Avoid hate speech, offensive language, or harmful advice.",
  "Keep the advice concise and to the point.",
  "Make sure the advice is useful and actionable.",
  "Choose an appropriate category for your advice."
];

const validateAdvice = (text) => {
  const forbiddenPatterns = [
    /\b\d{10}\b/,
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    /\b\d{5,6}\b/
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(text)) {
      return "Your advice contains personal details or restricted content.";
    }
  }
  return "";
};

const AddAdvice = () => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userAdvices, setUserAdvices] = useState([]);

  useEffect(() => {
    const fetchUserAdvices = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserAdvices(userData.addedAdvices || []);
        }
      }
    };

    fetchUserAdvices();
  }, [auth.currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateAdvice(advice);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!advice.trim() || !category.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError('');

      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to submit advice.');
        return;
      }

      const adviceRef = await addDoc(collection(db, 'advices'), {
        advice: advice.trim(),
        category: category.trim(),
        source: user.displayName || user.email,
        addedDate: serverTimestamp(),
        status: 'not-approved',
      });

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        addedAdvices: arrayUnion({
          adviceId: adviceRef.id,
          adviceText: advice.trim(),
          category: category.trim(),
          addedDate: new Date().toISOString(),
          status: 'not-approved',
        }),
      });

      toast.success('Your advice has been submitted for review!', {
        style: { background: '#000', color: '#E16A20' },
      });

      setAdvice('');
      setCategory('');
    } catch (error) {
      console.error('Error adding advice to Firestore:', error);
      toast.error('Failed to add advice. Please try again.', {
        style: { background: '#000', color: '#E16A20' },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add-advice-page">
      <div className="form-container">
        <h1 className="form-heading">Share Your Wisdom 💡</h1>
        <p className="form-subheading">
          Inspire someone today! Submit your advice, and we'll make sure it aligns with our guidelines before sharing it with the world.
        </p>

        {/* Guidelines Section */}
        <div className="guidelines">
          <h3>Submission Guidelines:</h3>
          <ul>
            {guidelines.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="advice" className="form-label">Your Advice</label>
            <textarea
              id="advice"
              className="form-control input-advice"
              placeholder="e.g., Stay positive and work hard to achieve your dreams."
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              className="form-control input-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select a Category --</option>
              <option value="Daily Life Hacks">Daily Life Hacks</option>
              <option value="Friendships, Feels, and Social Stuff">
                Friendships, Feels, and Social Stuff
              </option>
              <option value="School, Work, and Hustle Tips">
                School, Work, and Hustle Tips
              </option>
              <option value="Mindset Check">Mindset Check</option>
              <option value="Life Upgrades">Life Upgrades</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <button type="submit" className="btn btn-submit" disabled={loading}>
            {loading ? 'Adding Advice...' : '🌟 Add My Advice'}
          </button>
        </form>

        <div className="submission-process">
          <h3>What Happens Next?</h3>
          <ol>
            <li>You submit your advice.</li>
            <li>Our admin team reviews your advice to ensure it aligns with our guidelines.</li>
            <li>If approved, your advice will be displayed to other users!</li>
          </ol>
        </div>

        <div className="user-advices">
          <h3>Your Submitted Advice</h3>
          {userAdvices.length > 0 ? (
            <ul>
              {userAdvices.map((advice, index) => (
                <li key={index}>
                  <p>
                    <strong>{advice.adviceText}</strong> <br />
                    Category: {advice.category} | Status: <b>{advice.status}</b>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No advice submitted yet.</p>
          )}
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default AddAdvice;
