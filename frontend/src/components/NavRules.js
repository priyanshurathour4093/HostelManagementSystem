import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavRules = () => {
  const location = useLocation();

  return (
    <nav className="w-1/5 md:w-1/4 bg-gradient-to-b from-indigo-700 to-blue-500 p-8 rounded-lg my-1 mb-10">
      <ul className="text-white">
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400 no-underline transition duration-300  rounded-md ${
            location.pathname === "/messmenu" ? "bg-blue-900 border-white" : ""
          }`}
        >
          <Link
            to="/messmenu"
            className="flex items-center text-white "
          >
            Mess Menu
          </Link>
        </li>
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400 transition duration-300  rounded-md ${
            location.pathname === "/rules" ? "bg-blue-900 border-white" : ""
          }`}
        >
          <Link
            to="/rules"
            className="flex items-center text-white "
          >
            Rules & Regulations
          </Link>
        </li>
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400  transition duration-300 rounded-md ${
            location.pathname === "/general" ? "bg-blue-900" : ""
          }`}
        >
          <Link
            to="/general"
            className="flex items-center text-white "
          >
            General
          </Link>
        </li>
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400  transition duration-300 rounded-md ${
            location.pathname === "/guest" ? "bg-blue-900" : ""
          }`}
        >
          <Link
            to="/guest"
            className="flex items-center text-white "
          >
            Guest Accommodation
          </Link>
        </li>
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400  transition duration-300 rounded-md ${
            location.pathname === "/mess" ? "bg-blue-900" : ""
          }`}
        >
          <Link
            to="/mess"
            className="flex items-center text-white "
          >
            Mess Regulation
          </Link>
        </li>
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400  transition duration-300 rounded-md ${
            location.pathname === "/ragging" ? "bg-blue-900" : ""
          }`}
        >
          <Link
            to="/ragging"
            className="flex items-center text-white "
          >
            Ragging
          </Link>
        </li>
        <li
          className={`py-4 px-4 text-lg font-semibold hover:bg-blue-400  transition duration-300 rounded-md ${
            location.pathname === "/maintenance" ? "bg-blue-900" : ""
          }`}
        >
          <Link
            to="/maintenance"
            className="flex items-center text-white "
          >
            Maintenance and Upkeep
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavRules;
