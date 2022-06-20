import styled from "styled-components";
import { Delete } from "@styled-icons/material";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
    position: relative;
    padding-left: 45px;
`;

type InputProps = {
    lineThrough: boolean;
}

export const Input = styled.input<InputProps>`
    all: unset;
    height: 25px;
    margin-left: 10px;
    flex: 1;
    text-decoration: ${props => props.lineThrough ? 'line-through' : 'none'};
`;

export const DeleteIcon = styled(Delete)`
`;

type DeleteButtonProps = {
    hidden: boolean;
}

export const DeleteButton = styled.button<DeleteButtonProps>`
    all: unset;
    cursor: pointer;
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 50%;
    color: #b2b2b2;
    position: absolute;
    left: 0;
    top: 50%;
    @media(min-width: 800px) {
        ${props => props.hidden && `
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            height: 1px;
            width: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
        `}
    }
    transform: translateY(-50%);
    &:hover, &:focus {
        color: #7b7b7b;
        background-color: #e5e5e5;
    }
    &:active {
        background-color: #b2b2b2;
    }
`;