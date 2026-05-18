export type Todo = { id: string, text: string, completed: boolean };

export const getTodos = (): Todo[] => {
    try {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const saveTodos = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
