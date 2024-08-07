import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="app-name">
          <p className='app-name-inner'>SkinSage</p>
          <p className='footer-info'>AI Preliminary Dermatology Analysis
            Providing features blah blah</p>
        </div>
        <div className="copyright-section">
          <span>© SkinSage</span>
          <span>Developed By: Team_ZXC</span>
        </div>
      </div>

      {/* <div className="footer-2">
        <ul>
          <li><Link>Home</Link></li>
          <li><Link>Symptoms</Link></li>
          <li><Link>Upload</Link></li>
          <li><Link>Chatbox</Link></li>
          <li><Link>About Us</Link></li>
          <li><Link>Contact Us</Link></li>
        </ul>
      </div> */}
    </>
  )
}
