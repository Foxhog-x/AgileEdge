import { useEffect, useState } from "react";
import "./style.css";

interface TaskTimeProps {
  startStr: Date;
  endStr: Date;
}
export default function TaskTime({ startStr, endStr }: TaskTimeProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  console.log(endStr, "end");
  useEffect(() => {
    const startTime = new Date(startStr);
    const endTime = endStr ? new Date(endStr) : new Date();
    console.log(startTime, endTime, "time");

    const timeDifference = endTime.getTime() - startTime.getTime();

    const hoursSpent = timeDifference / (1000 * 60 * 60);

    setTimeSpent(Math.floor(hoursSpent));
  }, []);

  // const progress = (timeSpent / totalHours) * 100;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <div className="text-center">
        {/* <p className="text-gray-500 text-sm">Total Hours: {totalHours}</p> */}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div
          className={`relative w-32 h-32 rounded-full ${
            endStr ? "bg-green-600" : "bg-purple-600"
          } flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4`}
        >
          <p>{timeSpent}h</p>
        </div>

        {/* <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"> </div> */}
        {/* <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div> */}
      </div>
    </div>
  );
}
