import { useEffect, useState } from "react";
import useCustomAxios from "../services/apiServices/customAxios/customAxios";
import { urls } from "../services/apiServices/urls/urls";
import { extractTimeFromDateTime } from "../utils/formatEventTime";
interface TodaysType {
  title: string;
  start: string;
  end: string;
}
export default function TodaysEvents() {
  const axiosInstance = useCustomAxios();
  const [todaysEvents, setTodaysEvents] = useState<TodaysType[]>([]);

  const getTodayEvents = async () => {
    try {
      const response = await axiosInstance.get(urls.getTodaysEvents);
      const data = response.data.result;
      setTodaysEvents(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayEvents();
  }, []);
  return (
    <div className="max-w-96 border bg-slate-300 rounded-md shadow-md p-3 ml-5 mt-5">
      <div className="p-4">
        <div className="text-2xl underline">Todays Events</div>
      </div>
      <div>
        <ol className="flex flex-col gap-2 mt-3">
          {todaysEvents &&
            todaysEvents.map((todayEvent, i) => {
              return (
                <li
                  key={i}
                  className="p-2 flex flex-row-reverse justify-between gap-3 border border-gray-400 bg-blue-400 rounded-lg"
                >
                  <span>
                    {extractTimeFromDateTime(todayEvent.start)}-
                    {extractTimeFromDateTime(todayEvent.end)}
                  </span>
                  {todayEvent.title}
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
