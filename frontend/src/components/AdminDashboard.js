import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faExclamationCircle,
  faCheckCircle,
  faBed,
  faIndianRupee,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";
import { NavLink, Link } from "react-router-dom";

const AdminDashboard = () => {
  const [hostelsData, setHostelsData] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [feePaid,setFeePaid]=useState(5000);
  const [feeExpected,setFeeExpected]=useState(55000);
 

  useEffect(() => {
    const fetchAllHostels = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/getallhostels"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setHostelsData(data);
        } else {
          console.error("Failed to fetch all hostels");
        }
      } catch (error) {
        console.error("Error fetching all hostels:", error);
      }
    };
    const fetchAllComplaints = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/getallcomplaints"
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setComplaints(data);
        } else {
          console.error("Failed to fetch complaints");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };


    fetchAllComplaints();

    fetchAllHostels();
  }, []);
  const calculateComplaintStats = (complaints) => {
    let total = 0;
    let solved = 0;
    let unsolved = 0;

    complaints.forEach((complaint) => {
      total++;
      if (complaint.complaint_status) {
        solved++;
      } else {
        unsolved++;
      }
    });

    return { total, solved, unsolved };
  };
  let { total, solved, unsolved } = calculateComplaintStats(complaints);

  console.log(total + "j" + solved + "d" + unsolved);
  const calculateOccupancyPercentage = (occupiedRooms, total_rooms) => {
    return ((occupiedRooms / total_rooms) * 100).toFixed(2);
  };

  const occupancyData = hostelsData.map((hostel, index) => ({
    id: index + 1,
    name: hostel.hostel_name,
    hostel_no: hostel.hostel_no,
    percentage: calculateOccupancyPercentage(
      hostel.occupied_rooms,
      hostel.total_rooms
    ),
  }));

  console.log("Occupancy Data:", occupancyData);

  const getColorForPercentage = (percentage) => {
    if (percentage < 50) {
      return "#4fd1c5";
    } else if (percentage < 80) {
      return "#fde047";
    } else {
      return "#e53e3e";
    }
  };

  return (
    <div className="h-100vh p-4 bg-back">
      <div className="container mx-auto">
        <div className="flex justify-center items-start gap-8 mt-2">
          <Sidebar />

          <div className="w-full md:w-5/6 bg-white p-8 rounded-xl bg-opacity-60">
            <div className="flex justify-center">
              <h1 className="text-gray-800 text-2xl font-bold item-center mb-4 mt-0">
                WELCOME TO HMS MANAGING DESK !!
              </h1>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <h2 className="text-black text-xl font-semibold item-center mb-4 mt-0">
                Hostels Occupancy Analysis
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-6 cursor-pointer">
                {occupancyData.map((hostel) => (
                  <div
                    key={hostel.id}
                    className="bg-admin p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col"
                  >
                    <NavLink
                      to={`/admindashboard/${hostel.hostel_no}`} // Include the id parameter in the URL
                      activeClassName="text-indigo-600"
                      className="text-white flex flex-col items-center justify-center"
                    >
                      <div className="mb-2">
                        <p className="text-black font-semibold">
                          {hostel.name}
                        </p>
                      </div>
                      <div className="w-32 h-32 ">
                        {" "}
                        {/* Increased size */}
                        <CircularProgressbar
                          value={hostel.percentage}
                          text={`${hostel.percentage}%`}
                          styles={buildStyles({
                            pathColor: getColorForPercentage(hostel.percentage),
                            textColor: "black",
                            trailColor: "#333",
                            strokeWidth: 10, // Increased from 4 to 10
                          })}
                          strokeWidth={10} // Increased from 6 to 10
                        />
                      </div>
                      <div className="mb-2">
                        <p className="text-black text-bold">
                          {hostel.hostel_no}
                        </p>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4  ">
              <h2 className="text-xl text-black font-semibold mb-4">
                Fee Details
              </h2>
              <h3 className="text-lg font-semibold mb-2  px-12 text-black">
                Collected Fee
              </h3>
              <div className="flex items-center space-x-40 px-7">
                {/* Expected Fee */}

                <div className="w-32 h-32 relative">
                  <CircularProgressbar
                    value={50}
                    text={"50%"}
                    styles={buildStyles({
                      pathColor: "#fde047",
                      textColor: "black",
                      trailColor: "#e53e3e",
                      strokeWidth: 8,
                    })}
                    strokeWidth={8}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <i className="fas fa-coins fa-lg text-yellow-500"></i>
                  </div>
                </div>
                {/* Fee Details */}
                <div className="flex space-x-8">
                  <div className="flex flex-col bg-blue-300 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      <FontAwesomeIcon icon={faIndianRupee} className="mr-2" />
                      Expected Fee
                    </h3>
                    <p className="text-center">{feeExpected}</p>
                  </div>
                  <div className="flex flex-col bg-green-300 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      <FontAwesomeIcon icon={faIndianRupee} className="mr-2" />
                      Collected Fee
                    </h3>
                    <p className="text-center">{feePaid}</p>
                  </div>
                  <div className="flex flex-col bg-red-400 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      <FontAwesomeIcon icon={faIndianRupee} className="mr-2" />
                      Remaining Fee
                    </h3>
                    <p className="text-center">{feeExpected-feePaid}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 ">
              <h2 className="text-xl text-black font-semibold mb-4">
                Complaints
              </h2>
              <div className="flex items-center">
                <div
                  className="h-14"
                  style={{
                    width: `${total}%`,
                    backgroundColor: "#4fd1c5",
                    borderTopLeftRadius: "0.375rem",
                    borderBottomLeftRadius: "0.375rem",
                  }}
                ></div>
                <div
                  className="h-14"
                  style={{
                    // width: `${(20/50}%`,
                    width: `${(10/total)}%`,
                    backgroundColor: "#fde047",
                  }}
                ></div>
                <div className="ml-4 text-black flex flex-row space-x-8">
                  <div className="flex justify-between space-x-20">
                    <div className="flex flex-col bg-blue-300 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                      <p>Total Complaints</p>
                      <p className="text-center">{total}</p>
                    </div>
                    <div className="flex flex-col bg-green-300 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                      <p>Resolved Complaints</p>
                      <p className="text-center">{solved}</p>
                    </div>
                    <div className="flex flex-col bg-red-400 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                      <p>Pending Complaints</p>
                      <p className="text-center">{unsolved}</p>
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
};

export default AdminDashboard;



