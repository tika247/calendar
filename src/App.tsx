import 'src/scss/App.scss';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "src/view/LogIn";
import LogOut from "src/view/LogOut";
import Help from "src/view/Help";
import Home from "src/view/Home";
import SignUp from "src/view/SignUp";
import { CustomSelector, CustomDispatch } from 'src/store/operator';
import { CurrentModeType } from 'src/const/type';
import { useEffect } from 'react';
import { myAxios } from 'src/const/myAxios';
import type { ScheduleType } from 'src/const/type'
import { getToday } from 'src/modules/getToday';
import { getCalendarTime } from 'src/modules/getCalendarTime';

/**
 * App
 * @todo getLocalStorageToken()使いすぎ。再考する
 */
function App() {
  const customDispatch = CustomDispatch();
  const currentMode = CustomSelector("currentMode") as CurrentModeType;

  /**
 * get session id from local storage
 * @returns {string}
 */
  const getLocalStorageToken = () => {
    const str: string | null = localStorage.getItem("token");
    if (!str) return;

    const res = JSON.parse(str);
    const id = res.value;
    const expiry = res.expiry;

    const date = new Date();
    const nowDate = date.getTime();

    // check if localStorage is valid
    if ((expiry > nowDate) && (id.length > 0)) {
      return id;
    } else {
      return null;
    }
  }

  /**
 * get userID from local storage
 * @returns {string}
 */
  const getLocalStorageUserID = async () => {
    const userID: string | null = localStorage.getItem("userID");
    return userID;
  }

  /**
   * set initial schedule
  */
  const setInitialSchedule = async () => {
    const userID = await getLocalStorageUserID();
    if (!userID) return;

    const params = {
      reqType: "getInitialSchedule",
      token: getLocalStorageToken(),
      userID: userID,
    }

    const res: Promise<[ScheduleType]> = await myAxios.post("", params)
      .then(res => {
        return res.data
      })
      .catch((err) => {
        return err.response
      });

    customDispatch("updateSchedule", res);
  }

  /**
   * set state in App.tsx
   */
  const setAppState = () => {
    customDispatch("updateToken", getLocalStorageToken());
    customDispatch("updateDailyTime", getToday());
    customDispatch("updateCalendarTime", getCalendarTime());
  }

  /**
 * switch first page
 * @returns {ReactComponentElement}
 */
  const getFirstPage = () => {
    const token = getLocalStorageToken();
    const exist = <Routes>
      <Route path="/" element={<Home mode={currentMode} />} />
      <Route path="/home" element={<Home mode={currentMode} />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/logOut" element={<LogOut />} />
      <Route path="/help" element={<Help />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>;

    const notExisit = <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<Home mode={currentMode} />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/logOut" element={<LogOut />} />
      <Route path="/help" element={<Help />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>;

    const result = (token) ? exist : notExisit;
    return result;
  }

  /**
 * initialize
*/
  const init = async () => {
    setAppState();
    getLocalStorageToken();
    await setInitialSchedule();
  }

  /**
   * useEffect
   * @desc while rendering, state or store (which is a trigger of other component updating) cannot be updated. Therefore wrap with useEffect()
  */
  useEffect(() => {
    init();
  }, []);

  return (
    <div className='app'>
      <Router>
        {getFirstPage()}
      </Router>
    </div>
  )
}

export default App;
