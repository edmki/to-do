import { useState } from "react";
import { Input, StyledCheckbox, DoneIcon } from "./Checkbox.styles";

type CheckboxProps = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox = ({ checked = false, onChange } : CheckboxProps) => {
    const [checkedState, setCheckedState] = useState(checked);

    const handleChange = () => {
        setCheckedState(!checkedState);
        onChange?.(!checkedState);
    }

    return (
        <div>
            <label >
                <StyledCheckbox checked={checkedState} aria-hidden={true}><DoneIcon/></StyledCheckbox>
                <Input
                    type="checkbox" 
                    checked={checked}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}

export default Checkbox