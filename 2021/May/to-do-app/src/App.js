import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ToDoBoardComponent from "./components/toDoBoardComponent";
import { Helmet } from "react-helmet";
const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};
let max = 0;
function App() {
  let tasks = [
    // { id: "0", content: "first", isCompleted: true },
    // { id: "1", content: "second", isCompleted: false },
    // { id: "2", content: "third", isCompleted: false },
  ];

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const files = reorder(
      allFilters,
      result.source.index,
      result.destination.index
    );

    setAll(files);
  }

  const [darkmode, setDark] = useState(false);
  const [inputVal, setValue] = useState("");
  const [allFilters, setAll] = useState(tasks);
  const [doingFilters, setDoing] = useState(
    allFilters.filter((el) => el.isCompleted === false)
  );
  const [completeFilters, setComplete] = useState(
    allFilters.filter((el) => el.isCompleted === true)
  );
  const [allActive, switchAllBool] = useState(true);
  const [completeActive, switchCompleteBool] = useState(false);
  const [doingActive, switchDoingBool] = useState(false);
  const addNewTask = (e) => {
    max += 1;
    e.preventDefault();
    allFilters.push({
      content: inputVal,
      isCompleted: false,
      id: `${max}`,
    });
    console.log(allFilters[allFilters.length - 1]);
    refresh();
    setValue("");
  };

  const handleDark = function () {
    setDark(!darkmode);
  };

  const handleChange = function (e) {
    setValue(e.target.value);
  };
  const switchComplete = () => {
    switchAllBool(false);
    switchCompleteBool(true);
    switchDoingBool(false);
    setComplete(allFilters.filter((el) => el.isCompleted === true));
    refresh();
  };

  const switchDoing = () => {
    switchAllBool(false);
    switchCompleteBool(false);
    switchDoingBool(true);
    setDoing(allFilters.filter((el) => el.isCompleted === false));
    refresh();
  };

  const switchAll = () => {
    switchAllBool(true);
    switchCompleteBool(false);
    switchDoingBool(false);
    setAll(allFilters);
    refresh();
  };

  const handleDelete = (target) => {
    setAll(allFilters.filter((el) => el !== target));
    setComplete(
      allFilters.filter((el) => el.isCompleted === true && el !== target)
    );
    setDoing(
      allFilters.filter((el) => el.isCompleted === false && el !== target)
    );
  };

  const clearCompleted = () => {
    setAll(allFilters.filter((el) => el.isCompleted === false));
    setComplete([]);
  };
  const refresh = function () {
    setAll(allFilters);
    setComplete(allFilters.filter((el) => el.isCompleted === true));
    setDoing(allFilters.filter((el) => el.isCompleted === false));
  };
  console.log(allFilters);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Helmet>
        <style>{` ${
          darkmode && "body { background-color: #25273c; }"
        }yarn add react-helmet`}</style>
      </Helmet>
      <div className={"flex flex-jc-c flex-ai-c"}>
        <img
          src={
            darkmode
              ? "/images/bg-desktop-dark.jpg"
              : "/images/bg-desktop-light.jpg"
          }
          alt="light-img"
          className="canvas hide-for-mobile"
        />
        <img
          src={
            darkmode
              ? "/images/bg-mobile-dark.jpg"
              : "/images/bg-mobile-light.jpg"
          }
          alt="light-img"
          className="canvas canvas-mobile hide-for-desktop"
        />
        <div className="wrapper">
          <div className="header flex flex-jc-sb flex-ai-c">
            <h1 style={{ color: "#fff" }}>T O D O</h1>
            <img
              src="/images/icon-moon.svg"
              alt="moon"
              style={{ height: "1.875em", cursor: "pointer" }}
              onClick={handleDark}
            />
          </div>
          <div
            className={`create flex flex-ai-c ${darkmode && "darkModeColor"}`}
          >
            <div className="check"></div>
            <form onSubmit={addNewTask}>
              <input
                type="text"
                className="create-textbox"
                placeholder="Create a new todo..."
                value={inputVal}
                onChange={handleChange}
              />
            </form>
          </div>

          {allActive && (
            <ul style={{ height: `${4 * allFilters.length}em` }}>
              <Droppable droppableId={"0"}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {allFilters.map((el, index) => (
                      <ToDoBoardComponent
                        task={el}
                        id={el.id}
                        index={index}
                        handleDelete={(el) => handleDelete(el)}
                        refresh={refresh}
                        darkmode={darkmode}
                      ></ToDoBoardComponent>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ul>
          )}
          {doingActive && (
            <ul style={{ height: `${4 * doingFilters.length}em` }}>
              <Droppable droppableId={"0"}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {doingFilters.map((el, index) => (
                      <ToDoBoardComponent
                        task={el}
                        id={el.id}
                        index={index}
                        handleDelete={(el) => handleDelete(el)}
                        refresh={refresh}
                        darkmode={darkmode}
                      ></ToDoBoardComponent>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ul>
          )}
          {completeActive && (
            <ul style={{ height: `${4 * completeFilters.length}em` }}>
              <Droppable droppableId={"0"}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {completeFilters.map((el, index) => (
                      <ToDoBoardComponent
                        task={el}
                        id={el.id}
                        index={index}
                        handleDelete={(el) => handleDelete(el)}
                        refresh={refresh}
                        darkmode={darkmode}
                      ></ToDoBoardComponent>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ul>
          )}

          <div
            className={`options flex flex-jc-sb flex-ai-c ${
              darkmode && "darkModeColor"
            }`}
            style={{ color: "#777a92" }}
          >
            <div className="task-left">
              {allFilters.filter((el) => el.isCompleted === false).length} items
              left
            </div>
            <div className="filter flex hide-for-mobile">
              <div
                className={`all ${allActive && "selected"}`}
                onClick={switchAll}
              >
                All
              </div>
              <div
                className={`active ${doingActive && "selected"}`}
                onClick={switchDoing}
              >
                Active
              </div>
              <div
                className={`complete ${completeActive && "selected"}`}
                onClick={switchComplete}
              >
                Completed
              </div>
            </div>
            <div className="clear-completed" onClick={clearCompleted}>
              Clear Completed
            </div>
          </div>

          <div
            className={`filter flex flex-ai-c flex-jc-c hide-for-desktop ${
              darkmode && "veryDarkGrayishBlue"
            }`}
          >
            <div
              className={`all ${allActive && "selected"}`}
              onClick={switchAll}
            >
              All
            </div>
            <div
              className={`active ${doingActive && "selected"}`}
              onClick={switchDoing}
            >
              Active
            </div>
            <div
              className={`complete ${completeActive && "selected"}`}
              onClick={switchComplete}
            >
              Completed
            </div>
          </div>
          <div className="help">Drag and Drop to reorder list</div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
