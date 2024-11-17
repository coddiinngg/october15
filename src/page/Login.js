import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Login = ({ setLogin , setAuthenticate }) => {

  console.log(typeof setAuthenticate);
  const navigate = useNavigate();

  const LoginProcess = () => {
    setAuthenticate(true);
    setLogin(true);
    navigate("/");
  };

  return (
    <div>
      <Container className="Login-page">
        <h1>Login</h1>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <input type="text" placeholder="Username"></input>
        </div>
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input type="text" placeholder="Password"></input>
        </div>
        <button onClick={LoginProcess}>Login</button>
      </Container>
    </div>
  );
};

export default Login;
