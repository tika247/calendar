import 'src/scss/view/components/btnL.scss';

import add from 'src/img/icon-add.svg';
import cancel from 'src/img/icon-cancel.svg';
import ok from 'src/img/icon-ok.svg';
import type { BtnLProps } from 'src/const/type'

function BtnL(props: BtnLProps) {

    const img: { [key: string]: string } = {
        "add": add,
        "cancel": cancel,
        "ok": ok,
    }

    const getClickMethod = () => {
        return props.clickMethod ? props.clickMethod : undefined;
    }

    return (
        <button className="btnL" onClick={getClickMethod()}>
            <img src={img[props.btnType]} alt="" />
        </button>
    );
}

export default BtnL;