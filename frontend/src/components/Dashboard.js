import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faSadTear,
  faFileAlt,
  faUsersCog,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


import Sidebardashboard from "./sidebardashboard";

function Dashboard() {
  const { hostel_no } = useParams();
  const [loading, setLoading] = useState(true);
  const [hostelData, setHostelData] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [collectedFee, setTotalCollection] = useState(30);
  const [expectedFee, setExpectedCollection] = useState(30);
  const [showInputBox, setShowInputBox] = useState(false);
  const [dueInput, setDueInput] = useState("");

  const handleAddDueClick = () => {
    setShowInputBox(true);
  };

  const handleDueInputChange = (e) => {
    setDueInput(e.target.value);
  };

  const handleSubmitDue = () => {
    // Handle submit due logic here
    console.log("Submitted due:", dueInput);
    setDueInput("");
    setShowInputBox(false);
  };

  function HostelWorkers() {
   

    let workersPresent;

    switch (hostel_no) {
        case 'H1':
            workersPresent = 35;
            break;
        case 'H3':
            workersPresent = 40;
            break;
        case 'H10':
            workersPresent = 50;
            break;
        
    }

    return (
        <div>
           
           <p className="text-xl text-black mt-4 mx-4 px-auto font-semibold">Total Workers : <span style={{ color: 'blue' }}>{workersPresent}</span></p>
        </div>
        
    );
}

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/gethostel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hostel_no }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setHostelData(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch hostel data");
        }
      } catch (error) {
        console.error("Error fetching hostel data:", error);
      }
    };

    const fetchCollection=async()=>
    {
      
      const response = await fetch(`http://localhost:5000/api/auth/gethostelaccount/${hostel_no}`);
      if(response.ok)
      {
        const data=await response.json();
        // console.log(data);
        setTotalCollection(data.hostel_paid);
        setExpectedCollection(data.hostel_dues);
      }
  
    }
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getcomplaint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hostel_no }),
        });
        if (response.ok) {
          const data = await response.json();
          setComplaints(data);
          console.log(complaints)
        } else {
          console.error("Failed to fetch complaints");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchHostelData();
    fetchComplaints();
    fetchCollection();
  }, [hostel_no]);

  const calculateComplaintStats = (complaints) => {
    let total = 0;
    let solved = 0;
    let unsolved = 0;
  
    complaints.forEach(complaint => {
      console.log("complaint_status"+complaint.complaint_status)
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
  
  console.log(total+"j"+solved+"d"+unsolved)
  const calculateOccupancyPercentage = (occupiedRooms, total_rooms) => {
    return ((occupiedRooms / total_rooms) * 100).toFixed(2);
};
console.log("hostelData")
console.log(hostelData)

const occupancyData = {
    name: hostelData.hostel_name,
    hostel_no:hostelData.hostel_no,
    percentage: calculateOccupancyPercentage(hostelData.occupied_rooms, hostelData.total_rooms),
    emptyPercentage: (100 - (hostelData.occupied_rooms / hostelData.total_rooms) * 100).toFixed(2),
  };
// const occupancyData=[];

console.log('Occupancy Data:', occupancyData);

  const getColorForPercentage = (percentage) => {
    if (percentage < 50) {
      return '#4fd1c5';
    } else if (percentage < 80) {
      return '#fde047';
    } else {
      return '#e53e3e';
    }
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    // <div>hey</div>
    <div className="h-100vh p-4 bg-back">
      <div className="container mx-auto">
        <div className="flex justify-center items-start gap-8 mt-2">
          <Sidebardashboard hostel_no={hostel_no}/>
         
          <div className="w-full md:w-5/6 bg-white p-8 rounded-xl bg-opacity-60">
            <div className="flex justify-center">
              <h1 className="text-black text-2xl font-bold item-center mb-4 mt-0">
                Welcome back to {hostelData.hostel_no} !!
              </h1>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <h2 className="text-black text-xl font-semibold item-center mb-4 mt-0">
                Quick Insights{" "}
              </h2>
              <div className="bg-white px-7">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6 cursor-pointer">
                  {/* Occupancy Rate */}
                  <div className="bg-admin p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 text-black mx-auto">
                      Occupancy Rate
                    </h2>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32">
                        <CircularProgressbar
                          value={occupancyData.percentage}
                          text={`${occupancyData.percentage}%`}
                          styles={buildStyles({
                            pathColor: "#4fd1c5",
                            textColor: "black",
                            trailColor: "#333",
                            strokeWidth: 10,
                          })}
                          strokeWidth={10}
                        />
                      </div>
                    </div>
                    
                    
                    <p className="text-md text-black mt-2 mx-auto ">
                      Occupied rooms : {hostelData.occupied_rooms}
                
                    </p>
                  </div>
                  {/* Present Students */}
                  <div className="bg-admin p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                    <h2 className="text-xl text-black font-semibold mb-4 mx-auto ">
                      Present Students
                    </h2>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32">
                        <CircularProgressbar
                          value={Math.min((hostelData.students_present / hostelData.student_capacity) * 100, 100)}
                          text={`${((hostelData.students_present / hostelData.student_capacity) * 100-13.67).toFixed(2)}%`}
                          styles={buildStyles({
                            pathColor: "#fde047",
                            textColor: "black",
                            trailColor: "#333",
                            strokeWidth: 10,
                            fontWeight: "bold",
                          })}
                          strokeWidth={10}
                        />
                      </div>
                    </div>
                    <p className="text-md text-black mt-2 mx-auto">
                      Students present : {hostelData.students_present}
                    </p>
                  </div>
                  <div className="bg-admin p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                    <h2 className="text-xl text-black font-semibold mb-4 mx-auto ">
                      Quantitative Analysis
                    </h2>
                    <div className="flex items-center justify-center">
                      
                    </div>
                    <p className="text-xl text-black mt-4 mx-auto font-semibold">
                      Total Rooms : <span style={{ color: 'blue' }}>{ hostelData.total_rooms}</span>
                    </p>
                    <p className="text-xl text-black mt-4 mx-auto font-semibold">
                      Total Students : <span style={{ color: 'blue' }}>{hostelData.student_capacity}</span>
                    </p>
                    
                    <HostelWorkers />
                  </div>
                  
                  
                  
                  {/* Additional Quick Insights */}
                  {/* <div className="bg-admin p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                    <h2 className="text-xl text-black font-semibold mb-4 mx-auto ">
                      Additional Quick Insights
                    </h2>
                    <div className="flex items-center justify-center">
                      Content Here
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-xl p-4">
              <h2 className="text-xl text-black font-semibold mb-4">
                Complaints
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {/* Total Complaints */}
                <div className="bg-blue-300 p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                  <h3 className="text-lg text-black font-semibold mb-2">
                    Total Complaints:
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-black">
                      {total}
                    </p>
                    <span className="text-sm text-black">
                      +10% from last month
                    </span>
                  </div>
                </div>
                {/* Solved Complaints */}
                <div className="bg-green-300 p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Solved Complaints
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-black">
                      {solved}
                    </p>
                    <span className="text-sm text-black">
                      -5% from last month
                    </span>
                  </div>
                </div>
                {/* Pending Complaints */}
                <div className="bg-red-400 p-6 rounded-lg hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Pending Complaints
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-black">
                      {unsolved}
                    </p>
                    <span className="text-sm text-black">
                      +20% from last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-xl p-4 ">
              <h2 className="text-xl text-black font-semibold mb-4">
                Fee Details
              </h2>
              <h3 className="text-lg font-semibold mb-2  px-12 text-black">
                Collected Fee
              </h3>
              <div className="flex items-center space-x-40 px-10">
                {/* Expected Fee */}
                <div className="w-32 h-32 relative">
                  <CircularProgressbar
                    value={
                      (collectedFee /expectedFee) * 100
                    }
                    text={`${Math.floor(
                      (collectedFee / expectedFee) * 100
                    )}%`}
                    styles={buildStyles({
                      pathColor: "#fde047",
                      textColor: "black",
                      trailColor: "#333",
                      strokeWidth: 10,
                    })}
                    strokeWidth={10}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <i className="fas fa-coins fa-lg text-yellow-500"></i>
                  </div>
                </div>
                {/* Fee Details */}
                <div className="flex space-x-8">
                  <div className="flex flex-col bg-blue-300 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      Expected Fee
                    </h3>
                    <p className="text-center">{expectedFee}</p>
                  </div>
                  <div className="flex flex-col bg-green-300 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      Collected Fee
                    </h3>
                    <p className="text-center">{collectedFee}</p>
                  </div>
                  <div className="flex flex-col bg-red-400 px-4 py-2 rounded-xl hover:shadow-2xl hover:bg-teal-300 transition ease-in-out duration-800">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      Remaining Fee
                    </h3>
                    <p className="text-center">{expectedFee-collectedFee}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                </div>
       

              
            </div>
           
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
