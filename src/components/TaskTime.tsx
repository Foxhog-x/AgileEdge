import { useEffect, useState } from "react";
import "./style.css";

interface TaskTimeProps {
  startStr: Date;
  endStr?: Date; // Make endStr optional
}

export default function TaskTime({ startStr, endStr }: TaskTimeProps) {
  const [timeSpent, setTimeSpent] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTime = new Date(startStr);
    const endTime = endStr ? new Date(endStr) : new Date();

    const updateClock = () => {
      const timeDifference = endTime.getTime() - startTime.getTime();
      if (timeDifference <= 0) {
        // Stop updating if end time has passed
        if (intervalId) clearInterval(intervalId);
        setTimeSpent({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(timeDifference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeSpent({ hours, minutes, seconds });
    };

    updateClock();

    if (!endStr) {
      const id = setInterval(updateClock, 1000);
      setIntervalId(id);

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [startStr, endStr, intervalId]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <div className="text-center">
        {/* You can add any additional text or styling here if needed */}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div
          className={`relative w-40 h-40 rounded-full ${
            endStr ? "bg-green-600" : "bg-purple-600"
          } flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4`}
        >
          <p>
            {timeSpent.hours}h {timeSpent.minutes}m {timeSpent.seconds}s
          </p>
        </div>
      </div>
    </div>
  );
}
