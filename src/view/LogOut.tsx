import { myAxios } from 'src/const/myAxios';
import 'src/scss/view/logOut.scss';
import BtnBox from "src/view/components/BtnBox";
import { goToHomePage } from 'src/modules/goToHomePage';
import { goToLogInPage } from 'src/modules/goToLogInPage';
import { useNavigate } from "react-router-dom";
import { CustomDispatch } from 'src/store/operator';
import { getStoredToken } from 'src/modules/getStoredToken';

/**
 * log in function component
 */
function LogOut() {
  const navigate = useNavigate();
  const customDispatch = CustomDispatch();
  const token = getStoredToken();

  /**
   * cancel button clicked method
   */
  const cancelMethod = () => {
    goToHomePage(navigate);
  }

  /**
   * remove localStorage
   */
  const removeStorage = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

  /**
   * remove PHP session
   */
  const removePHPSession = async () => {
    const params = {
      reqType: "removeSessionStorage",
      token: token,
    }

    await myAxios.post("", params)
      .then(res => {
        return res.data
      })
      .catch((err) => {
        return err.response
      });
  }

  /**
   * reset redux
   */
  const resetRedux = async () => {
    customDispatch("updateCurrentUser", {
      username: null,
      password: null,
    });
    customDispatch("updateDailyTime", ['', '', '', '']);
    customDispatch("updateToken", null);
    customDispatch("updateCurrentMode", 'normal');
    customDispatch("updateSchedule", [
      {
        id: "",
        title: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        memo: ""
      }
    ]);
    customDispatch("updateEditTarget", {
      id: "",
      title: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      memo: ""
    });
    customDispatch("updateCalendarTime", {
      calendarYear: "0",
      calendarMonth: "0",
    });
  }

  /**
   * check button clicked method
   */
  const checkMethod = async () => {
    await removeStorage();
    await removePHPSession();
    await resetRedux();
    goToLogInPage(navigate);
  }

  return (
    <div className="logOut">
      <div className="contents">
        <em className="text">Sure to Log Out?</em>
        <BtnBox boxType="logOut" onCancelMethod={cancelMethod} onCheckMethod={checkMethod}></BtnBox>
      </div>
    </div>
  )
}

export default LogOut;