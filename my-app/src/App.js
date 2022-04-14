import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Login from "./components/Login"
import Regester from './components/Regester';
import Authentication from "./components/Authentication";


function App() {
  let [btnLog , setBtnLog] = useState(true)
  let [btnReg , setBtnReg] = useState(false)
  let [colorBtnLog,setColorBtnLog]=useState("rgb(15, 172, 133)");
  let [colorBtnReg,setColorBtnReg]=useState("#384c55");

  let showRegester = ()=>{
    if(btnReg === false){
      setBtnReg(true);
      setColorBtnReg("rgb(15, 172, 133)");
      setBtnLog(false);
      setColorBtnLog("#384c55");
    }
    else{
      setColorBtnLog("#384c55");
      setColorBtnReg("rgb(15, 172, 133)");
    }
  }

  let showLogin = ()=>{
    if(btnLog === false){
      setBtnLog(true);
      setColorBtnLog("rgb(15, 172, 133)");
      setBtnReg(false);
      setColorBtnReg("#384c55")
    }
    else{
      setColorBtnLog("rgb(15, 172, 133)");
      setColorBtnReg("#384c55")
    }
  }

  return (
    <Authentication>
      <Container className=' container-form'>
      <Row className="justify-content-center">
        <button style={{backgroundColor:colorBtnLog}} onClick={showLogin} className='col-5 btn-form mt-4'>ورود</button>
        <button style={{backgroundColor:colorBtnReg}} onClick={showRegester} className='col-5 btn-form mt-4'>ثبت نام</button>
        <div>
            {btnLog  && <Login/>}
            {btnReg && <Regester/>}
        </div>
      </Row>
      </Container>
      <Container>
          <Row className='m-5'>
            <Col className="d-flex justify-content-center m-5">
            </Col>
          </Row>
        </Container>
    </Authentication>
  );
}

export default App;