import { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import TokenContext from "./context/Token";
import NameContext from "./context/Name";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useContext(TokenContext);
  const [userName, setUserName] = useContext(NameContext);

  const navigate = useNavigate();

  function singIn() {
    const body = {
      email,
      password,
    };
    const promise = axios.post("http://localhost:5009/sections", body);
    promise
      .then((res) => {
        setToken(res.data.token);
        setUserName(res.data.name);
        navigate("/home");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <Body>
      <Container>
        <h2>MyWallet</h2>
        <Input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={singIn}>Entrar</Button>
        <Link to="/singup">
          <H3>Primeira vez? Cadastre-se!</H3>
        </Link>
      </Container>
    </Body>
  );
}

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1c1c1c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    padding-bottom: 30px;
    color: #ffffff;
    font-size: 32px;
    font-family: "Poppins";
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  height: 58px;
  width: 326px;
  border-radius: 8px;
  color: #000000;
  font-size: 20px;
  padding-left: 14px;
  font-family: "Raleway";
  border: 0px solid red;
  ::placeholder {
    color: #000000;
    opacity: 0.75;
  }
`;

const Button = styled.div`
  height: 46px;
  width: 343px;
  border-radius: 8px;
  background-color: #363636;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway";
  margin: 0px 0px 30px 0px;
`;

const H3 = styled.h3`
  font-family: "Raleway";
  font-size: 15px;
  color: #ffffff;
  text-decoration-line: underline;
`;
