import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
interface SubtaskProps {
  subtask_id: number;
  checked: boolean;
  description: string;
  handleSubTasksCheckbox: (subtask_id: number) => void;
  handleSubTaskDelete: (subtask_id: number) => void;
}
export default function Subtasks({
  subtask_id,
  checked,
  description,
  handleSubTasksCheckbox,
  handleSubTaskDelete,
}: SubtaskProps) {
  console.log(subtask_id, "i");
  const checkedConvert = checked ? true : false;
  return (
    <div className="shadow-sm p-2 gap-1 ">
      <ol>
        <li
          style={{
            textDecoration: checkedConvert ? "line-through" : "",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Checkbox
              onChange={() => handleSubTasksCheckbox(subtask_id)}
              checked={checkedConvert}
            />
            {description}
          </div>
          <IconButton onClick={() => handleSubTaskDelete(subtask_id)}>
            <DeleteIcon />
          </IconButton>
        </li>
      </ol>
    </div>
  );
}
