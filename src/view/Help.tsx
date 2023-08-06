import 'src/scss/view/help.scss';
import BtnL from "src/view/components/BtnL";
import { goToHomePage } from 'src/modules/goToHomePage';
import { useNavigate } from "react-router-dom";

/**
 * log in function component
 */
function Help() {
  const navigate = useNavigate();

  /**
   * cancel button clicked method
   */
  const cancelMethod = () => {
    goToHomePage(navigate);
  }

  return (
    <div className="help">
      <div className="contents">
        <h2 className="title">Usage</h2>
        <ul className="list">
          <li>aaaaaaaaaaaaaaaaaaaaaaa</li>
          <li>bbbbbbbbbbbbbbbbbbbbbb</li>
          <li>ccccccccccccccccccc</li>
          <li>ddddddddddddddddddddddddddddd</li>
        </ul>
        <h2 className="title">Note</h2>
        <ul className="list">
          <li>aaaaaaaaaaaaaaaaaaaaaaa</li>
          <li>bbbbbbbbbbbbbbbbbbbbbb</li>
          <li>ccccccccccccccccccc</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>dddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
          <li>ddddddddddddddddddddddddddddd</li>
        </ul>
      </div>
      <BtnL btnType="cancel" clickMethod={cancelMethod}></BtnL>
    </div>
  )
}

export default Help;