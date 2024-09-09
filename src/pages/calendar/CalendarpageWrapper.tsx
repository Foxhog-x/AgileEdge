import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import Calendar from "./Calenderpage";
import { holidays } from "./event-utils";
import { useManageIdStore } from "../../store/useManageIdStore";

interface EventData {
  id: string;
  title: string;
  start: string;
  end?: string;
  color?: string;
}

export default function CalendarpageWrapper() {
  const initializedHolidays: EventData[] = holidays.map((event, index) => ({
    ...event,
    id: `holiday-${index}`,
  }));

  const [myEventsList, setMyEventList] = useState<EventData[]>([
    ...initializedHolidays,
  ]);
  const axiosInstance = useCustomAxios();
  const { removeBoardId } = useManageIdStore();

  useEffect(() => {
    const getCalEvents = async () => {
      try {
        const response = await axiosInstance.get(urls.getEvents);
        const data = response.data;

        setMyEventList((prev) => [...prev, ...data.result]);
      } catch (error) {
        console.log(error);
      }
    };

    getCalEvents();
    removeBoardId("");
  }, [axiosInstance, removeBoardId]);

  const callDatabase = async (info: any) => {
    try {
      await axiosInstance.post(urls.saveEvent, info);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEventCall = async (id: String | Number) => {
    try {
      const response = await axiosInstance.delete(urls.deleteEvent, {
        data: { id },
      });
      console.log(response);
    } catch (error) {
      console.log("error occurred", error);
    }
  };

  const updateEventDatabase = async (evenObj: any) => {
    try {
      await axiosInstance.put(urls.updateEvent, evenObj);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Calendar
      callDatabase={callDatabase}
      deleteEventCall={deleteEventCall}
      myEventsList={myEventsList}
      updateEventDatabase={updateEventDatabase}
    />
  );
}
