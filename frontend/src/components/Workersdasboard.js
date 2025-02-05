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
import Sidebardashboard from "./sidebardashboard";

export default function Workersdashboard() {
  const [workers, setWorkers] = useState([]);
  // const hostel_no = localStorage.getItem('hostel_no');
  const { hostel_no } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await fetch(
        " http://localhost:5000/api/auth/getworker",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hostel_no }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setWorkers(data); // Assuming the response contains an array of workers
      } else {
        console.error("Failed to fetch workers");
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  return (
    <div className="h-100vh p-4 bg-back">
      <div className="container mx-auto">
        <div className="flex justify-center items-start gap-8 mt-2">
          <Sidebardashboard hostel_no={hostel_no} />

          <div className="w-full md:w-3/4 mt-8 md:mt-0">
            <div className="bg-white p-8 rounded-xl bg-opacity-60">
              <div className="max-w-full">
                <div className="grid gap-6 md:gap-12">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-black ">
                        Workers Information
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
                            <th className="py-2 px-4 text-center">Email</th>
                            <th className="py-2 px-4 text-center">Contact</th>
                            <th className="py-2 px-4 text-center">Post</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {workers
                            .filter(
                              (worker) =>
                                worker.w_name
                                  ?.toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                worker.w_email
                                  ?.toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                worker.contact_no
                                  ?.toString()
                                  .includes(searchTerm) ||
                                worker.w_post
                                  ?.toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                            )
                            .map((worker, index) => (
                              <TableRow
                                key={index}
                                index={index + 1}
                                w_name={worker.w_name}
                                w_email={worker.w_email}
                                contact_no={worker.contact_no}
                                w_post={worker.w_post}
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

function TableRow({ index, w_name, w_email, contact_no, w_post }) {
  return (
    <tr className="text-black bg-white rounded-lg my-4 md:table-row flex flex-col md:flex-row">
      <td className="py-4 px-4 text-center rounded-l-lg md:rounded-none">
        {index}
      </td>
      <td className="py-4 px-4 text-center">{w_name}</td>
      <td className="py-4 px-4 text-center">{w_email}</td>
      <td className="py-4 px-4 text-center">{contact_no}</td>
      <td className="py-4 px-4 text-center rounded-r-lg md:rounded-none">
        {w_post}
      </td>
    </tr>
  );
}
