export const getLocationUrl = (path: string)=>{
    const match = path.match(/(\d+)$/);
    const cardId = match ? parseInt(match[0], 10) : null;
    return cardId;
}