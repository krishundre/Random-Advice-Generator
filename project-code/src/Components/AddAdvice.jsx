import React, { useState } from 'react';
import './AddAdvice.css';

const AddAdvice = () => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save advice logic here (e.g., send to Firestore)
    if (advice && category) {
      setSuccessMessage('Advice added successfully!');
      setAdvice('');
      setCategory('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="add-advice-page">
      <div className="form-container">
        <h1 className="form-heading">Add Advice</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="advice" className="form-label">Advice</label>
            <textarea
              id="advice"
              className="form-control input-advice"
              placeholder="Enter your advice here..."
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              className="form-control input-category"
              placeholder="Enter advice category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-submit">Submit Advice</button>
        </form>

        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default AddAdvice;