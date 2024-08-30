export const extractTimeAndTimezone = (time) => {
  const splitString = time.split("");
  if(splitString.includes("T")){
    const indexT = splitString.indexOf("T");
    const tim = splitString.splice(indexT, 8).join("");
    const date = splitString.splice(0, 10).join("");
    const timezone = splitString.splice(1, 6).join("");
    return {
      date: date,
      time: tim,
      timeZone: timezone,
    };
  }else{
    return{
      date: time,
      time: '00:00:00',
      timeZone: "+00:00",
    }
  }
  
};

 
