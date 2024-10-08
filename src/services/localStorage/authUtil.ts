interface User {
  member_id: number;
  member_name: string;
}
export const addTokenData = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const removeTokenData = () => {
  localStorage.removeItem("authToken");
  return "removed";
};

export const getTokenData = () => {
  const token = localStorage.getItem("authToken");
  return token;
};


export const addUsersDataLocally  = (data:User)=>{
  localStorage.setItem("userData", JSON.stringify(data))
}
//   const getUserData = () => {   const userDataToken = localStorage.getItem('qweldToken');   try {     return userDataToken ? JSON.parse(userDataToken) : null;   } catch (error) {     return null;   } };  const setUserData = (userData: string) => {   localStorage.setItem('qweldToken', JSON.stringify(userData)); };  const removeUserData = () => {   localStorage.removeItem('qweldToken'); };  export { getUserData, setUserData, removeUserData };
