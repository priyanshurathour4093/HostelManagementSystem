import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faAddressBook,
  faBed,
  faFile,
  faScroll,
  faUser,
  faSignIn,
  faUtensils,
  faCreditCard,
  faCreditCardAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import Logo from "./logo";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = localStorage.getItem("admin") === "true";
  const isSuperAdmin = localStorage.getItem("superadmin") === "true";
  const isCookie = localStorage.getItem("cookie");
  const hostel_no=localStorage.getItem('hostel_no');

  const scrollToContacts = () => {
    const contactsSection = document.getElementById("universal1");
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className=" bg-5522a3 p-3 shadow-lg bg-gradient-to-r from-5522a3 to-indigo-600" >
      <div className="navbar-items max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex ">
          <a href="/" className="text-white flex text-lg font-bold">
            <Logo/>
          <p className="ml-2 mt-4 text-white text-lg font-bold"> HMS</p>
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex ${
            isOpen ? "block" : "hidden"
          } md:justify-evenly md:space-x-10 md:items-center`}
        >
          
          {isSuperAdmin && (
            <li className="relative group">
              <NavLink
                to="/admindashboard"
                activeClassName="text-indigo-600"
                className="text-white  "
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />

                AdminDashboard
              </NavLink>
              <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
            </li>
          )}
          
          {isAdmin && !isSuperAdmin && (
            <li className="relative group">
              <NavLink
                to={`/admindashboard/${hostel_no}`}
                activeClassName="text-indigo-600"
                className="text-white  "
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />

                Dashboard
              </NavLink>
              <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
            </li>
          )}
          {isCookie&&<li className="relative group">
            <NavLink
              to="/announcement"
              activeClassName="text-indigo-600"
              className="text-white "
            >
              <FontAwesomeIcon icon={faScroll} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
              Announcements
            </NavLink>
            <div className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></div>
          </li>}
          {!isSuperAdmin && !isAdmin && isCookie && <li className="relative group">
            <NavLink
              to="/mess"
              activeClassName="text-indigo-600"
              className="text-white  "
            >
              <FontAwesomeIcon icon={faUtensils} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
              Mess
            </NavLink>
            <span className="absolute left-0 bottom-0 h-0.5  bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
          </li>
          }
          {!isSuperAdmin && !isAdmin && isCookie && <li className="relative group">
            <NavLink
              to="/payment"
              activeClassName="text-indigo-600"
              className="text-white  "
            >
              <FontAwesomeIcon icon={faCreditCardAlt} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
              Dues
            </NavLink>
            <span className="absolute left-0 bottom-0 h-0.5  bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
          </li>
          }
          {isAdmin && !isSuperAdmin && <li className="relative group">
            <NavLink
              to="/rooms"
              activeClassName="text-indigo-600"
              className="text-white "
            >
              <FontAwesomeIcon icon={faBed} className="mr-1 bg-white text-purple-600 p-1 text-sm rounded-md" />
              Rooms
            </NavLink>
            <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
          </li>}
          {/* {!isSuperAdmin&&<li className="relative group">
            <NavLink 
              
              activeClassName="text-indigo-600"
              className="text-white "
              onClick={scrollToContacts}
            >
              <FontAwesomeIcon icon={faAddressBook} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
              Contact Us
            </NavLink>
            <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
          </li>} */}
          
          {/* {!isSuperAdmin&&<li className="relative group">
            <NavLink
              to="/aboutus"
              activeClassName="text-indigo-600"
              className="text-white  "
            >
              <FontAwesomeIcon icon={faUser} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
              About Us
            </NavLink>
            <span className="absolute left-0 bottom-0 h-0.5  bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
          </li>} */}
          {!isCookie && (
            <li className="relative group">
              <NavLink
                to="/login"
                activeClassName="text-indigo-600"
                className="text-white    flex items-center transition-all duration-200"
                style={{ maxWidth: "40rem" }}
              >
                <FontAwesomeIcon icon={faSignIn} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
                Login
              </NavLink>
              <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
            </li>
          )}

          {!isCookie && (
            <li className="relative group">
              <NavLink
                to="/signUp"
                activeClassName="text-indigo-600"
                className="text-white   flex items-center"
              >
                <FontAwesomeIcon icon={faSignIn} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
                Signup
              </NavLink>
              <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
            </li>
          )}
          {isCookie && (
            <li className="relative group">
              <NavLink
                to="/chatgroup"
                activeClassName="text-indigo-600"
                className="text-white"
              >
                <FontAwesomeIcon icon={faSignIn} className="mr-1 bg-white text-purple-600 text-sm p-1 rounded-md" />
                Chats
              </NavLink>
              <span className="absolute left-0 bottom-0 h-0.5 bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full transition-all duration-1000"></span>
            </li>
          )}
          
      {isCookie&&<li className="relative group">
          <ProfileDropdown />
        <span className="absolute left-0 bottom-0 h-0.5  bg-transparent group-hover:bg-purple-500 w-0 group-hover:w-full  text-white transition-all duration-1000"></span>
      </li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
 