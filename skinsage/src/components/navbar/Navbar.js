import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import navbarimg from '../navbar/skinlogo.png'


export default function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    alert("Logged Out Successfully")
    navigate("/");
  }
  return (
    <div>
      <nav className='navbar'>
        <img className='navbar-img' src={navbarimg} alt="" />
        <ul className='navbar-ul'>
          <li className='navbar-li'>
            <Link className='navbar-link' to='/'>Home</Link>
          </li>
          <li className='navbar-li'>
            <Link className='navbar-link' to='/diagnosis'>Diagnosis</Link>
          </li>
          
          <li className='navbar-li'>
            <Link className='navbar-link' to='/campportal'>Camps</Link>
          </li>
          <li className='navbar-li'>
            <Link className='navbar-link' to='/doctors_page'>Doctors</Link>
          </li>

          <div className="nav_buttons">
       

          {!localStorage.getItem('token') ?
            <li className='navbar-li'>
            <button className='Login-btn' to='/Registration_pages'> 
              <Link className='sadsa' to="/auth/login">Login</Link>
            </button>
          </li>
          :
          <div className='navbar_but'>
             <li className='navbar-li'>
            <button className='Login-btn'> 
              <Link className='sadsa'>Profile</Link>
            </button>
          </li>
          <li className='navbar-li'>
            <button className='Login-btn' onClick={handleLogOut} > 
              <Link className='sadsa'>Logout</Link>
            </button>
          </li>
          </div>

       
    
      }
      </div>
      </ul>

        
      </nav>
    </div>
  )
}
