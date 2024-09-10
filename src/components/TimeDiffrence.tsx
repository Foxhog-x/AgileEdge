import { useState, useEffect } from "react";

const TimeDifference = () => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Start and End times in string format
    const startTimeStr: string = "2024-09-09 09:07:26";
    const endTimeStr: string = "2024-09-10 05:42:22"; // If end time is not given, use current time

    // Convert to Date objects
    const startTime: Date = new Date(startTimeStr);
    const endTime: Date = endTimeStr ? new Date(endTimeStr) : new Date(); // Use current time if endTime is not provided

    // Calculate time difference in milliseconds
    const timeDifference = endTime.getTime() - startTime.getTime();

    // Convert to hours
    const hoursSpent = timeDifference / (1000 * 60 * 60);

    // Set state
    setTimeSpent(hoursSpent);
  }, []);

  return (
    <div>
      <h2>Time Spent: {timeSpent.toFixed(2)} hours</h2>
    </div>
  );
};

export default TimeDifference;
