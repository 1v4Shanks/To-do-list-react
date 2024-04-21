import "./App.css";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import React from "react";

let nextId = 0;
export default function App() {
  const [task, setTask] = useState("");
  const [addTask, setAddTask] = useState([]);

  function handleChange(value) {
    if (value.length <= 34) {
      setTask(value.charAt(0).toUpperCase() + value.slice(1));
    } else {
      alert("Task length exceeds maximum length");
    }
  }

  function handleClick() {
    setTask("");
    if (task === "") {
      return;
    } else {
      setAddTask([...addTask, { id: nextId++, task: task, done: false }]);
    }
  }

  function handleToggle(checked, taskId) {
    setAddTask(
      addTask.map((t) => {
        if (t.id === taskId) {
          return { ...t, done: checked };
        } else {
          return t;
        }
      })
    );
  }

  function handleDelete(taskId) {
    setAddTask(addTask.filter((t) => t.id !== taskId));
  }

  function handleEdit(newTask, taskId) {
    setAddTask(
      addTask.map((t) => {
        if (t.id === taskId && newTask.length <= 34) {
          return { ...t, task: newTask.charAt(0).toUpperCase() + newTask.slice(1) };
        } else {
          return t;
        }
      })
    );
  }

  return (
    <div className="container">
      <h1>My To Do List</h1>
      <AddTask task={task} onClick={handleClick} onChange={handleChange} />
      <TaskTable
        addTask={addTask}
        handleToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

function AddTask({ task, onClick, onChange }) {
  return (
    <div className="addtask">
      <input
        value={task}
        type="text"
        placeholder="New Task..."
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onClick}>ADD</button>
    </div>
  );
}

function TaskTable({ addTask, handleToggle, onDelete, onEdit }) {
  return (
    <div className="tasktable">
      <ul>
        {addTask.map((task) => (
          <li key={task.id} className={task.done ? "checked" : ""}>
            <Task
              task={task}
              handleToggle={handleToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Task({ task, handleToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <div className="edit-content">
          <input
            value={task.task}
            onChange={(e) => onEdit(e.target.value, task.id)}
          />
        </div>

        <FaSave className="btn1" onClick={() => setIsEditing(false)} />
      </>
    );
  } else {
    todoContent = (
      <>
        {task.task}
        <MdEdit className="btn1" onClick={() => setIsEditing(true)} />
      </>
    );
  }
  return (
    <>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          handleToggle(e.target.checked, task.id);
        }}
      />
      {todoContent}
      <MdDelete className="btn2" onClick={() => onDelete(task.id)} />
    </>
  );
}
