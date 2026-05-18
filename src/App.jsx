import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./services/todoService";

function App() {
  const [todos, setTodos] = useState(getTodos);
  const [inputValue, setInputValue] = useState(""); // set state for input tag

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleRemove = (idToRemove) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== idToRemove);
    });
  };

  const handleChange = (e) => {
    return setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: crypto.randomUUID(), text: inputValue.trim(), completed: false },
    ]);
    setInputValue("");
  };

  const handleToggleCompleted = (idToComplete) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.id === idToComplete ? { ...todo, completed: !todo.completed } : todo;
      }));
  };

  return (
    <form
      className="min-h-screen grid place-items-center"
      onSubmit={handleSubmit}
    >
      <div className="todo-container border-none shadow-lg rounded-xl p-5 bg-gray-100">
        <h1 className="todo-header flex justify-center font-bold text-3xl pb-5">
          Todo
        </h1>

        <div className="input-field mb-5 gap-2 flex">
          <input
            className="border-none shadow-lg rounded-lg w-80 p-2 bg-white"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter your todo here..."
            autoFocus
          />
          <button
            type="submit"
            className="border-none  rounded-lg p-2 bg-cyan-600 text-white"
          >
            Add
          </button>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p>Nothing todo. You are free! 🌹</p>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => {
                return (
                  <li
                    className="list flex justify-between border-none bg-white shadow-lg rounded-lg p-2 mt-2"
                    key={todo.id}
                  >
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleCompleted(todo.id)}
                      />
                      <span
                        className={
                          todo.completed ? "line-through text-gray-400" : ""
                        }
                      >
                        {todo.text}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleRemove(todo.id);
                      }}
                    >
                      🗑️
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
}

export default App;
