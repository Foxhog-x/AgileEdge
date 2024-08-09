import { compareByFieldSpecs } from "@fullcalendar/core/internal"
import useCustomAxios from "../../services/apiServices/customAxios/customAxios"
import { urls } from "../../services/apiServices/urls/urls"

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
console.log(todayStr, 'str')


export  const  fetchAllEvent = async() =>{
 const response = await  useCustomAxios().get(urls.getEvents);
 const data = response.data.result;
 const INITIAL_EVENTS =data.map((value, i)=>{
  return  value 
   
  
 })
 return INITIAL_EVENTS
 
 
}
 

export function createEventId() {
  return String(eventGuid++)
}