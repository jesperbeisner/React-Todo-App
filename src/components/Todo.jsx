import React from "react";

const Todo = ({description, done, index, onChangeTodo, onDeleteTodo}) => {
  return (
    <div className={
      done
        ? "flex justify-between p-2 text-lg items-center text-white bg-green-600"
        : "flex justify-between p-2 text-lg items-center text-white bg-red-500"
    }>
      <h1 className="cursor-pointer" onClick={() => onChangeTodo(index)}>{description}</h1>
      <button className="bg-gray-500 p-2 text-white" onClick={() => onDeleteTodo(index)}>Löschen</button>
    </div>
  );
}

export default Todo;