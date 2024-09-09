import dayjs from "dayjs";
 
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export const formattedDate = (date:string | Date) => {
  console.log(date)
  if(!date){
    return '\u00A0';
  }
  return dayjs(date).format("DD MMM YYYY");
};


export const timeLeftFromNow = (endDueDate:string | Date| any) => {
  if (dayjs().isBefore(dayjs(endDueDate))) {
    return dayjs().from(dayjs(endDueDate), true);
  } else {
    return "Expired";
  }
};


export const getMuiColorBasedOnTimeLeft = (endDueDate: string | Date | any) => {
  const now = dayjs();
  const dueDate = dayjs(endDueDate);
  

  if (now.isAfter(dueDate)) {
    return 'error';
  }
  
  const daysLeft = dueDate.diff(now, 'day');
  
  if (daysLeft <= 1) {
    return 'error'; 
  } else if (daysLeft <= 3) {
    return 'warning'; // Orange for soon (less than 3 days left)
  } else if (daysLeft <= 7) {
    return 'warning'; // Yellow for approaching (less than a week left)
  } else if (daysLeft <= 30) {
    return 'info'; // Light blue for upcoming (less than a month left)
  } else {
    return 'success'; // Green for plenty of time left (more than a month)
  }
};