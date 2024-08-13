import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function AssigneUserSelect({ setCardDataAssign }) {
  return (
    <Autocomplete
      multiple
      onChange={(_, value) => {
        console.log(value, "value");
        setCardDataAssign((prev) => {
          return { ...prev, assignee_id: value };
        });
      }}
      id="tags-outlined"
      options={users}
      getOptionLabel={(option) => option.username}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label="Assign_Team_Members" placeholder="name" />
      )}
    />
  );
}

const parsedData = JSON.parse(localStorage.getItem("userData"));
const users = Array.isArray(parsedData) ? parsedData : [parsedData];
console.log(users);
