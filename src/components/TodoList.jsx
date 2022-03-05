import Todo from "./Todo";
import {useState, useEffect} from "react";

const TodoList = () => {
  const [openCount, countOpenTodos] = useState(0);
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem("items");
    return items === null ? [] : JSON.parse(items);
  });
  const [textInput, setTextInput] = useState('');

  const countOpen = () => {
    const doneTodos = todos.filter((item) => {
      return !item.done
    });
    countOpenTodos(doneTodos.length);
  }

  const changeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const changeText = (e) => {
    setTextInput(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    const newTodos = [...todos, {description: textInput, done: false}];
    setTodos(newTodos);
    setTextInput('');
  }

  useEffect(() => {
    countOpen();
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="shadow-sm hover:shadow-md">
      <div className="text-center bg-gray-900 text-white py-4 font-semibold">
        <h1 className="text-3xl">Todolist</h1>
        <h2 className="text-xl">Offene Todos: {openCount}</h2>
        <form className="grid grid-cols-3 p-2">
          <input
            type="text"
            value={textInput}
            placeholder="Neues Todo..." className="col-span-2 py-2 text-gray-900"
            onChange={changeText}
          />
          <input
            type="submit"
            value="Add Todo"
            className="col-span-1 bg-gray-500 cursor-pointer"
            onClick={submit}
          />
        </form>
      </div>
      {todos.map((item, index) => {
        return (
          <Todo
            description={item.description}
            done={item.done}
            index={index}
            onChangeTodo={changeTodo}
            onDeleteTodo={deleteTodo}
            key={index}
          />
        )
      })}
    </div>
  );
}

export default TodoList;