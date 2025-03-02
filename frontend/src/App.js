import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Announcement from "./components/Announcement";
import SignUp from "./components/Signuppage";
import Login from "./components/Loginpage";
import RoomList from "./components/RoomList";
import Contact from "./components/Contact";
import Complaints from "./components/Complaints";
import Workers from "./components/Workers";
import FeeDetails from "./components/FeeDetails";
import Footer from "./components/Footer";
import ChatRoom from "./components/Chatrooms";
import HomePage from "./components/Homepage";
import Student from "./components/Student";
import Rules from "./components/Rules";
import Guest from "./components/Guest";
import General from "./components/General";
import Mess from "./components/Mess";
import Ragging from "./components/Ragging";
import Maintenance from "./components/Maintenance";
import Chatgroup from "./components/Chatgroup";
import AdminDashboard from "./components/AdminDashboard";
import Chat from "./components/chat/Chat";
import MessMenu from "./components/MessMenu";
import Transaction from "./components/Transaction";
import TransactionStudent from "./components/TransactionStudent";
import Studentdasboard from "./components/studentdashboard";
import Complaintsdashboard from "./components/Complaintsdashboard";
import FeeDetailsdashboard from "./components/FeeDetailsdashboard";
import Workersdashboard from "./components/Workersdasboard";
import Transactiondashboard from "./components/Transactiondashboard";
import Signup2 from "./components/signuppage2";
import Signup3 from "./components/signuppage3";
import Forgotpassword from "./components/forgotpassword";
import ResetPassword from "./components/Resetpassword";
import ProfileDropdown from "./components/ProfileDropdown";

function App() {
  const contactsSectionRef = useRef(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseType, setResponseType] = useState("error");

  const scrollToContacts = () => {
    if (contactsSectionRef.current) {
      contactsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSubmit = async (formData) => {
    // event.preventDefault();
    const { email, password } = formData;

    console.log("Submitted with values:", email, password);
    const jsonData = JSON.stringify({
      email,
      password,
    });
    console.log(jsonData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonData,
        credentials: "include",
      });

      response.text().then((text) => {
        setResponseMsg(text);
        console.log(text);
      });
      if (response.ok) {
        setResponseType("success");
        const jwtCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwt="));

        if (jwtCookie) {
          const jwtToken = jwtCookie.split("=")[1];
          console.log("JWT Token:", jwtToken);
          // Check if the user is admin

          const extractValuesFromJWT = (jwtToken) => {
            try {
              const tokenParts = jwtToken.split(".");
              if (tokenParts.length !== 3) {
                throw new Error("Invalid JWT token format");
              }
              const base64Payload = tokenParts[1];
              const decodedPayload = atob(base64Payload);
              return JSON.parse(decodedPayload);
            } catch (error) {
              console.error("Error decoding JWT:", error.message);
              return null;
            }
          };
          // Example usage:
          const payload = extractValuesFromJWT(jwtToken);

          // console.log("Decoded Payload:", payload);
          // console.log("Email:", payload.email);
          // console.log("Is admin:", payload.admin);
          // console.log("Is admin:", payload.userId);
          localStorage.setItem("cookie", jwtCookie);
          localStorage.setItem("email", payload.email); // Changed "Email" to lowercase for consistency
          localStorage.setItem("admin", payload.admin);
          localStorage.setItem("super_admin", payload.super_admin); // Changed to match API response
          localStorage.setItem("hostel_no", payload.hostel_no);
          localStorage.setItem("user_id", payload.userId); // Changed "userId" to snake_case
          localStorage.setItem("full_name", payload.full_name);
          localStorage.setItem("currently_present", payload.present);
          console.log(localStorage.getItem("admin"));
          console.log(localStorage.getItem("hostel_no"));
          const isAdmin = localStorage.getItem("admin") === "true";
          const isSuperAdmin = localStorage.getItem("superadmin") === "true";
          const hostel_no = localStorage.getItem("hostel_no");
          console.log(isSuperAdmin);
          if (isSuperAdmin) {
            // Redirect to the admin dashboard
            window.location.href = "/admindashboard";
          } else if (isAdmin) {
            // Redirect to the user dashboard
            window.location.href = `/admindashboard/${hostel_no}`;
          } else {
            window.location.href = "/";
          }
        } else {
          console.log("JWT cookie not found");
        }
      } else {
        console.error("Login failed:", response.statusText);
        // Handle unsuccessful login (display error message, etc.)
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <Router>
        <Navbar scrollToContacts={scrollToContacts} />

        <Routes>
          <Route
            path="/"
            element={<HomePage contactsSectionRef={contactsSectionRef} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route
            path="/login"
            element={
              <Login
                handleSubmit={handleSubmit}
                responseType={responseType}
                responseMsg={responseMsg}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admindashboard/Student" element={<Student />} />
          <Route path="/admindashboard/Complaints" element={<Complaints />} />
          <Route path="/admindashboard/Workers" element={<Workers />} />
          <Route path="/admindashboard/FeeDetails" element={<FeeDetails />} />
          <Route path="/rooms" element={<RoomList />}></Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatgroup" element={<Chat />} />
          <Route path="/chatroom/:group_id" element={<ChatRoom />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/general" element={<General />} />
          <Route path="/mess" element={<Mess />} />
          <Route path="/messmenu" element={<MessMenu />} />
          <Route path="/ragging" element={<Ragging />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/transactionstudent" element={<TransactionStudent />} />
          <Route path="/admindashboard/transaction" element={<Transaction />} />
          <Route path="/admindashboard/:hostel_no" element={<Dashboard />} />
          <Route
            path="/admindashboard/:hostel_no/students"
            element={<Studentdasboard />}
          />
          <Route
            path="/admindashboard/:hostel_no/Complaints"
            element={<Complaintsdashboard />}
          />
          <Route
            path="/admindashboard/:hostel_no/Workers"
            element={<Workersdashboard />}
          />
          <Route
            path="/admindashboard/:hostel_no/FeeDetails"
            element={<FeeDetailsdashboard />}
          />
          <Route
            path="/admindashboard/:hostel_no/transaction"
            element={<Transactiondashboard />}
          />
          <Route path="/signuppage2" element={<Signup2 />} />
          <Route path="/signuppage3" element={<Signup3 />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<ResetPassword1 />} />
          <Route path="/profiledropdown" element={<ProfileDropdown />} />
          <Route path="/payment" element={<TransactionStudent />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
