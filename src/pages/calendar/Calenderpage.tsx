import React, { useEffect, useState } from "react";
import { EventApi, formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId, holidays } from "./event-utils";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { EventInput } from "@fullcalendar/core";
interface EventData {
  id: string | number | undefined;
  title: string | undefined;
  start: string | undefined;
  end?: string | undefined;
  color?: string | undefined;
}
interface MyEvent {
  title: String | null;
  start: String | null;
  end: String | null;
  color?: String;
}

interface SidebarEventProps {
  event: EventData;
}
interface CalendarProps {
  myEventsList: EventInput[];
  callDatabase: (evenObj: MyEvent | null) => void;
  deleteEventCall: (id: Number | String) => void;
}

export default function Calendar({
  callDatabase,
  deleteEventCall,
  myEventsList,
}: CalendarProps) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt("Please enter a new title for your event");

    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    const evenObj = {
      title: title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    };

    if (title) callDatabase(evenObj);
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo: EventClickArg) {
    const id = clickInfo.event._def.publicId;

    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      deleteEventCall(id);
      clickInfo.event.remove();
    }
  }

  return (
    <div className="demo-app p-2">
      <Sidebar

      // handleWeekendsToggle={handleWeekendsToggle}
      // currentEvents={currentEvents}
      />
      <div className="demo-app-main   ">
        <FullCalendar
          height={"90vh"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={myEventsList}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
// { weekendsVisible, handleWeekendsToggle, currentEvents }
function Sidebar() {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section"></div>
    </div>
  );
}

function SidebarEvent({ event }: SidebarEventProps) {
  const formattedDate = event.start
    ? formatDate(event.start, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No Date";

  return (
    <li
      key={event.id}
      style={{ backgroundColor: event.color || "transparent" }}
    >
      <b>{formattedDate}</b>
      <i>{event.title}</i>
    </li>
  );
}
