import { ITask } from "./types";

export const getInitialTasks = () : ITask[] => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        const parsedTasks = JSON.parse(tasks);
        if (Array.isArray(parsedTasks)) {
            return parsedTasks.map(task => ({ ...task, caretPosition: 0, focused: false }));
        }
    }
    
    return [{ id: Date.now().toString(), text: "", completed: false, caretPosition: 0, focused: true }];
}