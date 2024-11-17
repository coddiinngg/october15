import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ login, setLogin, setAuthenticate }) => {
  const [on, setOn] = useState(false);
  const [sideBox,setSideBox] =useState (false)
  const onOff = () => {
    setOn(!on);
  };
  const menus = ["Women", "Men", "Baby", "Kids", "Home", "Sale"];
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToMain = () => {
    navigate("/");
  };

  const search = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value;
      navigate(`/?q=${keyword}`);
    }
  };
  const LogoutProcess = () => {
    setLogin(false);
    setAuthenticate(false);
    navigate("/");
  };
  return (
    <div>
      <Container>
        <div className={sideBox ? "main-box main-box-visible" : "main-box"}>
          <div className="sub-box">
            <h1>MENUS</h1>
            <h3 onClick={()=>setSideBox(false)} >X</h3>
            <ul>
              {menus.map((menu) => (
                <li>{menu}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar">
          <div className="navbar-burger">
            <FontAwesomeIcon icon={faBars} onClick={()=>setSideBox(true)}/>
          </div>
          <div className="navbar-search">
            <FontAwesomeIcon onClick={() => onOff()} icon={faSearch} />
            <input
              onKeyPress={(event) => search(event)}
              className={
                on ? "navbar-search-input visible" : "navbar-search-input"
              }
              type="text"
              placeholder="제품검색"
            />
          </div>
          <div className="navbar-login">
          <FontAwesomeIcon
              icon={faUser}
              className="navbar-login-img"
            />
            {login ? (
              <div onClick={() => LogoutProcess()}>로그아웃</div>
            ) : (
              <div onClick={goToLoginPage}>로그인</div>
            )}
          </div>
          <div className="navbar-logo">
            <img
              onClick={goToMain}
              width={100}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png"
              alt="H&M"
            ></img>
          </div>
          <div className="navbar-menus">
            <ul>
              {menus.map((menu) => (
                <li>{menu}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
