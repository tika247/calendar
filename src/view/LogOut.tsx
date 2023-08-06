import { myAxios } from 'src/const/myAxios';
import 'src/scss/view/logOut.scss';
import BtnBox from "src/view/components/BtnBox";
import { goToHomePage } from 'src/modules/goToHomePage';
import { goToLogInPage } from 'src/modules/goToLogInPage';
import { useNavigate } from "react-router-dom";

/**
 * log in function component
 */
function LogOut() {
  const navigate = useNavigate();

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

    const params = {
      reqType: "removeSessionStorage"
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
   * check button clicked method
   */
  const checkMethod = async () => {
    await removeStorage();
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