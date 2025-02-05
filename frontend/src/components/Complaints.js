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
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const hostel_no = localStorage.getItem("hostel_no");
  const [searchQuery, setSearchQuery] = useState("");

  const getComplaints = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/getcomplaint",
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
        setComplaints(data);
      } else {
        console.error("Failed to fetch complaints:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className="h-100vh p-4 bg-back">
      <div className="container mx-auto">
        <div className="flex justify-center items-start gap-8 mt-2">
          <Sidebar />
          <div className="w-full md:w-3/4 mt-4 md:mt-0">
            <div className="bg-white p-8 rounded-xl bg-opacity-60">
              <div className="max-w-full">
                <div className="grid gap-6 md:gap-12">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-black ">
                        Total Complaints
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div>
                      <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-teal-300 ">
                          <tr className="text-black">
                            <th className="py-2 px-4 text-center">Sr.No.</th>
                            <th className="py-2 px-4">Type</th>
                            <th className="py-2 px-4">Hostel</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Problem Information</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y ">
                          {complaints
                            .filter(
                              (complaint) =>
                                complaint.complaint_type
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) ||
                                complaint.hostel_no
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) ||
                                complaint.complaint_status
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) ||
                                complaint.complaint_message
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) 
                                
                            )
                            .map((complaint, index) => (
                              <TableRow
                                key={index}
                                id={index + 1}
                                Type={complaint.complaint_type}
                                Hostel={complaint.hostel_no}
                                Status={complaint.complaint_status}
                                problemDescription={complaint.complaint_message}
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

function TableRow({ id, Type, Hostel, Status, problemDescription }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleReadMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <tr className="text-black bg-white rounded-lg my-4">
      <td className="py-4 px-4 text-center rounded-l-lg md:rounded-none">
        {id}
      </td>
      <td className="py-2 px-4 text-center">{Type}</td>
      <td className="py-2 px-4 text-center">{Hostel}</td>
      <td className="py-2 px-4 text-center">
        {Status ? (
          <span className="text-green-500">Resolved</span>
        ) : (
          <span className="text-red-500">Not Resolved</span>
        )}
      </td>
      <td className="py-2 px-4 text-center rounded-r-lg md:rounded-none">
        {problemDescription ? (
          showFullDescription ? (
            <div>
              <p>{problemDescription}</p>
              <button
                className="text-blue-500 hover:text-blue-700 mt-2"
                onClick={handleReadMore}
              >
                Read Less
              </button>
            </div>
          ) : (
            <div>
              <p>{`${problemDescription.slice(0, 50)}...`}</p>
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={handleReadMore}
              >
                Read More
              </button>
            </div>
          )
        ) : (
          <p>No description available</p>
        )}
      </td>
    </tr>
  );
}
