import { FaTimes } from "react-icons/fa";

import React from "react";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          onClick={() => onDelete(task.id)}
          style={{ color: "red", cursor: "pointer" }}
        ></FaTimes>
      </h3>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
