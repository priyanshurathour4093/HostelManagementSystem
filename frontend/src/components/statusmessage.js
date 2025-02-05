import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function MessageAlert({ message, type, icon, duration = 5000 }) {
  const [showAlert, setShowAlert] = useState(true);

  // Auto-dismiss the alert after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    showAlert && (
      <div
        className={`bg-${type === 'success' ? 'green-300' : 'red-400'} border border-${type === 'success' ? 'green' : 'red'}-400 text-${type === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative`}
        role="alert"
      >
        <span className="block sm:inline">
          {icon && <span className="inline-block mr-2">{icon}</span>}
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowAlert(false)}>
          <svg className={`fill-current h-6 w-6 text-${type === 'success' ? 'black' : 'black'}-500`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849c-.469.469-1.229.469-1.697 0L10 11.819l-2.651 3.029c-.469.469-1.229.469-1.697 0-.469-.469-.469-1.228 0-1.697l2.758-3.15-2.759-3.152c-.469-.469-.469-1.228 0-1.697.469-.469 1.228-.469 1.697 0L10 8.183l2.651-3.031c.469-.469 1.228-.469 1.697 0 .469.469.469 1.228 0 1.697l-2.759 3.152 2.758 3.15c.469.469.469 1.228 0 1.697z" />
          </svg>
        </span>
      </div>
    )
  );
}

export default MessageAlert;
