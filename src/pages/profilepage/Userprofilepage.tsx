import { UserProfileForm } from "../../components/formcontainer/UserProfileForm";

const Userprofilepage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = {
    firstName: "string",
    lastName: "string",
    email: "string@gmail.com",
    address: "string",
  };
  return <UserProfileForm currentUser={currentUser} />;
};

export default Userprofilepage;
