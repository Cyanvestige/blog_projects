import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const ToDoBoardComponent = ({
  task,
  id,
  index,
  refresh,
  handleDelete,
  darkmode,
}) => {
  //(props)
  const [completed, check] = useState(!task.isCompleted);
  const handleCheckClick = (task) => {
    check(!completed);
    task.isCompleted = completed;
    refresh();
  };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(providedDrag) => (
        <li
          className={`content flex flex-ai-c ${darkmode && "darkModeColor"}`}
          {...providedDrag.draggableProps}
          {...providedDrag.dragHandleProps}
          ref={providedDrag.innerRef}
        >
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
            } `}
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
      )}
    </Draggable>
  );
};

export default ToDoBoardComponent;
