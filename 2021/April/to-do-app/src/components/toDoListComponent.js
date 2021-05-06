import React, { useState } from "react";

const ToDoListComponent = ({ task, refresh, handleDelete }) => {
  //(props)
  const [completed, setCompleted] = useState(!task.isCompleted);
  const handleCheckClick = (task) => {
    setCompleted(!completed);
    task.isCompleted = completed;
    refresh();
  };
  return (
    <li className="content flex flex-ai-c">
      <div
        className={`check ${
          task.isCompleted && "checked"
        } flex flex-jc-c flex-ai-c`}
        onClick={() => handleCheckClick(task)}
      >
        {task.isCompleted && <img src="/images/icon-check.svg"></img>}
      </div>
      <div
        className={`todo ${
          task.isCompleted && "completed" /*not completed &&...*/
        }`}
      >
        {task.content}
      </div>
      <img
        src="/images/icon-cross.svg"
        alt="cross"
        className="delete flex-jf-ed"
        onClick={() => handleDelete(task)}
      ></img>
    </li>
  );
};

export default ToDoListComponent;
