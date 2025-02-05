import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";

function TransactionStudent() {
  const [entries, setEntries] = useState([]);
  const [user_paid,setUser_paid] = useState(0);
  const [expectedCollection, setExpectedCollection] = useState(30);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentForm2, setShowPaymentForm2] = useState(false);
  const [clientToken, setClientToken] = useState(null);
  const [user, setUser] = useState(null);
  const [instance, setInstance] = useState(null);
  const [amount, setAmount] = useState(0); // Rename 'expectedAmount' to 'amount'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    T_id: "",
    name: "",
    amount: "",
    room: "",
    contactNo: "",
  });


  const handlePayment = async () => {
    try {
      setLoading(true);
      await fetchUserDues();
      const user_id = localStorage.getItem('userId');
      const hostel_no = localStorage.getItem('hostel_no');
      console.log(amount);
      const { nonce } = await instance.requestPaymentMethod();
      const response = await fetch('http://localhost:5000/api/auth/braintree/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id,
          nonce,
          amount,
          hostel_no
        })
      });
      if(response.ok)
      {
      const data = response;

      alert("Payment Successful");
      setLoading(false);
      setShowPaymentForm(false);
      fetchUserDues();
      fetchTransactions();
      }

      // console.log('Payment response:', data);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      
    }
  };

  const fetchUserDues = async () => {
    try {
      const user_id = localStorage.getItem('userId');
      const amountResponse = await fetch(`http://localhost:5000/api/auth/getuserdues/${user_id}`);
      if (amountResponse.ok) {
        const responseData = await amountResponse.json();
        const amount1 = responseData.user_dues;
        setUser_paid(responseData.user_paid);
        setAmount(amount1); // Update 'expectedAmount' state to 'amount'
      } else {
        console.error('Failed to fetch user dues:', amountResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching user dues:', error);
    }
  };

  const handlePayFees = () => {
    setShowPaymentForm(true);
  };

  const handleAlreadyPaid = () => {
    setShowPaymentForm2(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchTransactions = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming you store the userId in localStorage
      const response = await fetch(`http://localhost:5000/api/auth/transactions/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      const {transactions,user}=data;
      console.log(transactions); 
      setEntries(transactions);
      setUser(user);
      console.log(entries)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchUserDues();
    const { T_id } = formData;
    const user_id = localStorage.getItem('userId');
    const hostel_no = localStorage.getItem('hostel_no');
    console.log(amount);
    try {
      const response = await fetch('http://localhost:5000/api/auth/formtransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, T_id, amount, hostel_no })
      });
  
      if (response.ok) {
        alert('Payment submitted successfully');
        setShowPaymentForm2(false);
      setFormData({
        T_id: ""
      });
      fetchUserDues();
      fetchTransactions();

      } else {
        console.error('Failed to submit payment');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    } finally {
      
    }
  };

  const getToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/braintree/token');
      const data = await response.json();
      setClientToken(data.clientToken);
    } catch (error) {
      console.log("error in getToken" + error);
    }
  };

  
  useEffect(() => {
   

    fetchTransactions();
    fetchUserDues();
    getToken();
  }, []);

  return (
    <div className="flex flex-col bg-back">
      <div className="flex flex-col bg-back">
      {/* Your existing JSX */}

      {/* Your existing JSX */}
    </div>
      <div className="flex justify-center m-4">
        <div className="m-5 bg-yellow-300 hover:bg-yellow-400 transition duration-300 text-blue-800 rounded-md p-4 flex flex-col">
          
          <h3>Total Fees Paid</h3>
          <p className="text-4xl font-bold mr-4">₹{user_paid}</p>
        </div>
        <div className="m-5 bg-orange-300 hover:bg-orange-400 transition duration-300 text-orange-800 rounded-md p-4 flex flex-col">
          <h3>Fees To Pay</h3>
          <p className="text-4xl font-bold mr-4">₹{amount}</p>
        </div>
        
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 mr-4"
          onClick={handlePayFees}
        >
          Pay Fees
        </button>
        
        
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4"
          onClick={handleAlreadyPaid}
        >
          Already Paid
        </button>
      </div>
      {showPaymentForm2 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
          <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPaymentForm2(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Pay Fees</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="T_id"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Transaction ID
                </label>
                <input
                  type="text"
                  id="T_id"
                  name="T_id"
                  value={formData.T_id}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
             
           
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {showPaymentForm && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 shadow-lg relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setShowPaymentForm(false)}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">Pay Fees</h2>
      <form onSubmit={handleSubmit}>
        {/* Drop-in UI component */}
        {clientToken && (
          <div className="pay-drop-in-container">
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: 'vault'
                }
              }}
              onInstance={(instance) => setInstance(instance)}
            />
          </div>
        )}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-2"
          disabled={loading}
          onClick={handlePayment}
        >
          Make Payment
        </button>
        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}
      <h1 className="text-3xl font-bold leading-none text-center text-blue-800  my-5">
        Transactions
      </h1>
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100/70">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-black text-sm font-medium uppercase tracking-wider"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"
                  >
                    Status
                  </th>
                  
                  
                </tr>
              </thead>
              <tbody className="bg-slate-100 divide-y divide-gray-200">
                {entries.map((transaction, index) => (
                  <tr key={index} className="shadow-lg">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.T_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.status}
                    </td>
                    
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

export default TransactionStudent;
