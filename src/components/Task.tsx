import { useEffect, useRef, useState } from "react";
import Checkbox from "./Checkbox";
import { DeleteButton, DeleteIcon, Input } from "./Task.styles";
import { Container } from "./Task.styles";

type TaskProps = {
    text?: string;
    completed?: boolean;
    caretPosition?: number;
    focused?: boolean;
    onToggleCompleted?: (checked: boolean) => void;
    onChange?: (text: string) => void;
    onAdd?: (text: string) => void;
    onDelete?: () => void;
    onJoinTasks?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onArrowNavigate?: (direction: "up" | "down") => void;
    innerRef?: (input: HTMLInputElement) => void;
}

const Task = ({ text = "", completed = false, caretPosition = 0, focused = true, onToggleCompleted, onChange, onAdd, onDelete, onJoinTasks, onBlur, onFocus, onArrowNavigate } : TaskProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [mouseOver, setMouseOver] = useState(false);

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(caretPosition, caretPosition);
        }
    }, [focused, caretPosition]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const caretPosition = e.currentTarget.selectionStart || 0;
            const textBeforeCaret = e.currentTarget.value.slice(0, caretPosition);
            const textAfterCaret = e.currentTarget.value.slice(caretPosition);
            
            onAdd?.(textAfterCaret);
            onChange?.(textBeforeCaret);
        } else if (e.key === "Backspace") {
            const isCaretAtStart = e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === 0;
            if (isCaretAtStart) {
                e.preventDefault();
                onJoinTasks?.();
            }
        } else if (e.key === "ArrowUp") {
            onArrowNavigate?.("up");
        } else if (e.key === "ArrowDown") {
            onArrowNavigate?.("down");
        }
    }

    const handleCheckboxChange = (checked: boolean) => {
        onToggleCompleted?.(checked);
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Container onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
            <DeleteButton hidden={!mouseOver} onClick={handleDelete}>
                <DeleteIcon />
            </DeleteButton>
            <Checkbox checked={completed} onChange={handleCheckboxChange} />
            <Input 
                ref={inputRef}
                type="text"
                value={text}
                placeholder="Add a task..."
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onBlur={() => onBlur?.()}
                onFocus={() => onFocus?.()}
                lineThrough={completed}
            />
        </Container>
    );
}

export default Task;