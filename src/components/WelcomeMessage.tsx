import { useState, useEffect } from "react";

const WelcomeMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      setShowMessage(true);
      localStorage.setItem("isFirstVisit", "false");
    }
  }, []);

  const closeMessage = () => {
    setShowMessage(false);
  };

  return (
    <>
      {showMessage && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center">
          <p>
            Please Note First time Server instance take up to 50 sec to spin up
            due to inactivity of app and free trial version i used.
          </p>
          <button
            onClick={closeMessage}
            className="mt-2 bg-white text-blue-500 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default WelcomeMessage;
