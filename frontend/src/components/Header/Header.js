import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// import './Header.css';


const Header = () => {
  const { isAuthenticated, logout} = useAuth();
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          {
            isAuthenticated ? 
            <>   
            <li className="nav-item"><NavLink to="/book-appointment" activeClassName="active">Book Appointment</NavLink></li>
            <li className="nav-item"><NavLink to="/appointments" activeClassName="active">Appointment History</NavLink></li>
            <button onClick={handleLogout} className='myButton' >Logout</button>
            </>
             :
            <>  <li className="nav-item"><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>
                <li className="nav-item"><NavLink to="/" activeClassName="active">Sign In</NavLink></li>
            </>
          }
        
        
        </ul>
      </nav>
    </header>
  )
}

export default Header
