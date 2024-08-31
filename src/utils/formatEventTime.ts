export const   extractTimeFromDateTime =(dateTimeString: string)=> {
if(dateTimeString === null) return null
if(dateTimeString === 'all Day') return "all day"


    if (!dateTimeString.includes('T')) {
        
        return '';
    }

   
    const timePart = dateTimeString.split('T')[1];
    
    
    if (!timePart) {
        return '';
    }

  
    const time = timePart.split('+')[0];

     
    if (!time) {
        return '';
    }

  
    const [hour, minute] = time.split(':').map(Number);
    
   
    const formattedHour = hour % 12 || 12;  
    const period = hour < 12 ? 'am' : 'pm'; 
console.log(period,"period")
    return `${formattedHour}:${minute.toString().padStart(2, '0')}${period}`;
}
 