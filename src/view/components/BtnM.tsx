import 'src/scss/view/components/btnM.scss';
import logOut from 'src/img/icon-logOut.svg';
import help from 'src/img/icon-help.svg';
import logIn from 'src/img/icon-logIn.svg';
import signUp from 'src/img/icon-signUp.svg';
import type { BtnMProps } from 'src/const/type'

function BtnM(props: BtnMProps) {
    const img: { [key: string]: string } = {
        'logOut': logOut,
        'help': help,
        'logIn': logIn,
        'signUp': signUp,
    }
    const clickMethod = () => {
        if(!props.onClickMethod) return;

        props.onClickMethod()
    }
    return (
        <button className='btnM' onClick={clickMethod}>
            <p className='btnM__text'>{props.tooltip}</p>
            <img src={img[props.btnType]} alt={props.alt} />
        </button>
    )
}

export default BtnM;