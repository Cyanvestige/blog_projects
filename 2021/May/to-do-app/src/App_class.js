import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ToDoListComponent from "./components/toDoListComponent";
import { Helmet } from "react-helmet";
const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};
let max = 0;

export default class App_class extends React.Component {
  constructor(props) {
    super(props);
    let tasks = [
      { id: "0", content: "first", isCompleted: true },
      // { id: "1", content: "second", isCompleted: false },
      // { id: "2", content: "third", isCompleted: false },
    ];
    this.state = {
      darkmode: false,
      inputVal: "",
      allFilters: tasks,
      doingFilters: [],
      completeFilters: [],
      allActive: true,
      completeActive: false,
      doingActive: false,
    };

    this.addNewTask = this.addNewTask.bind(this);
    this.setDark = this.setDark.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleDark = this.handleDark.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.switchComplete = this.switchComplete.bind(this);
    this.switchDoing = this.switchDoing.bind(this);
    this.switchAll = this.switchAll.bind(this);
    this.refresh = this.refresh.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  componentDidMount() {
    this.setState({
      doingFilters: this.state.allFilters.filter(
        (el) => el.isCompleted === false
      ),
      completeFilters: this.state.allFilters.filter(
        (el) => el.isCompleted === true
      ),
    });
  }
  addNewTask = (e) => {
    max += 1;
    e.preventDefault();
    this.state.allFilters.push({
      content: this.state.inputVal,
      isCompleted: false,
      id: `${max}`,
    });
    this.refresh();
    this.setValue("");
  };
  setDark = () => {
    this.setState((state) => {
      return { darkmode: !state.darkmode };
    });
  };
  setValue = (val) => {
    this.setState({ inputVal: val });
  };
  handleDark = function () {
    // This is wrong!!!
    // this.setState({
    //   darkmode: !darkmode,
    // });
    this.setState((state) => {
      return { darkmode: !state.darkmode };
    });
  };

  handleChange = function (e) {
    this.setState({
      inputVal: e.target.value,
    });
  };

  switchComplete = () => {
    this.setState({
      allActive: false,
      completeActive: true,
      doingActive: false,
      completeFilters: this.state.allFilters.filter(
        (el) => el.isCompleted === true
      ),
    });
  };

  switchDoing = () => {
    this.setState({
      allActive: false,
      completeActive: false,
      doingActive: true,
      doingFilters: this.state.allFilters.filter(
        (el) => el.isCompleted === false
      ),
    });
  };

  switchAll = () => {
    this.setState({
      allActive: true,
      completeActive: false,
      doingActive: false,
    });
  };

  handleDelete = (target) => {
    this.setState((state) => ({
      allFilters: state.allFilters.filter((el) => el !== target),
      completeFilters: state.allFilters.filter(
        (el) => el.isCompleted == true && el !== target
      ),
      doingFilters: state.allFilters.filter(
        (el) => el.isCompleted === false && el !== target
      ),
    }));
  };

  clearCompleted = () => {
    this.setState((state) => {
      return {
        allFilters: state.allFilters.filter((el) => el.isCompleted === false),
        completeFilters: [],
      };
    });
  };

  refresh = () => {
    this.setState({
      completeFilters: this.state.allFilters.filter(
        (el) => el.isCompleted === true
      ),
      doingFilters: this.state.allFilters.filter(
        (el) => el.isCompleted === false
      ),
    });
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const files = reorder(
      this.state.allFilters,
      result.source.index,
      result.destination.index
    );

    this.setState({
      allFilters: files,
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Helmet>
          <style>{` ${
            this.state.darkmode && "body { background-color: #25273c; }"
          }yarn add react-helmet`}</style>
        </Helmet>
        <div className={"flex flex-jc-c flex-ai-c"}>
          <img
            src={
              this.state.darkmode
                ? "/images/bg-desktop-dark.jpg"
                : "/images/bg-desktop-light.jpg"
            }
            alt="light-img"
            className="canvas hide-for-mobile"
          />
          <img
            src={
              this.state.darkmode
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
                onClick={this.handleDark}
              />
            </div>
            <div
              className={`create flex flex-ai-c ${
                this.state.darkmode && "darkModeColor"
              }`}
            >
              <div className="check"></div>
              <form onSubmit={this.addNewTask}>
                <input
                  type="text"
                  className="create-textbox"
                  placeholder="Create a new todo..."
                  value={this.state.inputVal}
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <ul
              // className={this.state.darkmode && "grayBlueBg"}
              style={{
                backgroundColor: `${this.state.darkmode ? "#484b6a" : "#fff"}`,
                // height: `${4 * this.state.allFilters.length}em`,
                height: "fit-content",
              }}
            >
              <Droppable droppableId={"0"}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {this.state.allActive &&
                      this.state.allFilters.map((el, index) => (
                        <ToDoListComponent
                          task={el}
                          id={el.id}
                          index={index}
                          handleDelete={this.handleDelete}
                          refresh={this.refresh}
                          darkmode={this.state.darkmode}
                        />
                      ))}
                    {this.state.doingActive &&
                      this.state.doingFilters.map((el, index) => (
                        <ToDoListComponent
                          task={el}
                          id={el.id}
                          index={index}
                          handleDelete={this.handleDelete}
                          refresh={this.refresh}
                          darkmode={this.state.darkmode}
                        ></ToDoListComponent>
                      ))}
                    {this.state.completeActive &&
                      this.state.completeFilters.map((el, index) => (
                        <ToDoListComponent
                          task={el}
                          id={el.id}
                          index={index}
                          handleDelete={this.handleDelete}
                          refresh={this.refresh}
                          darkmode={this.state.darkmode}
                        ></ToDoListComponent>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ul>

            <div
              className={`options flex flex-jc-sb flex-ai-c ${
                this.state.darkmode && "darkModeColor"
              }`}
              style={{ color: "#777a92" }}
            >
              <div className="task-left">
                {this.state.completeFilters.length} items left
              </div>
              <div className="filter flex hide-for-mobile">
                <div
                  className={`all ${this.state.allActive && "selected"}`}
                  onClick={this.switchAll}
                >
                  All
                </div>
                <div
                  className={`active ${this.doingActive && "selected"}`}
                  onClick={this.switchDoing}
                >
                  Active
                </div>
                <div
                  className={`complete ${this.completeActive && "selected"}`}
                  onClick={this.switchComplete}
                >
                  Completed
                </div>
              </div>
              <div className="clear-completed" onClick={this.clearCompleted}>
                Clear Completed
              </div>
            </div>
            <div
              className={`filter flex flex-ai-c flex-jc-c hide-for-desktop ${
                this.state.darkmode && "veryDarkGrayishBlue"
              }`}
            >
              <div
                className={`all ${this.allActive && "selected"}`}
                onClick={this.switchAll}
              >
                All
              </div>
              <div
                className={`active ${this.doingActive && "selected"}`}
                onClick={this.switchDoing}
              >
                Active
              </div>
              <div
                className={`complete ${this.completeActive && "selected"}`}
                onClick={this.switchComplete}
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
}
