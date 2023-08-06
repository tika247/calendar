import { ChangeEvent } from 'react';
import 'src/scss/view/components/logInBox.scss';
import type { LogInBoxProps } from 'src/const/type';

function LogInBox(props: LogInBoxProps) {
    /**
     * detect input change and execute onChildValueChange with input value
     * @param e
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const valueArr = [props.boxName, value];
        props.onChildValueChange(valueArr);
    }

    /**
     * return input type according to props.boxName
     */
    const switchInputType = () => {
        return (props.boxName === 'password') ? 'password' : 'text';
    }

    return (
        <div className="logInBox">
            <span>{props.boxName}</span>
            <input type={switchInputType()} onChange={handleInputChange} />
        </div>
    )
}

export default LogInBox;