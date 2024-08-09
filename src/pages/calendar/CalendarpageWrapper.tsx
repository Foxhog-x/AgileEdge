import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import Calendar from "./Calenderpage";

export default function CalendarpageWrapper() {
  const [initialEventsList, setInitialsEventsList] = useState(null);
  const axiosInstance = useCustomAxios();
  useEffect(() => {
    const getCalEvents = async () => {
      try {
        const response = await axiosInstance.get(urls.getEvents);
        const data = response.data;
        setInitialsEventsList(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    getCalEvents();
  }, []);

  const callDatabase = async (info) => {
    try {
      await axiosInstance.post(urls.saveEvent, info);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEventCall = async (id) => {
    try {
      const response = await axiosInstance.delete(urls.deleteEvent, {
        data: { id: id },
      });
      console.log(response);
    } catch (error) {
      console.log("error occured", error);
    }
  };
  return (
    <Calendar
      callDatabase={callDatabase}
      deleteEventCall={deleteEventCall}
      initialEventsList={initialEventsList}
    />
  );
}