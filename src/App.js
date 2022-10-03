import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Menu';
import Productos from './componentes/Productos'
import Slider from './componentes/Slider'
import Top from './componentes/Top'
/* import Button from 'react-bootstrap/Button'; */

import { Container, Row, Col } from 'react-bootstrap';

const App = () => {

  return (<Container>
    <Top/>
    <Menu />
    <Slider/>
    <Row>
      <Col>
        <Productos/>
      </Col>
    </Row>
  </Container >
  );
}

export default App;
