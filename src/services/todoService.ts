export const getTodos = () => {
    try {
        const saved: any = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const saveTodos = (todos: { id: string, text: string, completed: boolean }[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
