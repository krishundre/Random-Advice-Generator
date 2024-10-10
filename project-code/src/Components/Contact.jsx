import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page container-fluid">
      <div className="contact-form-wrapper">
        <h1 className="contact-heading">Contact Us</h1>
        <form className="contact-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control contact-input"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contact" className="form-label">Contact Number</label>
            <input
              type="tel"
              className="form-control contact-input"
              id="contact"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Subject */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              className="form-control contact-input"
              id="subject"
              placeholder="Enter the subject"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control contact-textarea"
              id="description"
              rows="5"
              placeholder="Enter the description"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary contact-btn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
