import { useHistory } from "react-router-dom";
import "./Header.sass";

const Header = () => {
  const history = useHistory()

  return (
    <div className="header-wrapper">
      <div className="options">
        <div className="menu-option" onClick={() => history.push("/")}>
          Home
        </div>
        <div className="menu-option" onClick={() => history.push("/")}>
          User Guide
        </div>
        <div className="menu-option" onClick={() => history.push("/")}>
          Tutorial
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;