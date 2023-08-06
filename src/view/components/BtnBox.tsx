import 'src/scss/view/components/btnBox.scss';
import cancel from 'src/img/icon-cancel.svg';
import ok from 'src/img/icon-ok.svg';
import type { BtnBoxProps } from 'src/const/type';

/**
 * @param props 
 * @returns 
 */
function BtnBox(props: BtnBoxProps) {
    /**
     * cancel button clicked
    */
    const cancelMethod = () => {
        if(typeof props.onCancelMethod !== 'function') return;
        props.onCancelMethod();
    }
    /**
     * check button clicked
     */
    const checkMethod = (e: any) => {
        if (!e.currentTarget) return;
        props.onCheckMethod(e);
    }
    return (
        <div className="btnBox">
            <div className="btnBox__box">
                <button className="btnBox__btn" onClick={cancelMethod}>
                    <img src={cancel} alt="" />
                </button>
                <button className="btnBox__btn" onClick={checkMethod}>
                    <img src={ok} alt="" />
                </button>
            </div>
        </div>
    );
}

export default BtnBox;