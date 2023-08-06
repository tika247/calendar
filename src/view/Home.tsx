import 'src/scss/view/home.scss';
import BtnM from 'src/view/components/BtnM';
import BtnL from 'src/view/components/BtnL';
import ModeNormal from 'src/view/components/ModeNormal';
import Mode from 'src/view/components/Mode';
import BtnAdd from 'src/view/components/BtnAdd';
import { HomeType } from 'src/const/type';
import back from 'src/img/icon-back.svg';
import { CustomSelector, CustomDispatch } from 'src/store/operator';
import { goToHelpPage } from 'src/modules/goToHelpPage';
import { goToLogOutPage } from 'src/modules/goToLogOutPage';
import { useNavigate } from "react-router-dom";

function Home(props: HomeType) {
  const currentMode = CustomSelector("currentMode");
  const customDispatch = CustomDispatch();
  const navigate = useNavigate();

  const getButtonBack = (): JSX.Element | false => {
    const updateCurrentMode = () => {
      customDispatch("updateCurrentMode", "normal")
    }
    const condition = currentMode === 'daily';
    const buttonBack = <button className="home__back" onClick={updateCurrentMode}><img src={back} alt="" /></button>

    return condition ? buttonBack : false;
  }
  /**
   * get component
   * @returns {JSX.Element}
   */
  const getModeComponent = (): JSX.Element => {
    let targetComponent = null;
    const mode = props.mode;

    switch (mode) {
      case "normal":
        targetComponent = <ModeNormal></ModeNormal>;
        break;
      case "add":
        targetComponent = <Mode mode='add'></Mode>;
        break;
      case "edit":
        targetComponent = <Mode mode='edit'></Mode>;
        break;
      case "daily":
        targetComponent = <Mode mode='daily'></Mode>;
        break;
      default:
        throw new Error("Set a proper type!");
    }

    return targetComponent;
  }

  /**
   * click method
   */
  const clickMethodInHelp = () => {
    goToHelpPage(navigate);
  }

  /**
   * click method
   */
  const clickMethodInLogOut = () => {
    goToLogOutPage(navigate);
  }

  return (
    <div className="home">
      {getButtonBack()}
      <div className="home__btnWrap">
        <BtnM btnType="help" alt="get help information about this App" onClickMethod={clickMethodInHelp}></BtnM>
        <BtnM btnType="logout" alt="log out from this App" onClickMethod={clickMethodInLogOut}></BtnM>
      </div>
      {getModeComponent()}

      <BtnAdd></BtnAdd>
    </div>
  )
}

export default Home;
