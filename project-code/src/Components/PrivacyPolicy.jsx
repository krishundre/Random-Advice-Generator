import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page container-fluid">
      <div className="privacy-policy-wrapper">
        <h1 className="privacy-policy-heading">Privacy Policy</h1>

        <p className="policy-intro">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal data. Please read it carefully.
        </p>

        {/* Information We Collect */}
        <h2 className="policy-subheading">Information We Collect</h2>
        <p className="policy-text">
          We collect the following personal information from you when you use our website:
        </p>
        <ul className="policy-list">
          <li>Username</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Any other information you voluntarily provide.</li>
        </ul>

        {/* How We Use Your Information */}
        <h2 className="policy-subheading">How We Use Your Information</h2>
        <p className="policy-text">
          The information we collect from you is used for the following purposes:
        </p>
        <ul className="policy-list">
          <li>To provide, operate, and maintain our website</li>
          <li>To improve, personalize, and expand our services</li>
          <li>To communicate with you, including customer service and notifications</li>
          <li>To send periodic emails regarding updates or other important information</li>
        </ul>

        {/* Data Protection */}
        <h2 className="policy-subheading">Data Protection</h2>
        <p className="policy-text">
          We take the security of your personal information seriously. We implement various security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>

        {/* Sharing Information */}
        <h2 className="policy-subheading">Sharing Information</h2>
        <p className="policy-text">
          We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except for trusted third parties who assist us in operating our website, conducting our business, or providing services to you.
        </p>

        {/* User Rights */}
        <h2 className="policy-subheading">Your Rights</h2>
        <p className="policy-text">
          As a user of our website, you have the following rights:
        </p>
        <ul className="policy-list">
          <li>The right to access your personal data</li>
          <li>The right to request corrections to your personal data</li>
          <li>The right to request deletion of your personal data</li>
          <li>The right to restrict or object to processing</li>
        </ul>

        {/* Changes to This Policy */}
        <h2 className="policy-subheading">Changes to This Policy</h2>
        <p className="policy-text">
          We reserve the right to update this privacy policy at any time. Any changes will be posted on this page, and we encourage you to review this policy periodically.
        </p>

        {/* Contact Us */}
        <h2 className="policy-subheading">Contact Us</h2>
        <p className="policy-text">
          If you have any questions about this privacy policy, you can contact us at:
        </p>
        <p className="policy-contact">Email: vaibhskulk@gmail.com</p>
        <p className="policy-contact">Phone: +91 7517976109</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
