import { useState } from "react";

function App() {
    const [todos, setTodos] = useState(["Study React"]);

    const [inputValue, setInputValue] = useState(""); // set state for input tag
    const [editingIndex, setEditingIndex] = useState(null); // save editing index
    const [editingValue, setEditingValue] = useState("");

    const noTodos = () => {
        if (todos.length === 0) {
            return <p>Nothing todo. You are free! 🌹</p>;
        } else {
            return (
                <ul className="todo-list">
                    {todos.map((todo, index) => {
                        return (
                            <li className="list"
                                key={index}
                                onClick={() => handleUpdate(index)}>

                                {editingIndex === index ? (
                                    <input
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSaveUpdate();
                                            }
                                        }}
                                        autoFocus />
                                ) : (todo)}

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemove(index);
                                    }}>
                                    🗑️
                                </button>
                            </li>
                        );
                    })}
                </ul>
            );
        }
    };

    const handleSaveUpdate = () => {
        if (editingValue.trim() === "") {
            return;
        }

        setTodos(prev => prev.map((item, index) => {
            return index === editingIndex ? editingValue.trim() : item
        }));

        setEditingIndex(null);
        setEditingValue("");
    };

    const handleUpdate = (index) => {
        setEditingIndex(index);
        setEditingValue(todos[index]);
    };

    const handleRemove = (indexToRemove) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((_, index) => index !== indexToRemove);
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

        setTodos((prevTodos) => [...prevTodos, inputValue.trim()]);
        setInputValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="todo-container">
                <h1 className="todo-header">Todo list</h1>

                <div className="input-field">
                    <input type="text" value={inputValue} onChange={handleChange} autoFocus />
                </div>

                <div className="todo-list">{noTodos()}</div>
            </div>
        </form>
    );
}

export default App;
