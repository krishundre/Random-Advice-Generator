import React from 'react';
import './SignIn.css';  // Assuming you're putting custom CSS in this file

function SignIn() {
    return (
        <div className="sign-in-container d-flex justify-content-center align-items-center">
            <div className="form-container p-4">
                {/* Image placeholder */}
                <div className="image-placeholder mb-3">
                    <img src="https://via.placeholder.com/100" alt="Sign In" className="img-fluid" />
                </div>

                <h2 className="text-center text-white mb-4">Sign In</h2>

                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary custom-btn-primary">
                            Sign In
                        </button>

                    </div>
                </form>

                <div className="text-center mt-3">
                    <a href="/" className="forgot-password">Already have an account? Sign In</a>

                </div>
            </div>
        </div>
    );
}

export default SignIn;
