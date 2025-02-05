import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faSadTear,
  faFileAlt,
  faUsersCog,
  faSearch,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./sidebar";


export default function FeeDetails() {
  const hostel_no  = "H10"
  const [students, setStudents] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [dueInput, setDueInput] = useState("");
  const handleAddDueClick = () => {
    setShowInputBox(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  

  
  const fetchStudentsAccounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/getstudentsaccounts/${hostel_no}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } else {
        console.log("resonse");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchStudentsAccounts();
  }, [hostel_no]);
  return (
    <div className="h-100vh p-4 bg-back">
      <div className="container mx-auto">
        <div className="flex justify-center items-start gap-8 mt-2">
          <Sidebar/>

          <div className="w-full md:w-3/4 mt-8 md:mt-0">
            <div className="bg-white p-8 rounded-xl bg-opacity-60">
              <div className="max-w-full">
                <div className="grid gap-6 md:gap-12">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-black ">
                        Fee Details
                      </h1>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500 "
                      />
                      <input
                       className="pl-8 w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none   bg-Zinc-400 text-blue   "
                        placeholder="Search..."
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-teal-300 ">
                          <tr className="text-black">
                            <th className="py-2 px-4 text-center">Sr.No.</th>
                            <th className="py-2 px-4 text-center">Name</th>
                            <th className="py-2 px-4 text-center">
                              Total Paid
                            </th>
                            <th className="py-2 px-4 text-center">Remaining</th>
                            <th className="py-2 px-4 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {students
                            .filter(
                              (student) =>
                                student.full_name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                student.status
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                            )
                            .map((student, index) => (
                              <TableRow
                                key={index}
                                id={index + 1}
                                name={student.full_name}
                                TotalPaid={student.user_paid}
                                Remaining={student.user_dues}
                                Status={student.status}
                              />
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ id, name, TotalPaid, Remaining, Status }) {
  return (
    <tr className="text-black bg-white rounded-lg my-4 md:table-row flex flex-col md:flex-row">
      <td className="py-4 px-4 text-center rounded-l-lg md:rounded-none">
        {id}
      </td>
      <td className="py-4 px-4 text-center">{name}</td>
      <td className="py-4 px-4 text-center">{TotalPaid}</td>
      <td className="py-4 px-4 text-center">{Remaining}</td>
      <td className="py-4 px-4 text-center rounded-r-lg md:rounded-none">
        {Remaining != 0 ? (
          <span className="text-red-500">Pending</span>
        ) : (
          <span className="text-green-500">Paid</span>
        )}
      </td>
    </tr>
  );
}
