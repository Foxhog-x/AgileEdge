import dayjs from "dayjs";

export const formattedDate = (date) => {
  if(!date){
    return '\u00A0';
  }
  return dayjs(date).format("DD MMM YYYY");
};
