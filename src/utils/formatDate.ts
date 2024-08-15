import dayjs from "dayjs";

export const formattedDate = (date) => {
  return dayjs(date).format("DD MMM YYYY");
};
