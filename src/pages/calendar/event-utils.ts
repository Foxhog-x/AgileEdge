let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}
export const holidays = [
  { title: "New Year's Day", start: "2024-01-01", color: "green" },
  { title: "Republic Day", start: "2024-01-26", color: "green" },
  { title: "Maha Shivaratri", start: "2024-03-08", color: "green" },
  { title: "Holi", start: "2024-03-25", color: "green" },
  { title: "Good Friday", start: "2024-03-29" , color: "green"},
  { title: "Ram Navami", start: "2024-04-17", color: "green" },
  { title: "Mahavir Jayanti", start: "2024-04-21", color: "green" },
  { title: "Good Friday", start: "2024-03-29", color: "green" },
  { title: "May Day", start: "2024-05-01" , color: "green"},
  { title: "Buddha Purnima", start: "2024-05-23", color: "green" },
  { title: "Eid al-Fitr", start: "2024-04-10", color: "green" },
  { title: "Eid al-Adha", start: "2024-06-17", color: "green" },
  { title: "Independence Day", start: "2024-08-15", color: "green" },
  { title: "Raksha Bandhan", start: "2024-08-19", color: "green" },
  { title: "Janmashtami", start: "2024-08-26", color: "green" },
  { title: "Ganesh Chaturthi", start: "2024-09-07", color: "green" },
  { title: "Mahatma Gandhi Jayanti", start: "2024-10-02", color: "green" },
  { title: "Dussehra", start: "2024-10-12" , color: "green"},
  { title: "Diwali", start: "2024-11-01", color: "green" },
  { title: "Bhai Dooj", start: "2024-11-03", color: "green" },
  { title: "Guru Nanak Jayanti", start: "2024-11-15", color: "green" },
  { title: "Christmas Day", start: "2024-12-25", color: "green" },
];
