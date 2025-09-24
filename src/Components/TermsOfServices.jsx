import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
    return (
        <div className="tos-full-page-container px-5 p-md-5">
            <div className="privacy-policy-wrapper">
            <div className="tos-header">
                <h1>Terms of Service</h1>
                <p>Effective Date: 1st November 2024</p>
            </div>

            <div className="tos-section">
                <h2>1. Introduction</h2>
                <p>
                    Welcome to Random Advice Generator. These Terms of Service govern your use of our website and services. By accessing or using our service, you agree to abide by the following terms and conditions.
                </p>
            </div>

            <div className="tos-section">
                <h2>2. User Obligations</h2>
                <p>
                    As a user, you are expected to provide accurate information, avoid unauthorized activities, and respect the privacy of others. You agree not to misuse the service or engage in activities that violate laws.
                </p>
            </div>

            <div className="tos-section">
                <h2>3. Intellectual Property Rights</h2>
                <p>
                    All content on this website, including text, images, logos, and software, are the intellectual property of Random Advice Generator or our licensors. You may not reproduce, distribute, or create derivative works based on any of our content without our permission.
                </p>
            </div>

            <div className="tos-section">
                <h2>4. Third-Party Services</h2>
                <p>
                    Our website may contain links to third-party websites or services. We are not responsible for the content or services provided by these third-party websites, and you use them at your own risk.
                </p>
            </div>

            <div className="tos-section">
                <h2>5. Disclaimer of Warranties</h2>
                <p>
                    Our services are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any content available on the website.
                </p>
            </div>

            <div className="tos-section">
                <h2>6. Limitation of Liability</h2>
                <p>
                    We are not liable for any indirect, incidental, or consequential damages arising from your use of our services, even if we have been advised of the possibility of such damages.
                </p>
            </div>

            <div className="tos-section">
                <h2>7. Governing Law</h2>
                <p>
                    These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or related to these terms shall be resolved in the courts of Government of India.
                </p>
            </div>

            <div className="tos-section">
                <h2>8. Changes to the Terms</h2>
                <p>
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes have been posted constitutes your acceptance of the updated terms.
                </p>
            </div>

            <div className="tos-footer">
                <p>If you have any questions or concerns about these terms, feel free to contact us at krisundre@gmail.com</p>
            </div>
        </div>
        </div>
    );
};

export default TermsOfService;
