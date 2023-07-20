'use client';
import Todo from "./Todo";
import FilterButton from "./FilterButton";
import Form from "./Form";
import React, {useState} from "react";
import { nanoid } from "nanoid";

export default function App(props: any) {
  
  const [tasks, setTasks] = useState(props.tasks);
  
  function addTask(name:any) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
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

  const taskList = tasks.map((task: any) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
  }