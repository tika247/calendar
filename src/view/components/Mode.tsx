import 'src/scss/view/components/mode.scss';
import ModeAdd from 'src/view/components/ModeAdd';
import ModeEdit from 'src/view/components/ModeEdit';
import ModeDaily from 'src/view/components/ModeDaily';
import { CustomSelector } from 'src/store/operator';
import type { DailyTimeType, ModeType } from 'src/const/type';

function Mode(props: ModeType) {
    const dailyTime = CustomSelector("dailyTime") as DailyTimeType;
    const mode = props.mode;
    let headerText = null;
    switch (mode) {
        case "add":
            headerText = "Add New Schedule"
            break;
        case "edit":
            headerText = "Edit Schedule"
            break;
        case "daily":
            headerText = `${dailyTime[0]}-${dailyTime[1]}-${dailyTime[2]}`
            break;
        default:
            throw new Error("Set a proper mode!");
    }

    /**
     * get component
     * @returns {JSX.Element}
     */
    const getComponent = (): JSX.Element => {
        let targetComponent = null;

        switch (mode) {
            case "add":
                targetComponent = <ModeAdd></ModeAdd>;
                break;
            case "edit":
                targetComponent = <ModeEdit></ModeEdit>;
                break;
            case "daily":
                targetComponent = <ModeDaily></ModeDaily>;
                break;
            default:
                throw new Error("Set a proper mode!");
        }

        return targetComponent;
    }

    return (
        <div className="mode">
            <div className="mode__header">
                <h2>{headerText}</h2>
            </div>
            <div className="mode__contents">
                {getComponent()}
            </div>
        </div>
    )
}

export default Mode;