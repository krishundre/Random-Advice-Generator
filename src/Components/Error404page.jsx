import React from 'react';
import './Error404.css';

const Error404 = () => {
  return (
    <div className="error-container d-flex flex-column justify-content-center align-items-center">
      {/* GIF Placeholder */}
      <div className="gif-container">
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3B3N3VkNmxxbnhqcm13ZGRtdDcwamtiNzBkbXJyNXphaHBxcGIzdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j9XoexYMmd7LdntEK4/giphy.gif" alt="404 gif" />
      </div>

      {/* Error Message */}
      <p className="error-message">Oops! Page Not Found</p>
      <p className="error-description">
        It seems like the page you are looking for doesn't exist. But don’t worry, you can go back to the home page.
      </p>

      {/* Button to go back to Home */}
      <a href="/" className="btn btn-primary custom-btn">
        Go Back to Home
      </a>
    </div>
  );
};

export default Error404;
