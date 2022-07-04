import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  IoExitOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";
import NameContext from "./context/Name";
import TokenContext from "./context/Token";

export default function HomeScreen() {
  const navigate = useNavigate();
  const [userName] = useContext(NameContext);
  const [token] = useContext(TokenContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const promise = axios.get("http://localhost:5009/balance", config);
    promise.then((res) => {
      setTransactions(res.data);
    });
    promise.catch((err) => {
      alert(err.response.data);
      navigate("/");
    });
  }, []);

  function xablau(value) {
    return value.type === "in";
  }
  const x = transactions.filter(xablau);
  function xablau2(value) {
    return value.type === "out";
  }
  const y = transactions.filter(xablau2);

  let arrX = [];
  let arrY = [];
  let totalX = 0;
  let totalY = 0;

  function xablau3(value) {
    for (let i = 0; i < x.length; i++) {
      arrX.push(parseInt(x[i].value));
      totalX += arrX[i];
    }
  }
  xablau3();
  function xablau4(value) {
    for (let j = 0; j < y.length; j++) {
      arrY.push(parseInt(y[j].value));
      totalY += arrY[j];
    }
  }
  xablau4();

  let totalzao = totalX - totalY;

  return (
    <Body>
      <Container>
        <Header>
          <h2>Olá, {userName}</h2>
          <IoExitOutline
            size="30px"
            color="white"
            onClick={() => {
              navigate("/");
            }}
          />
        </Header>
        <Main>
          {transactions.length === 0 ? (
            <Container1>
              <Teste>
                Não há registros de
                <br /> entrada ou saída
              </Teste>
            </Container1>
          ) : (
            <>
              <div className="scroll">
                {transactions
                  .map((each) => (
                    <TransactionContainer>
                      <div className="left">
                        <Date>{each.date}</Date>
                        <NameContainer>{each.description}</NameContainer>
                      </div>
                      {each.type === "in" ? (
                        <GreenSpan>R${each.value}</GreenSpan>
                      ) : (
                        <RedSpan>R${each.value}</RedSpan>
                      )}
                    </TransactionContainer>
                  ))
                  .reverse()}
              </div>
            </>
          )}
          <TotalBalance>
            <p>Saldo</p>{" "}
            {totalzao < 0 ? (
              <RedSpan>
                <BoldSpan>R$ {totalzao}</BoldSpan>
              </RedSpan>
            ) : (
              <GreenSpan>
                <BoldSpan>R$ {totalzao}</BoldSpan>
              </GreenSpan>
            )}
          </TotalBalance>
        </Main>
        <Footer>
          <Retangle1
            onClick={() => {
              navigate("/entry");
            }}
          >
            <Space1>
              <IoAddCircleOutline size="25px" color="#ffffff" />
              <h2>
                Nova
                <br /> entrada
              </h2>
            </Space1>
          </Retangle1>
          <Retangle2
            onClick={() => {
              navigate("/spend");
            }}
          >
            <Space2>
              <IoRemoveCircleOutline size="25px" color="#ffffff" />
              <h2>
                Nova
                <br /> saída
              </h2>
            </Space2>
          </Retangle2>
        </Footer>
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
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h2 {
    padding-bottom: 20px;
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    font-family: "Raleway";
    margin-bottom: 10px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  width: 100%;
  height: 75%;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
  .scroll {
    overflow-y: scroll;
    margin-bottom: 25px;
  }
`;

const Footer = styled.div`
  width: 90vw;
  display: flex;
  justify-content: space-between;
`;

const Retangle1 = styled.div`
  height: 15vh;
  width: 42vw;
  background-color: #363636;
  border-radius: 5px;
`;

const Space1 = styled.div`
  margin: 10px 0 0 10px;
  h2 {
    font-weight: 700;
    font-size: 17px;
    font-family: "Raleway";
    color: #ffffff;
    margin-top: 35px;
  }
`;

const Retangle2 = styled.div`
  height: 15vh;
  width: 42vw;
  background-color: #363636;
  border-radius: 5px;
`;

const Space2 = styled.div`
  margin: 10px 0 0 10px;
  h2 {
    font-weight: 700;
    font-size: 17px;
    font-family: "Raleway";
    color: #ffffff;
    margin-top: 35px;
  }
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Teste = styled.div`
  text-align: center;
  color: #868686;
  font-size: 20px;
  font-family: "Raleway";
`;

const TransactionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .left {
    display: flex;
    width: 100%;
  }
`;

const Date = styled.div`
  font-family: "Raleway";
  font-size: 16px;
  color: #c6c6c6;
  margin-left: 10px;
`;

const NameContainer = styled.div`
  font-family: "Raleway";
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-hyphens: auto;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  hyphens: auto;
  text-overflow: ellipsis;
  width: 70%;
`;

const GreenSpan = styled.span`
  font-family: "Raleway";
  font-size: 16px;
  text-align: right;
  color: #03ac00;
  margin-right: 10px;
`;

const RedSpan = styled.span`
  font-family: "Raleway";
  font-size: 16px;
  text-align: right;
  color: #c70000;
  margin-right: 10px;
`;

const BoldSpan = styled.span`
  font-weight: 700;
`;

const TotalBalance = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Raleway";
  font-size: 17px;
  color: #000000;
  p {
    font-weight: bold;
    margin-left: 10px;
  }
`;
