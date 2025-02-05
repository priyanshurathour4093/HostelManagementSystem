import React, { useState, useEffect } from "react";
import NavRules from "./NavRules";

export default function MessMenu() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [menuData, setMenuData] = useState([]);
  const [todayMenuIndex, setTodayMenuIndex] = useState(-1);
  const [isOnLeave, setIsOnLeave] = useState(
    localStorage.getItem("currently_present") === "true"
  );
  const [leaveStartDate, setLeaveStartDate] = useState(null);
  const [leaveEndDate, setLeaveEndDate] = useState(null);
  const [leaveMessage, setLeaveMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const hostel_no = localStorage.getItem("hostel_no");

  useEffect(() => {
    fetchMenuData();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  const fetchMenuData = () => {
    fetch("http://localhost:5000/api/auth/getmenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostel_no: hostel_no,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data);
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const today = daysOfWeek[currentTime.getDay()];
        const todayMenu = data.findIndex((menu) => menu.day === today);
        setTodayMenuIndex(todayMenu);
        
      })
      .catch((error) => console.error("Error fetching menu:", error));
  };

  const handleRebateClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/rebate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          hostel_no: hostel_no,
          isOnLeave: !isOnLeave,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to process rebate.");
      }

      setIsOnLeave(!isOnLeave);
      const updatedLeaveStatus = !isOnLeave;
      localStorage.setItem("currently_present", updatedLeaveStatus ? "true" : "false");

      const currentHour = currentTime.getHours();
      if (!isOnLeave) {
        if (currentHour < 7) {
          setLeaveStartDate(currentTime);
          setLeaveEndDate(null);
          setLeaveMessage(
            `You are on leave from ${currentTime.toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}`
          );
        } else {
          const nextDay = new Date(currentTime);
          nextDay.setDate(nextDay.getDate() + 1);
          nextDay.setHours(0, 0, 0, 0);
          setLeaveStartDate(nextDay);
          setLeaveEndDate(null);
          setLeaveMessage(
            `You are on leave from ${nextDay.toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}`
          );
        }
      } else {
        if (leaveEndDate && leaveEndDate < leaveStartDate) {
          setLeaveMessage("Your rebate is cancelled.");
        } else {
          setLeaveEndDate(currentTime);
          setLeaveMessage(
            `You were on leave from ${leaveStartDate.toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })} `
            // to ${currentTime.toLocaleString("en-US", {
            //   weekday: "long",
            //   month: "long",
            //   day: "numeric",
            //   hour: "numeric",
            //   minute: "numeric",
            //   second: "numeric",
            // })}
            // `
          );
        }
      }
    } catch (error) {
      console.error("Error processing rebate:", error);
    }
  };

  return (
    <div className="bg-back flex relative">
      <NavRules />
      <div className="absolute top-4 right-4 text-blue-800 font-bold">
        <span className="text-lg">
          {currentTime.toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="flex flex-col gap-2 py-6">
          <h1 className="text-3xl font-bold leading-none text-center text-blue-800">
            Mess Menu
          </h1>
          <div className="flex justify-end">
            <button
              className={`${
                !isOnLeave ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"
              } text-white transition duration-300 py-2 px-4 rounded-xl`}
              onClick={handleRebateClick}
            >
              {!isOnLeave ? "Cancel Rebate" : "Take Rebate"}
            </button>
          </div>
          {leaveMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
              <span className="block sm:inline">{leaveMessage}</span>
            </div>
          )}
          <div className="overflow-auto">
            <table className="w-full text-sm border divide-y divide-gray-200 shadow-lg rounded-lg">
              <thead>
                <tr className="text-gray-500 bg-gray-100/50">
                  <th className="px-4 py-2 first:pl-2 text-black text-md font-bold">
                    Day
                  </th>
                  <th className="px-4 py-2 text-black font-bold">Breakfast</th>
                  <th className="px-4 py-2 text-black font-bold">Lunch</th>
                  <th className="px-4 py-2 last:pr-2 text-black font-bold">
                    Dinner
                  </th>
                  {/* <th className="px-4 py-2 last:pr-2 text-black font-bold">
                    Extras
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {menuData.map((item, index) => (
                  <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-back" : "bg-gray-200"
                  } ${index === todayMenuIndex ? "bg-yellow-200" : ""}`}
                >

                    <td className="font-medium px-4 py-4 first:pl-4 relative">
                      {item.day}
                      {index === todayMenuIndex && (
                        <span className="absolute top-0 left-0 bg-purple-500 text-white px-2 py-1 rounded-tr-md rounded-bl-md">
                          Today
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">{item.breakfast}</td>
                    <td className="px-4 py-4">{item.lunch}</td>
                    <td className="px-4 py-4 last:pr-4">{item.dinner}</td>
                    {/* <td className="px-4 py-4 last:pr-4">
                      <div>
                        <h6>Lunch:</h6>
                        <p className="inline">{item.lunch_extra}</p>
                      </div>
                      <div>
                        <h6>Dinner:</h6>
                        <p className="inline">{item.dinner_extra}</p>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}



