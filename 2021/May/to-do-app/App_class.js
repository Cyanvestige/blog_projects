import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ToDoBoardComponent from "./components/toDoBoardComponent";
import { Helmet } from "react-helmet";
import { ReactComponent } from "*.svg";

export default class App_class extends React.Component {
  constructor(props) {
    super(props);
    const reorder = (list, startIndex, endIndex) => {
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);
      return list;
    };
    let max = 0;
    let tasks = [
      // { id: "0", content: "first", isCompleted: true },
      // { id: "1", content: "second", isCompleted: false },
      // { id: "2", content: "third", isCompleted: false },
    ];
    this.state = {
      darkmode: false,
      inputVal: "",
      allFilters: tasks,
      doingFilters: allFilters.filter((el) => el.isCompleted === false),
      completeFilters: allFilters.filter((el) => el.isCompleted === true),
      allActive: true,
      completeActive: false,
      doingActive: false,
    };
    addNewTask = (e) => {
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

    handleDark = function () {
      this.setState({
        darkmode: !darkmode,
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
        completeFilters: allFilters.filter((el) => el.isCompleted === true),
      });
    };

    switchDoing = () => {
      this.setState({
        allActive: false,
        completeActive: false,
        doingActive: true,
        doingFilters: allFilters.filter((el) => el.isCompleted === false),
      });
    };

    switchComplete = () => {
      this.setState({
        allActive: true,
        completeActive: false,
        doingActive: false,
      });
    };

    handleDelete = (target) => {
      this.setState({
        allFilters: allFilters.filter((el) => el !== target),
        completeFilters: allFilters.filter(
          (el) => el.isCompleted == true && el !== target
        ),
        doingFilters: allFilters.filter(
          (el) => el.isCompleted === false && el !== target
        ),
      });
    };

    clearCompleted = () => {
      this.setState({
        allFilters: allFilters.filter((el) => el.isCompleted === false),
        completeFilters: "",
      });
    };

    refresh = () => {
      this.setState({
        completeFilters: allFilters.filter((el) => el.isCompleted === true),
        doingFilters: allFilters.filter((el) => el.isCompleted === false),
      });
    };
  }

  onDragEnd(result) {
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
}
