import 'src/scss/view/components/btnAdd.scss';
import BtnL from 'src/view/components/BtnL';
import { CustomSelector, CustomDispatch } from 'src/store/operator';

function BtnAdd() {
    const currentMode = CustomSelector("currentMode");
    const customDispatch = CustomDispatch();
    /**
     * show ModalAdd
     */
    const showModeAdd = () => {
        customDispatch("updateCurrentMode", "add");
    }

    const getOptionalClass = () => {
        const condition = currentMode === "normal" || currentMode === "daily";
        const optional = condition ? "" : " --hide";
        return `btnAdd${optional}`;
    }
    return (
        <div className={getOptionalClass()}>
            <BtnL btnType="add" clickMethod={showModeAdd}></BtnL>
        </div>
    )
}

export default BtnAdd;