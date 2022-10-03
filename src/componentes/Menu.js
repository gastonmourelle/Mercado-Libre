import React from 'react';
import '../Menu.css';
import { Row, Col } from 'react-bootstrap';

const Menu = () => {
    return (
        <Row>
            <Col>
                <div className="menu">
                    <img src="../img/logo.png" alt="logo"/>
                </div>
            </Col>
        </Row>

    )
}

export default Menu;
