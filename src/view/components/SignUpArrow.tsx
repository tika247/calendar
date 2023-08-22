import { useCallback } from 'react';
import 'src/scss/view/components/signUpArrow.scss';
import { myAxios } from 'src/const/myAxios';
import { ERROR_SIGNUP } from 'src/const/errorMessage';
import { CustomDispatch } from 'src/store/operator';
import type { SignUpArrowType, ResRegisterUserType } from 'src/const/type';
import { goToHomePage } from 'src/modules/goToHomePage';
import { setLocalStorageToken } from 'src/modules/setLocalStorageToken';
import { switchArrowClickable } from 'src/modules/switchArrowClickable';
import { useNavigate } from 'react-router-dom';

function SignUpArrow(props: SignUpArrowType) {
    const customDispatch = CustomDispatch();
    const navigate = useNavigate();
    const { enteredText } = props;

    /**
     * set localStorage ID
     */
    const setLocalStorageUserID = async (key: string, userID: string) => {
        localStorage.setItem(key, userID);
    }

    /**
     * validateEnterBox
     */
    const validateEnterBox = async () => {
        let errorMessage = null;

        const condition1 = Object.values(enteredText).some((val) => val.length === 0);
        if (condition1) errorMessage = ERROR_SIGNUP.empty;

        const condition2 = enteredText['password'] === enteredText['repeatPassword'];
        if (!condition2) errorMessage = ERROR_SIGNUP.repeatPassword;

        if (errorMessage) alert(errorMessage);

        return errorMessage ? false : true;
    }

    /**
     * get session ID from server
     * @returns {Promise<string | null>} errorMessage || null
     */
    const registerUser = async (): Promise<string | null> => {
        if (!enteredText) return null;

        const params = {
            reqType: 'registerUser',
            username: enteredText.username,
            password: enteredText.password
        }

        const res: Promise<ResRegisterUserType | string> = await myAxios.post('', params)
            .then(res => {
                return res.data
            })
            .catch((err) => {
                return err.response
            });

        let errorMessage = null;

        if (!Array.isArray(res)) {
            errorMessage = res as Promise<string>;
        } else {
            const [token, userID, schedule] = res;
            customDispatch('updateToken', token);
            customDispatch('updateSchedule', schedule);
            customDispatch('updateCurrentUser', enteredText);
            await setLocalStorageToken('token', token as string);
            await setLocalStorageUserID('userID', String(userID));
            goToHomePage(navigate);
        }

        return errorMessage;
    }

    /**
     * alertErrorMessage
     * @param {string} resErrorMessage
     */
    const alertErrorMessage = (resErrorMessage: string) => {
        alert(ERROR_SIGNUP[resErrorMessage]);
    }

    /**
     * detect arrow cliced
     */
    const handleArrowClicked = useCallback(
        async () => {
            const result = await validateEnterBox();
            if (!result) return;
            const resErrorMessage = await registerUser();
            if (!resErrorMessage) return;
            alertErrorMessage(resErrorMessage);
        },
        [enteredText]
    );

    return (
        <div className='signUpArrow'>
            <button onClick={handleArrowClicked} aria-disabled={`${switchArrowClickable(enteredText) ? 'true' : 'false'}`}>
                <svg xmlns='http://www.w3.org/2000/svg' width='17.174' height='7.4' viewBox='0 0 17.174 7.4'>
                    <path id='path' d='M-192.974,375.821h16.316' transform='translate(192.974 -372.121)' fill='none' stroke='#95bbca' strokeLinecap='round' strokeWidth='1' />
                    <line id='line' y1='3' x2='4' transform='translate(12.474 3.7)' fill='none' stroke='#95bbca' strokeLinecap='round' strokeWidth='1' />
                    <line id='line-2' data-name='line' x2='4' y2='3' transform='translate(12.474 0.7)' fill='none' stroke='#95bbca' strokeLinecap='round' strokeWidth='1' />
                </svg>
            </button>
        </div>
    )
}

export default SignUpArrow;