import { UserProfileForm } from "../../components/formcontainer/UserProfileForm";

const Userprofilepage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = {
    email: "onkar@gmail.com",
    name: "onkar",
    addressLine1: "sdjkfsdif",
    city: "aurangabad",
    country: "india",
  };

  return <UserProfileForm />;
};

export default Userprofilepage;
