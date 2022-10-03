import React, { useRef, useState } from "react";
import Publicacion from "./Publicacion";
import {
  Accordion,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import {FiChevronDown} from 'react-icons/fi';

const Productos = () => {
  const productoRef = useRef(null);
  const minimoRef = useRef(null);
  const maximoRef = useRef(null);
  const condicionRef = useRef(null);
  const [productos, setProductos] = useState([]);
  const [productosMostrar, setProductosMostrar] = useState([]);
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(0);
  const [noEncuentra, setNoEncuentra] = useState(false);
  const [filtroVacio, setFiltroVacio] = useState(false);

  const buscarProducto = (e) => {
    let busqueda = productoRef.current.value;
    fetch(`https://api.mercadolibre.com/sites/MLU/search?q=${busqueda}`)
      .then((r) => r.json())
      .then((resProductos) => {
        setProductos(resProductos.results);
        let precios = resProductos.results.map((producto) => {
          let precio = producto.price;
          if (producto.currency_id === "USD") {
            precio = precio * 44;
          }
          return precio;
        });
        setMaximo(Math.max(...precios));
        setProductosMostrar(resProductos.results);
        console.log(condicionRef.current.value);
        if (resProductos.results.length === 0 || !resProductos.results) {
          setNoEncuentra(true);
        } else {
          setNoEncuentra(false);
        }
      });
  };

  const filtroPrecio = (lista) => {
    console.log(lista);
    let productosFiltrados = [];
    for (let i = 0; i < lista.length; i++) {
      let producto = lista[i];
      if (
        ((producto.price <= maximo) & (producto.currency_id === "UYU") ||
          (producto.price * 44 <= maximo) & (producto.currency_id === "USD")) &
        ((producto.price >= minimo) & (producto.currency_id === "UYU") ||
          (producto.price * 44 >= minimo) & (producto.currency_id === "USD"))
      ) {
        productosFiltrados.push(producto);
      }
    }
    console.log(productosFiltrados);
    return productosFiltrados;
  };

  const filtroCondicion = (lista, condicion) => {
    console.log("ejecutando filtroCondicion");
    console.log(lista);
    let productosFiltrados = [];
    if (condicion === "todos") {
      productosFiltrados = lista;
    } else {
      for (let i = 0; i < lista.length; i++) {
        let producto = lista[i];
        if (producto.condition === condicion) {
          productosFiltrados.push(producto);
        }
      }
    }
    console.log(productosFiltrados);
    return productosFiltrados;
  };

  const cambiarMinimo = () => {
    setMinimo(minimoRef.current.value);
  };

  const cambiarMaximo = () => {
    setMaximo(maximoRef.current.value);
  };

  const filtrar = () => {
    let filtradosPrecio = filtroPrecio(productos);
    let filtradosCondicion = filtroCondicion(
      filtradosPrecio,
      condicionRef.current.value
    );
    setProductosMostrar(filtradosCondicion);
    if (filtradosCondicion.length === 0 || !filtradosCondicion) {
      setFiltroVacio(true);
    } else {
      setFiltroVacio(false);
    }
  };

  const calcularPromedio = (lista) => {
    let precios = lista.map((producto) => {
      let precio = producto.price;
      if (producto.currency_id === "USD") {
        precio = precio * 44;
      }
      return precio;
    });
    let suma = precios.reduce(function (a, b) {
      return a + b;
    }, 0);
    let media = suma / precios.length;
    return Math.round((media * 100) / 100);
  };

  return (
    <div style={{padding: "0 20px"}}>
      <Row>
      <Col xs={9}>
      <div className="form-group">
        <input
        style={{borderRadius: "15px"}}
          className="form-control"
          type="search"
          placeholder="Buscar en Mercado Libre"
          ref={productoRef}
        />
      </div>
      </Col>
      <Col>
      <Button onClick={buscarProducto} variant="primary">Buscar</Button>
      </Col>
      </Row>
      
      <Accordion defaultActiveKey="1">
        <Accordion.Toggle id="mostrarfiltro" as={Button} variant="link" eventKey="0">
          <a>Mostrar filtros <FiChevronDown/></a>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div id="dFiltros">

            <div className="form-group">
              <label htmlFor="min">Precio</label>
              <Row style={{padding: "0 15px"}}>
                <Col>
                  <input
                    placeholder="Mínimo"
                    className="form-control"
                    type="number"
                    id="min"
                    ref={minimoRef}
                    onChange={cambiarMinimo}
                    min="0"
                  />
                </Col>
                <Col>
                  <input
                    placeholder="Máximo"
                    className="form-control"
                    type="number"
                    id="max"
                    ref={maximoRef}
                    onChange={cambiarMaximo}
                    min="0"
                  />
                </Col>
              </Row>
            </div>

            <div className="form-group">
              <label htmlFor="sCondicion">Condición</label>
              <select
                id="sCondicion"
                className="form-control"
                ref={condicionRef}
              >
                <option value="todos">Todos</option>
                <option value="new">Nuevos</option>
                <option value="used">Usados</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sEnvio">Tipo de envío</label><br/>
              <input type="checkbox" id="sEnvio" value="Envío gratis"></input><label htmlFor="sEnvio">Envío gratis</label>
              {/* <select
                id="sCondicion"
                className="form-control"
                ref={condicionRef}
              >
                <option value="todos">Todos</option>
                <option value="new">Nuevos</option>
                <option value="used">Usados</option>
              </select> */}
            </div>

            <Button style={{marginBottom: "20px"}} onClick={filtrar} variant="outline-primary">Filtrar</Button>
          </div>
        </Accordion.Collapse>
      </Accordion>

      <div>
        {productosMostrar.length > 0 ? (
          <p className="pInfo">Se han encontrado <b>{productosMostrar.length}</b> resultados.</p>
        ) : (
          ""
        )}
        {productosMostrar.length > 0 ? (
          <p  className="pInfo">
            El precio promedio es de <b> $ {calcularPromedio(productosMostrar)}</b>.
          </p>
        ) : (
          ""
        )}
        {noEncuentra ? <>
        <p className="pInfo">No se han encontrado resultados</p>
        <img style={{width: "150px", margin: "0 auto", display: "block", marginTop: "30px"}} src="img/lupa.svg"/></>
        : ""}
        {filtroVacio ? (
          <p className="pInfo">No existen productos que se ajusten a estas condiciones</p>
        ) : (
          ""
        )}
        {productosMostrar ? (
          productosMostrar.map((publicacion) => (
            <Publicacion key={publicacion.id} {...publicacion} />
          ))
        ) : (
          <h2></h2>
        )}
      </div>
    </div>
  );
};

export default Productos;
