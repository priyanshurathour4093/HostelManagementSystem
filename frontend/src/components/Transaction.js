import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { useParams } from "react-router-dom";
import Sidebardashboard from "./sidebardashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

function Transaction() {
  const hostel_no="H10";
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [totalTransactions, setTotalTransactions] = useState(entries.length);
  const [totalCollection, setTotalCollection] = useState(30);
  const [expectedCollection, setExpectedCollection] = useState(30);
  const [searchTxId, setSearchTxId] = useState("");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/gettransactionshostel`
        );
        if (response.ok) {
          const data = await response.json();
          const { transactions, users } = data;

          // Map transactions with user details
          const entriesWithUsers = transactions.map((transaction) => {
            // Find the corresponding user details for the transaction
            const user = users.find((user) => user._id === transaction.user_id);
            // Assuming the user details contain the full name, room number, and email
            return {
              T_id: transaction.T_id,
              name: user.full_name,
              amount: transaction.amount,
              date: transaction.createdAt,
              remark: transaction.status,
              room: user.room_number,
              contact_email: user.email,
            };
          });
          // console.log(data.users);
          
          // Map transactions with user details
          // console.log(entriesWithUsers);
          setEntries(entriesWithUsers);
          setTotalTransactions(data.transactions.length);
          // Calculate total collection and expected collection if needed
        } else {
          throw new Error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
    fetchCollection();
  }, [hostel_no]);
  const fetchCollection=async()=>
  {
    
    const response = await fetch(`http://localhost:5000/api/auth/gethostelaccount/${hostel_no}`);
    if(response.ok)
    {
      const data=await response.json();
      console.log(data);
      setTotalCollection(data.hostel_paid);
      setExpectedCollection(data.hostel_dues);
    }

  }
  const handleVerify = async (index) => {
    try {
      const updatedEntries = [...entries];
      updatedEntries[index].remark = 'Verified';
      
      setEntries(updatedEntries);
  
      const transactionId = entries[index].T_id;
      const status = 'Verified'; // Assuming 'deleted' is the status to be sent
      // console.log(transactionId);
      const response = await fetch('http://localhost:5000/api/auth/updatetransactionstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ T_id: transactionId, status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update transaction status');
      }
  
      // Transaction status updated successfully
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
    fetchCollection()
  };
  

  const handleDelete = async (index) => {
    try {
      const updatedEntries = [...entries];
      updatedEntries[index].remark = 'Failed';
      
      setEntries(updatedEntries);
  
      const transactionId = entries[index].T_id;
      const status = 'Failed'; // Assuming 'deleted' is the status to be sent
  
      const response = await fetch('http://localhost:5000/api/auth/updatetransactionstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ T_id: transactionId, status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update transaction status');
      }
  
      // Transaction status updated successfully
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
    fetchCollection();
  };
  

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
                        Transactions
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
                        <thead className="bg-teal-300 ">
                          <tr className="text-black">
                            <th className="py-2 px-4 text-center">
                              Transaction ID
                            </th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Status</th>
                            
              
                            <th className="py-2 px-4">Email.</th>
                            <th className="py-2 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                        {entries
  .filter(
    (entry) =>
      entry.T_id.toString().includes(searchQuery) ||
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.amount.toString().includes(searchQuery) ||
      entry.date.toString().includes(searchQuery) ||
      entry.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.room.toString().includes(searchQuery) ||
      entry.contact_email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map((entry, index) => (
    <TableRow
      key={index}
      entry={entry}
      index={index}
      handleVerify={handleVerify}
      handleDelete={handleDelete}
    />
  ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-4">
              <div className="m-5 bg-teal-300 hover:bg-teal-400 transition duration-300 text-teal-800 rounded-md p-4 flex flex-col">
                <h3>Total Transactions</h3>
                <p className="text-4xl font-bold mr-4">{totalTransactions}</p>
              </div>
              <div className="m-5 bg-yellow-300 hover:bg-yellow-400 transition duration-300 text-blue-800 rounded-md p-4 flex flex-col">
                <h3>Total Collection</h3>
                <p className="text-4xl font-bold mr-4">₹{totalCollection}</p>
              </div>
              <div className="m-5 bg-orange-300 hover:bg-orange-400 transition duration-300 text-orange-800 rounded-md p-4 flex flex-col">
                <h3>Expected Collection</h3>
                <p className="text-4xl font-bold mr-4">₹{expectedCollection}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ entry, index, handleVerify, handleDelete }) {
  return (
    <tr
    className={`text-black bg-white rounded-lg my-4 ${
      entry.isVerified ? "bg-green-200" : entry.isDeleted ? "bg-red-200" : ""
    }`}
    >
      <td className="py-4 px-4 text-center rounded-l-lg md:rounded-none">
        {entry.T_id}
      </td>
      <td className="py-4 px-2 text-center">{entry.name}</td>
      <td className="py-4 px-4 text-center">₹{entry.amount}</td>
      <td className="py-4 px-4 text-center">{new Date(entry.date).toLocaleDateString()}</td>
      <td className="py-4 px-4 text-center">
      {entry.remark === "Verified" ? (
          <span className="text-green-500">Verified</span>
        ) : entry.remark==="Not Verified" ? (
          <span className="text-black"> Not Verified</span>
        ) : entry.remark === "Failed" ? (
          <span className="text-red-500">Failed</span>
        ) : (
          ""
        )}
      </td>
    
      <td className="py-4 px-4 text-center">{entry.contact_email}</td>
      <td className="py-4 px-4 text-center rounded-r-lg md:rounded-none">
        {!entry.isVerified && !entry.isDeleted && (
          <div className="flex justify-center">
            <button
              className="flex items-center justify-center text-green-700 hover:text-green-700 mr-2"
              onClick={() => handleVerify(index)}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 w-5 mr-1 text-green-500 hover:text-green-700"
              />
              
            </button>
            <button
              className="flex items-center justify-center text-red-700 hover:text-red-700"
              onClick={() => handleDelete(index)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="h-5 w-5 mr-1 text-red-500 hover:text-red-700"
              />
              
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default Transaction;
