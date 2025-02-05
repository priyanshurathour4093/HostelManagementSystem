import React, { useState } from "react";

export default function Welcome() {
  

  return (
    <div className="flex justify-center items-center flex-col text-blue-700" style={{ height: "91vh" }}>
      <img src={""} alt="" className="h-80" />
      <h1>
        Welcome
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  );
}
