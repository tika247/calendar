import { ChangeEvent, useRef } from 'react';
import 'src/scss/view/components/enterBox.scss';
import type { EnterBoxProps } from 'src/const/type';

function EnterBox(props: EnterBoxProps) {
    /**
     * detect input change and execute onChildValueChange with input value
     * @param e
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if(!value) e.target.value = ''; // if no length, reflect it HTMLInputElement
        const valueArr = [props.stateName, value];
        props.onChildValueChange(valueArr);
    }

    /**
     * return input type according to props.boxName
     */
    const switchInputType = () => {
        return (props.stateName === 'password' || props.stateName === 'repeatPassword') ? 'password' : 'text';
    }

    return (
        <div className="enterBox">
            <span>{props.boxName}</span>
            <input type={switchInputType()} onChange={handleInputChange} />
        </div>
    )
}

export default EnterBox;