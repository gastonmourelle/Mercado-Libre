import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./Publicacion.css";
import {IoMdHeartEmpty} from 'react-icons/io';

const Publicacion = (props) => {
  /* console.log(props); */
  let titulo = props.title;
  let foto = props.thumbnail;
  let precio = props.price;
  let condicion;
  props.condition === "new" ? (condicion = "Nuevo") : (condicion = "Usado");
  let moneda;
  props.currency_id === "USD" ? (moneda = "U$S ") : (moneda = "$ ");
  /* let disponibles = props.available_quantity; */

  return (
    <>
      <Card className="publicacion">
        <Row>
          <Col>
            <img alt={titulo} src={foto} />
          </Col>
          <Col>
            <p style={{ paddingRight: "20px", fontSize: "16px" }}>{titulo}</p>
            <h2 style={{ fontSize: "26px" }}>
              {moneda}
              {precio}
            </h2>
            <p style={{ color: "green" }}>{condicion}</p>
            <a className="aIconos" href="#"><IoMdHeartEmpty/></a>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Publicacion;
