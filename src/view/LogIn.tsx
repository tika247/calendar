import { useState, useEffect, useCallback } from 'react';
import 'src/scss/view/logIn.scss';
import LogInBox from "src/view/components/LogInBox";
import LogInArrow from "src/view/components/LogInArrow";
import { CustomDispatch } from 'src/store/operator';

/**
 * log in function component
 */
function LogIn() {
  const [isEntered, setEntered] = useState(false);
  const [enteredText, setEnteredText] = useState({
    username: "",
    password: ""
  });
  const customDispatch = CustomDispatch();

  /**
   * validate entered text
   */
  const validateEntered = () => {
    const condition1 = Object.values(enteredText).some((val) => val.length === 0);
    // TODO: validation e.g. URL enconging string
    const condition2 = true;
    const condition = condition1 && condition2;

    const enteredState = condition ? false : true;
    setEntered(enteredState);
  }

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
  * watch value change
  */
  useEffect(() => {
    validateEntered();

    customDispatch("updateCurrentUser", enteredText);
  }, [enteredText]);

  return (
    <div className="logIn">
      <div className="contents">
        <h2 className="hdg-02">Log In</h2>
        <LogInBox boxName="username" onChildValueChange={handleStateChange} ></LogInBox>
        <LogInBox boxName="password" onChildValueChange={handleStateChange} ></LogInBox>
        <LogInArrow enteredState={isEntered}></LogInArrow>
      </div>
    </div>
  )
}

export default LogIn;