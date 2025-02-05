import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 sm:px-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">NIT KURUKSHETRA HOSTEL</h3>
            <p className="text-gray-400">Providing comfortable living experiences for our students.</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="list-none">
              <li className="mb-2"><NavLink to={"/"} className="text-gray-400 hover:text-white">Home</NavLink></li>
              <li className="mb-2"><NavLink to={"/rooms"} className="text-gray-400 hover:text-white">Rooms</NavLink></li>
              <li className="mb-2"><NavLink to={"/announcement"} className="text-gray-400 hover:text-white">Announcements</NavLink></li>
              <li className="mb-2"><NavLink to={"/rules"} className="text-gray-400 hover:text-white">Rules & Regulations</NavLink></li>
              <li className="mb-2"><NavLink to={""} className="text-gray-400 hover:text-white">Contact Us</NavLink></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <ul className="list-none flex">
              <li className="mr-4"><NavLink href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faFacebook} /></NavLink></li>
              <li className="mr-4"><NavLink href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faXTwitter} /></NavLink></li>
              <li className="mr-4"><NavLink href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faInstagram} /></NavLink></li>
              <li><a href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400">&copy; 2024 NIT KURUKSHETRA HOSTEL . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;