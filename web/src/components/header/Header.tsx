import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Header.css";
import Logo from "../../assets/logo.png";
import HomeIcon from "../../assets/home-outlined.svg";
import AddIcon from "../../assets/add-outlined.svg";
import ProfileIcon from "../../assets/profile.svg";
import SettingsIcon from "../../assets/settings.svg";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [cookies, , removeCookie] = useCookies(["XSRF-TOKEN", "sessionid"]);
  const nav = useNavigate();

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleAuth = () => {
    if (!cookies["XSRF-TOKEN"]) {
      nav("/signin");
    } else {
      removeCookie("XSRF-TOKEN");
      removeCookie("sessionid");
      localStorage.removeItem("userId");
      window.location.replace("/");
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav-center"></div>
      <div className="nav-right">
        <span className="nav-item">
          <Link to="/">
            <img src={HomeIcon} alt="HomeIcon" />
          </Link>
        </span>
        <span className="nav-item">
          <Link to="/">
            <img src={AddIcon} alt="AddIcon" />
          </Link>
        </span>
        <span className="nav-item" onClick={toggleMenu}>
          <img
            className="nav-item-profile"
            src={ProfileIcon}
            alt="ProfileImg"
          />
          <div className="nav-menu">
            <div
              className={
                "nav-menu-container" +
                (menu ? " nav-menu-container-show" : " nav-menu-container-hide")
              }
            >
              <div className="nav-menu-container-tail"></div>
              <div className="nav-menu-item-list">
                <Link className="icon-label-container" to="/">
                  <img src={ProfileIcon} alt="ProfileIcon" />
                  <span className="icon-label">프로필</span>
                </Link>
                <Link className="icon-label-container" to="/settings">
                  <img src={SettingsIcon} alt="SettingsIcon" />
                  <span className="icon-label">설정</span>
                </Link>
                <div
                  className="icon-label-container nav-menu-logout"
                  onClick={handleAuth}
                >
                  <span className="icon-label">
                    {cookies["XSRF-TOKEN"] ? "로그아웃" : "로그인"}
                  </span>
                </div>
              </div>
            </div>
            <div
              id="menu-background"
              className={menu ? "menu-background-show" : "menu-background-hide"}
            ></div>
          </div>
        </span>
      </div>
    </nav>
  );
};

export default Header;
