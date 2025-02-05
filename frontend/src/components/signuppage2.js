import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

function Signup2({ email, setStep,full_name,generateOtp}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Updated to 6 digits
  const inputRefs = useRef([]);
  const resendOtp=()=>{
    generateOtp(email,full_name);
  }
  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    const response = await fetch("http://localhost:5000/api/auth/otpcheck", {
      method: "POST",
      body: JSON.stringify({ email, otp }), // Convert data to JSON string
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // signup page 2 should be visible now
      setStep(3);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md mx-auto max-w-fit flex items-center justify-center m-10" style={{ borderRadius: '50px' }}>
        <div className='flex items-center justify-center max-w-[65vw]'>
          <div className='flex items-center justify-center hidden xl:block'>
            <img src="/signupimg2.jpg" alt="signupimg" className='mx-auto w-[130vw]' style={{ borderBottomLeftRadius: '50px', borderTopLeftRadius: '50px' }} />
          </div>
          <form className="space-y-6 px-8 flex flex-col w-[90vw]">
            <div className="text-center">
              <label htmlFor="otp" className="block text-gray-700 font-bold mb-2 text-xl">
                Enter OTP:
              </label>
              <div className='text-sm mb-2'> We have sent a 6-digit OTP to your email</div> {/* Updated message */}
              <div className="flex justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    maxLength={1}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      margin: '0 0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      textAlign: 'center',
                      margin: '0.7rem',
                      outline: 'none',
                      cursor: 'text'
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleVerify}
              className="w-full mx-auto py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Verify
            </button>
            <NavLink onClick={resendOtp}>Resend Otp</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup2;
