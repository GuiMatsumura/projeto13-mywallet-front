import { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TokenContext from "./context/Token";

export default function OutputScreen() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const [token, setToken] = useContext(TokenContext);

  const navigate = useNavigate();

  function spendMoney() {
    const body = {
      value,
      description,
      type: "out",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = axios.post("http://localhost:5009/balance", body, config);
    promise
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <Body>
      <Container>
        <h2>Nova saída</h2>
        <Input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={spendMoney}>Salvar saída</Button>
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
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h2 {
    padding-bottom: 30px;
    color: #ffffff;
    font-size: 32px;
    font-family: "Poppins";
    margin-bottom: 20px;
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
