import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/signup' element={<SignIn />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<Error404 />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/termsofservice' element={<TermsOfService />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />

        </Routes>
        <Footer />
      </div >
    </Router>
  );
}

export default App;