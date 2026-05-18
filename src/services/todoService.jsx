export const getTodos = () => {
    try {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};