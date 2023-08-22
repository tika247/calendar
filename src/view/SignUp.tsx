import { useState, useCallback } from 'react';
import 'src/scss/view/signUp.scss';
import { useNavigate } from "react-router-dom";
import BtnM from 'src/view/components/BtnM';
import EnterBox from "src/view/components/EnterBox";
import SignUpArrow from "src/view/components/SignUpArrow";
import { goToLogInPage } from 'src/modules/goToLogInPage';

/**
 * log in function component
 */
function SignUp() {
  const navigate = useNavigate();
  const [enteredText, setEnteredText] = useState({
    username: "",
    password: "",
    repeatPassword: ""
  });

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
   * click method to log in
   */
  const clickMethodToLogIn = () => {
    goToLogInPage(navigate);
  }


  return (
    <div className="signUp">
      <div className="signUp__contents">
        <div className='signUp__wrap'>
          <h2 className='signUp__hdg'>Sign Up</h2>
          <div className='signUp__signUp'>
            <BtnM btnType='logIn' alt='transfer to log-in-page' tooltip='log in' onClickMethod={clickMethodToLogIn}></BtnM>
          </div>
        </div>
        <EnterBox boxName="Username" stateName="username" onChildValueChange={handleStateChange} ></EnterBox>
        <EnterBox boxName="Password" stateName="password" onChildValueChange={handleStateChange} ></EnterBox>
        <EnterBox boxName="Repeat Password" stateName="repeatPassword" onChildValueChange={handleStateChange} ></EnterBox>
        <SignUpArrow enteredText={enteredText}></SignUpArrow>
      </div>
    </div>
  )
}

export default SignUp;