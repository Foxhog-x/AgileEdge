import { Category } from "@mui/icons-material";
import React from "react";
const tasks = {
  "Front-end development": [
    {
      task: "Create login form with email and password fields",
    },
    {
      task: "Validate user input (email and password)",
    },
    {
      task: "Send login request to back-end API",
    },
  ],
  "Back-end development": [
    {
      task: "Create API endpoint for login",
    },
    {
      task: "Validate user input (email and password)",
    },
    {
      task: "Check if user exists in database",
    },
    {
      task: "If user exists, authenticate and redirect to dashboard",
    },
    {
      task: "If user does not exist, redirect to sign-up page",
    },
  ],
};
export default function Summary() {
  return (
    <div>
      {Object.entries(tasks).map(([category, taskArray]) => (
        <div className="flex flex-col gap-5 mt-5">
          <div key={category}>
            <span className="text-3xl">{category}</span>
          </div>
          <div>
            {taskArray.map(({ task }, index) => (
              <li key={index}>{task}</li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
