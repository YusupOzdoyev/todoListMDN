'use client';
import Todo from "./Todo";
import FilterButton from "./FilterButton";
import Form from "./Form";
import React, {useState, useRef, useEffect} from "react";
import { nanoid } from "nanoid";

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP: any = {
  All: () => true,
  Active: (task: any) => !task.completed,
  Completed: (task: any) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props: any) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name:any) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function editTask(id: any, newName: any) {
    const editedTaskList = tasks.map((task: any) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id: any) {
    const updatedTasks= tasks.map((task: any) => {
      if (id === task.id) {
        return {...task, completed: !task.completed};
      } 
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: any) {
    const remainingTasks = tasks.filter((task: any) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task: any) => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id} 
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef: any = useRef(null);

  const prevTaskLength: any = usePrevious(tasks.length);
  
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 
        id="list-heading" 
        tabIndex="-1" 
        ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
  }