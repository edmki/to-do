export interface ITask {
    id: string;
    text: string;
    completed: boolean;
    caretPosition: number;
    focused: boolean;
}