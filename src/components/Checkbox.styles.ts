import styled from "styled-components";
import { Done } from "@styled-icons/material";

export const DoneIcon = styled(Done)`
    color: #fff;
    transform: translateY(15px);
    transition: transform 0.15s;
`;

export const Input = styled.input`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
`;

type StyledCheckboxProps = {
    checked: boolean;
}

export const StyledCheckbox = styled.span<StyledCheckboxProps>`
    height: 20px;
    width: 20px;
    border-radius: 5px;
    background-color: ${props => props.checked ? '#00bcd4' : '#fff'};
    border: 1px solid #00bcd4;
    display: inline-block;
    overflow: hidden;
    transition: background-color 0.3s;
    cursor: pointer;
    ${props => props.checked && `
        ${DoneIcon} {
            transform: translateY(0);
        }
    `}
`;