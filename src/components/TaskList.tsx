import { useEffect, useState } from "react";
import { Container } from "./TaskList.styles";
import Task from "./Task";
import { ITask } from "../types";

type TaskListProps = {
    initialTasks: ITask[];
}

const TaskList = ({ initialTasks } : TaskListProps ) => {
    const [tasks, setTasks] = useState<ITask[]>(initialTasks);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks.map(task => ({ id: task.id, text: task.text, completed: task.completed }))));
    }, [tasks]);


    const handleAdd = (prevTaskId: string, text: string) => {
        const addTask = (tasks: ITask[]) => {
            const prevTaskIndex = tasks.findIndex(task => task.id === prevTaskId);
            const newTasks = [ ...tasks ];
            newTasks.splice(prevTaskIndex + 1, 0, { id: Date.now().toString(), text, completed: false, caretPosition: 0, focused: true });
            return newTasks;
        }

        setTasks(addTask);
    }

    const handleChange = (id: string, text: string) => {
        setTasks(prevState => prevState.map(task => (task.id === id ? { ...task, text } : task)));
    }

    const handleDelete = (id: string) => {
        if (tasks.length === 1) return;
        setTasks(prevState => prevState.filter(task => task.id !== id));
    }

    const handleJoinTasks = (id: string, text: string) => {
        const index = tasks.findIndex(task => task.id === id);

        if (index === 0) return;

        const newTasks = [ ...tasks ];
        const oldText = newTasks[index - 1].text;

        newTasks[index - 1].text = oldText + text;
        newTasks[index - 1].caretPosition = oldText.length;
        newTasks[index - 1].focused = true;

        newTasks.splice(index, 1);

        setTasks(newTasks);
    }

    const handleFocus = (id: string) => {
        setTasks(prevState => prevState.map(task => (task.id === id ? { ...task, focused: true } : task)));
    }

    const handleBlur = (id: string) => {
        setTasks(prevState => prevState.map(task => (task.id === id ? { ...task, focused: false } : task)));
    }

    const handleToggleCompleted = (id: string, completed: boolean) => {
        setTasks(prevState => prevState.map(task => (task.id === id ? { ...task, completed } : task)));
    }

    const handleArrowNavigate = (id: string, direction: "up" | "down") => {
        const index = tasks.findIndex(task => task.id === id);

        if (direction === "up" && index === 0) return;
        if (direction === "down" && index === tasks.length - 1) return;

        const newIndex = direction === "up" ? index - 1 : index + 1;

        const newTasks = [ ...tasks ];
        newTasks[newIndex].focused = true;
        newTasks[index].focused = false;

        setTasks(newTasks);
    }

    return (
        <Container>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    text={task.text}
                    completed={task.completed}
                    caretPosition={task.caretPosition}
                    focused={task.focused}
                    onToggleCompleted={(completed) => handleToggleCompleted(task.id, completed)}
                    onChange={(newText) => handleChange(task.id, newText)}
                    onAdd={(newText) => handleAdd(task.id, newText)}
                    onDelete={() => handleDelete(task.id)}
                    onJoinTasks={() => handleJoinTasks(task.id, task.text)}
                    onBlur={() => handleBlur(task.id)}
                    onFocus={() => handleFocus(task.id)}
                    onArrowNavigate={(direction) => handleArrowNavigate(task.id, direction)}
                />
            ))}
        </Container>

    )
}

export default TaskList;