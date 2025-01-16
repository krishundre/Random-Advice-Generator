import React, { useState } from 'react';
import './AddAdvice.css';
import { db, auth } from '../config/firebase'; // Import Firebase configurations
import { collection, addDoc, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import { toast, Toaster } from 'react-hot-toast';

const AddAdvice = () => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (advice.trim() && category.trim()) {
      try {
        setLoading(true);

        const user = auth.currentUser; // Get current authenticated user
        if (!user) {
          alert('You must be logged in to submit advice.');
          return;
        }

        // Add advice to the 'advices' collection in Firestore
        const adviceRef = await addDoc(collection(db, 'advices'), {
          advice: advice.trim(),
          category: category.trim(),
          source: user.displayName || user.email, // Use username if available, fallback to email
          addedDate: serverTimestamp(), // Firestore server timestamp
          status: 'not-approved'
        });

        // Update the user's document in the 'users' collection
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          addedAdvices: arrayUnion({
            adviceId: adviceRef.id, // Reference to the advice document ID
            adviceText: advice.trim(),
            category: category.trim(),
            addedDate: new Date().toISOString(), // Store the current date in ISO format
          }),
        });

        // Show a success message
        toast('Your advice has been added successfully! Thank you for sharing your wisdom. 🌟', {
          style: {
            background: '#000',
            color: '#E16A20',
          },
        });

        // Reset form fields
        setAdvice('');
        setCategory('');
      } catch (error) {
        console.error('Error adding advice to Firestore:', error);
        alert('Failed to add advice. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  return (
    <div className="add-advice-page">
      <div className="form-container">
        <h1 className="form-heading">Share Your Wisdom 💡</h1>
        <p className="form-subheading">
          Inspire someone today! Write advice that might brighten someone's day or guide them through a challenge.
        </p>

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
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default AddAdvice;

