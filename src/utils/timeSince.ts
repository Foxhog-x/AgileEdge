export const timeSince = (timestamp)=> {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    const interval = Math.floor(seconds / 31536000); 
    if (interval > 1) return `${interval} years ago`;
  
    const months = Math.floor(seconds / 2592000); 
    if (months > 1) return `${months} months ago`;
  
    const days = Math.floor(seconds / 86400);  
    if (days > 1) return `${days} days ago`;
  
    const hours = Math.floor(seconds / 3600);  
    if (hours > 1) return `${hours} hours ago`;
  
    const minutes = Math.floor(seconds / 60);  
    if (minutes > 1) return `${minutes} minutes ago`;
  
    return `${Math.floor(seconds)} seconds ago`;
  }
  
  // Example usage
   
 