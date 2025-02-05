import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faUsers, faSadTear, faFileAlt, faUsersCog, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="w-1/5 md:w-1/6 h-full">
      <ul className="text-black">
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/admindashboard" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/admindashboard")}
        >
          <Link to="/admindashboard" className="flex items-center text-black">
          <FontAwesomeIcon className="mr-2" icon={faChartBar} />
            Analytics
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/admindashboard/Student" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/admindashboard/Student")}
        >
          <Link to="/admindashboard/Student" className="flex items-center text-black">
            <FontAwesomeIcon className="mr-2" icon={faUsers} />
            Students
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/admindashboard/Complaints" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/admindashboard/Complaints")}
        >
          <Link to="/admindashboard/Complaints" className="flex items-center text-black">
            <FontAwesomeIcon className="mr-2" icon={faSadTear} />
            Complaints
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/admindashboard/FeeDetails" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/admindashboard/FeeDetails")}
        >
          <Link to="/admindashboard/FeeDetails" className="flex items-center text-black active">
            <FontAwesomeIcon className="mr-2" icon={faFileAlt} />
            Fee Details
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/admindashboard/transaction" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/admindashboard/transaction")}
        >
          <Link to="/admindashboard/transaction" className="flex items-center text-black active">
            <FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
            Transaction
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/admindashboard/Workers" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/admindashboard/Workers")}
        >
          <Link to="/admindashboard/Workers" className="flex items-center text-black">
            <FontAwesomeIcon className="mr-2" icon={faUsersCog} />
            Workers Details
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
