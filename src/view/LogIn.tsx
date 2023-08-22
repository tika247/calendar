import { useState, useEffect, useCallback } from 'react';
import 'src/scss/view/logIn.scss';
import { useNavigate } from "react-router-dom";
import BtnM from 'src/view/components/BtnM';
import EnterBox from 'src/view/components/EnterBox';
import LogInArrow from 'src/view/components/LogInArrow';
import { CustomDispatch } from 'src/store/operator';
import { getToday } from 'src/modules/getToday';
import { getCalendarTime } from 'src/modules/getCalendarTime';
import { goToSignUpPage } from 'src/modules/goToSignUpPage';

/**
 * log in function component
 */
function LogIn() {
  const navigate = useNavigate();
  const [enteredText, setEnteredText] = useState({
    username: '',
    password: ''
  });
  const customDispatch = CustomDispatch();

  /**
   * detect child component value and reflect it
   * @param valueArr
   */
  const handleStateChange = useCallback(
    (valueArr: string[]) => {
      const name = valueArr[0];
      setEnteredText((prevState) => ({
        ...prevState,
        [name]: valueArr[1],
      }));
    },
    [enteredText]
  );
  /**
 * set state in LogIn.tsx
 */
  const setAppState = () => {
    customDispatch('updateDailyTime', getToday());
    customDispatch('updateCalendarTime', getCalendarTime());
  }

  /**
   * click method to sign up
   */
  const clickMethodToSignUp = () => {
    goToSignUpPage(navigate);
  }

  /**
  * watch value change
  */
  useEffect(() => {
    setAppState();
  }, []);

  return (
    <div className='logIn'>
      <div className='logIn__contents'>
        <div className='logIn__wrap'>
          <h2 className='logIn__hdg'>Log In</h2>
          <div className='logIn__signUp'>
            <BtnM btnType='signUp' alt='transfer to sign-up-page' tooltip='sign up' onClickMethod={clickMethodToSignUp}></BtnM>
          </div>
        </div>
        <EnterBox boxName='Username' stateName='username' onChildValueChange={handleStateChange} ></EnterBox>
        <EnterBox boxName='Password' stateName='password' onChildValueChange={handleStateChange} ></EnterBox>
        <LogInArrow enteredText={enteredText}></LogInArrow>
      </div>
    </div>
  )
}

export default LogIn;