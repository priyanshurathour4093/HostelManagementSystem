import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Contacts({ changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isJoin, setIsJoin] = useState(true);
  const [userGroups, setUserGroups] = useState([]);
  const [notJoinedUserGroups, setNotJoinedUserGroups] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch groups
      const responseGroups = await fetch("http://localhost:5000/api/auth/getgroup");
      if (!responseGroups.ok) {
        throw new Error("Failed to fetch groups");
      }
      const groupsData = await responseGroups.json();
      setGroups(groupsData);

      // Fetch user groups
      const userId = localStorage.getItem("userId");
      const responseUserGroups = await fetch(`http://localhost:5000/api/auth/getusergroups/${userId}`);
      if (!responseUserGroups.ok) {
        throw new Error("Failed to fetch user groups");
      }
      const userGroupsData = await responseUserGroups.json();
      setUserGroups(userGroupsData);

      // Calculate not joined user groups
      const notJoined = groupsData.filter(group => !userGroupsData.some(userGroup => userGroup._id === group._id));
      setNotJoinedUserGroups(notJoined);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeCurrentChat = (index, group, e) => {
    e.preventDefault();
    setCurrentSelected(index);
    changeChat(group);
  };

  const handleJoin = async (group_id) => {
    const user_id = localStorage.getItem('userId');

    // Define the data you want to send in the request body
    const data = {
      user_id: user_id,
      group_id: group_id
    };

    // Make a POST request to the server
    try {
      const response = await fetch('http://localhost:5000/api/auth/joingroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = () => {
    setIsJoin(false);
  };

  return (
    <div className=" ">
      <div className="grid grid-rows-10-85-5 overflow-hidden w-83 ">
        <div className="flex items-center justify-gap-2 p-4 bg-indigo-900 ">
          <img
            src="https://avatar.iran.liara.run/public/boy?username=1"
            alt="logo"
            className="h-12"
          />
          <h3 className="text-white uppercase ml-4">CHAT it</h3>
        </div>
        <div className="overflow-auto max-h-[78vh] scrollbar-thin scrollbar-thumb-white  bg-white">
          {userGroups.map((group, index) => (
            <div
              key={group._id}
              className={`flex items-center justify-between py-4 px-4 cursor-pointer transition-colors duration-500 border-r border-y border-indigo-800    ${index === currentSelected ? "bg-indigo-400" : "bg-slate-200 "
                }`}
              onClick={(e) => changeCurrentChat(index, group, e)}
            >
              <div className="flex items-start gap-4 ">
                <div className="w-14 h-14">
                  <img src={`https://avatar.iran.liara.run/public/${group.group_id}`} alt="" className="w-full h-full rounded-full" />
                </div>
                <h3 className="text-black">{group.group_name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-8 left-8">
          {isJoin ? (
            <button onClick={handleShowMore} className="bg-blue-500  hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 items-center my-3 mx-3">
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              <span>Show Not Joined Groups</span>
            </button>
          ) : (
            <div className="overflow-auto max-h-[78vh] scrollbar-thin scrollbar-thumb-white  bg-white rounded-lg border border-gray-300 shadow-md">
              <p className="px-4 py-2 text-gray-700 font-semibold">Not Joined Groups</p>
              {notJoinedUserGroups.map((group, index) => (
                <div key={group._id} className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12">
                      <img src={`https://avatar.iran.liara.run/public/${group.group_id}`} alt="" className="w-full h-full rounded-full" />
                    </div>
                    <h3 className="text-black">{group.group_name}</h3>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600" onClick={(e) => { handleJoin(group.group_id) }}>Join Now</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
