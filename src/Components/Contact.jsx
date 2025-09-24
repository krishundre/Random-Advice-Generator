import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_37mzy4c', 'template_7215qv9', form.current, '_vFhgvQ185BTVIq2e')
      .then(
        () => {
          console.log('SUCCESS!'); 
          alert('Email sent succefully!');
          e.target.reset();  // To clear form after successful submission
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="contact-page container-fluid d-flex align-items-center justify-content-center">
      <div className="contact-form-wrapper w-75 ">
        <h1 className="contact-heading">Contact Us</h1>
        {/* Use the ref to target the form */}
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="user_email"   // EmailJS requires "name" attributes
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
              name="user_contact"  // EmailJS requires "name" attributes
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
              name="subject"   // EmailJS requires "name" attributes
              className="form-control contact-input"
              id="subject"
              placeholder="Enter the subject"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="message"  // EmailJS requires "name" attributes
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
