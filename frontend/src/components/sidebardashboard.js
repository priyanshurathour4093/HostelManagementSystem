import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faUsers, faSadTear, faFileAlt, faUsersCog, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

function Sidebardashboard({hostel_no}) {
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
          <Link to={`/admindashboard/${hostel_no}`} className="flex items-center text-black">
          <FontAwesomeIcon className="mr-2" icon={faChartBar} />
            Analytics
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/Student" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/Student")}
        >
          <Link to={`/admindashboard/${hostel_no}/students`} className="flex items-center text-black">
            <FontAwesomeIcon className="mr-2" icon={faUsers} />
            Students
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/Complaints" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/Complaints")}
        >
          <Link to={`/admindashboard/${hostel_no}/complaints`} className="flex items-center text-black">
            <FontAwesomeIcon className="mr-2" icon={faSadTear} />
            Complaints
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/FeeDetails" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/FeeDetails")}
        >
          <Link to={`/admindashboard/${hostel_no}/feedetails`} className="flex items-center text-black active">
            <FontAwesomeIcon className="mr-2" icon={faFileAlt} />
            Fee Details
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/transaction" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/transaction")}
        >
          <Link to={`/admindashboard/${hostel_no}/transaction`} className="flex items-center text-black active">
            <FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
            Transaction
          </Link>
        </li>
        <li
          className={`py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-300 rounded-md ${
            activeLink === "/Workers" && "bg-blue-400"
          }`}
          onClick={() => handleSetActiveLink("/Workers")}
        >
          <Link to={`/admindashboard/${hostel_no}/workers`} className="flex items-center text-black">
            <FontAwesomeIcon className="mr-2" icon={faUsersCog} />
            Workers Details
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebardashboard;
