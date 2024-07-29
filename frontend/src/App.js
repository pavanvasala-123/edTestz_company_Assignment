import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
// import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Booking from './components/Booking/Booking';
import AppointmentHistory from './components/AppointmentHistory/AppointmentHistory';
import NotFound from './components/NotFound';
import PrivateRoutes from './components/privateRoutes';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route element={<PrivateRoutes />}>
            <Route path="/book-appointment" element={<Booking />} />
            <Route path="/appointments" element={<AppointmentHistory />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
