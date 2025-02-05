import React, { useState, useEffect } from "react";
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const hostel_no = localStorage.getItem('hostel_no');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getannouncements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hostel_no }),
        });
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          console.error('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchAnnouncements();

    return () => clearInterval(intervalId);
  }, [hostel_no]);

  const handleSeeMore = () => {
    setVisibleAnnouncements(prevCount => prevCount + 5);
  };

  return (
    <div className="bg-back relative">
      <div className="absolute top-4 right-4  text-blue-800 font-bold ">
        <span className="text-lg">
          {currentTime.toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <main className="mx-auto grid max-w-7xl gap-6 lg:gap-10 px-4 lg:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col mt-6 gap-2 text-center">
            
            <h1 className="text-2xl font-bold text-blue-800  text-center tracking-tighter sm:text-4xl">
              Hostel Announcements
            </h1>
          </div>
        </div>
        <div className="grid gap-4 max-w-lg max-l-lg sm:max-w-lg md:max-w-500 border -black  lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto bg-white p-10 rounded-md overflow-y-scroll h-screen mb-6 scrollbar-hidden">
          <div className="mt--1 flex items-center">
            <h5 className="text-black text-2xl font-bold ">
            <FontAwesomeIcon
              icon={faBullhorn}
              className="text-yellow-600 text-2xl  mr-2"
            /> Latest Hostel News
            </h5>
          </div>
          {announcements.slice(0, visibleAnnouncements).map((announcement, index) => (
            <div
              key={index}
              className="flex border border-5522a3  bg-gray-200  rounded-lg shadow-lg transition-transform duration-300 ease-in-out drop-shadow-md"
            >
              <div className="flex flex-col justify-center px-4 py-2 bg-gray-300  rounded-l-lg">
                <div className="text-gray-600 ">
                  <div className="text-sm font-bold">
                    {new Date(announcement.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 flex-1">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl text-gray-500 font-bold">{announcement.title}</h4>
                  <p className="text-sm text-gray-500">
                    by {announcement.user_name}
                  </p>
                </div>
                <p className="text-base text-gray-500 ">
                  {announcement.announcement_message}
                </p>
              </div>
            </div>
          ))}
          {visibleAnnouncements < announcements.length && (
            <p
              className="text-blue-700 font-bold cursor-pointer"
              onClick={handleSeeMore}
            >
              Read More
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Announcement;
