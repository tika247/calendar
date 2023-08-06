import 'src/scss/view/components/btnM.scss';
import logout from 'src/img/icon-logout.svg';
import help from 'src/img/icon-help.svg';
import type { BtnMProps } from 'src/const/type'

function BtnM(props: BtnMProps) {
    const img: { [key: string]: string } = {
        "logout": logout,
        "help": help,
    }
    const clickMethod = () => {
        if(!props.onClickMethod) return;

        props.onClickMethod()
    }
    return (
        <button className="btnM">
            <img src={img[props.btnType]} alt={props.alt} onClick={clickMethod} />
        </button>
    )
}

export default BtnM;