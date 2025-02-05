import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faSadTear,
  faFileAlt,
  faUsersCog,
  faSearch,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Sidebardashboard from "./sidebardashboard";
import { useParams } from "react-router-dom";

export default function Student() {
  const { hostel_no } = useParams();
  const [studentsData, setStudentsData] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/getallstudent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStudentsData(data); // Update state with fetched data
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id, student) => {
    setEditingRowId(id);
    setEditingData(student);
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/updatestudent/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingData),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setStudentsData((prevData) =>
          prevData.map((student) => (student.id === id ? updatedData : student))
        );
        setEditingRowId(null);
        setEditingData({});
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDataUpdate = (id, updatedData) => {
    setStudentsData((prevData) =>
      prevData.map((student) => (student.id === id ? updatedData : student))
    );
  };

  useEffect(() => {
    fetchStudent();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

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
                        Student Information
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
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-best ">
                          <tr className="text-black">
                            <th className="py-2 px-4 text-center ">Sr.No.</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Roll.no</th>
                            <th className="py-2 px-4">Hostel</th>
                            <th className="py-2 px-4">Room.no</th>
                            <th className="py-2 px-4">Edit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y ">
                          {studentsData
                            .filter(
                              (student) =>
                                student.hostel_no === `${hostel_no}` &&
                                (student.full_name
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) ||
                                  student.email
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  student.roll_no
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  student.room_number
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  student.hostel_no
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()))
                            )
                            .map((student, index) => (
                              !student.admin&&<TableRow
                                key={index}
                                id={index }
                                name={student.full_name}
                                email={student.email}
                                Roll={student.roll_no}
                                Room={student.room_number}
                                hostel_no={student.hostel_no}
                                handleDataUpdate={handleDataUpdate}
                                userId={student._id}
                                fetchStudent={fetchStudent}
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

function TableRow({
  id,
  name,
  email,
  Roll,
  Room,
  hostel_no,
  handleDataUpdate,
  userId,
  fetchStudent,
}) {
  // ...
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});

  const isEditing = editingRowId === id;

  const handleEditClick = () => {
    setEditingRowId(id);
    setEditingData({ name, email, Roll, Room, hostel_no, userId });
  };
  const handleSaveClick = async () => {
    try {
      // console.log("kjsd" + name + email + Roll + Room + "id" + userId);
      const response = await fetch(
        `http://localhost:5000/api/auth/updatestudent`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingData),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        // Update the state with the updated data in the parent component
        setEditingRowId(null);
        setEditingData({});
        // Call a function in the parent component to update the studentsData state
        handleDataUpdate(id, updatedData);
        fetchStudent();
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return isEditing ? (
    <tr className="text-black bg-white rounded-lg my-4">
      <td className="py-4 px-4 text-center rounded-l-lg md:rounded-none">
        {id}
      </td>
      <td className="py-4 px-4 text-center">
        <input
          type="text"
          name="name"
          value={editingData.name}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </td>
      <td className="py-4 px-4 text-center">
        <input
          type="text"
          name="email"
          value={editingData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </td>
      <td className="py-4 px-4 text-center">
        <input
          type="text"
          name="Roll"
          value={editingData.Roll}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </td>
      <td className="py-4 px-4 text-center">
        <input
          type="text"
          name="hostel_no"
          value={editingData.hostel_no}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </td>
      <td className="py-4 px-4 text-center">
        <input
          type="text"
          name="Room"
          value={editingData.Room}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </td>
      <td className="py-4 px-4 text-center rounded-r-lg md:rounded-none">
        <button
          className="flex items-center justify-center text-green-700 hover:text-green-700"
          onClick={handleSaveClick}
        >
          <FontAwesomeIcon icon={faSave} className="h-5 w-5 mr-1" />
          Save
        </button>
      </td>
    </tr>
  ) : (
    <tr className="text-black bg-white rounded-lg my-4">
      <td className="py-4 px-4 text-center rounded-l-lg md:rounded-none">
        {id}
      </td>
      <td className="py-4 px-4 text-center">{name}</td>
      <td className="py-4 px-4 text-center">{email}</td>
      <td className="py-4 px-4 text-center">{Roll}</td>
      <td className="py-4 px-4 text-center">{hostel_no}</td>
      <td className="py-4 px-4 text-center">{Room}</td>
      <td className="py-4 px-4 text-center rounded-r-lg md:rounded-none">
        <button
          className="flex items-center justify-center text-blue-700 hover:text-blue-700"
          onClick={handleEditClick}
        >
          <FontAwesomeIcon icon={faEdit} className="h-5 w-5 mr-1" />
          Edit
        </button>
      </td>
    </tr>
  );
}
