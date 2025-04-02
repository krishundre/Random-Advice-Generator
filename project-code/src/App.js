import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext'; // Ensure LoadingProvider is imported
import Loader from './Components/Loader'; // Ensure Loader component is imported
import { Analytics } from "@vercel/analytics/react"
// Import components
import Homepage from './Components/Homepage';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Login from './Components/Loginpage';
import SignIn from './Components/SignInPage';
import Error404 from './Components/Error404page';
import Contact from './Components/Contact';
import AboutUs from './Components/AboutUs';
import TermsOfService from './Components/TermsOfServices';
import PrivacyPolicy from './Components/PrivacyPolicy';
import Advices from './Components/Advices';
import AdditionalDetails from './Components/AdditionalDetails';
import ProfilePage from './Components/ProfilePage';
import ResetPassword from './Components/Reset-password';
import AddAdvice from './Components/AddAdvice';
import SubscribeStrip from './Components/subscribe';


function App() {
  return (
    <AuthProvider>

      <LoadingProvider> {/* Wrap everything with LoadingProvider */}
        <Router>
          <Analytics />
          <div className="App">
            <Navbar />
            <Loader /> {/* Loader will be globally available */}
            <Routes>
              <Route path='/signup' element={<SignIn />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Homepage />} />
              <Route path='/profile' element={< ProfilePage />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/*' element={<Error404 />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/termsofservice' element={<TermsOfService />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/advices' element={<Advices />} />
              <Route path='/additional-details' element={<AdditionalDetails />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/add-advice' element={<AddAdvice />} />
            </Routes>
            <Footer />
            {/* <SubscribeStrip /> */}
          </div>
        </Router>
      </LoadingProvider>

    </AuthProvider>
  );
}

export default App;
