import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import React, { useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch } from "react-redux";
import { deleteOfCart } from "../reducer";

export default function BillCart(props) {
  const { showAlert, setShowAlert, products } = props;
  const dispatch = useDispatch();
  const fechaActual = new Date(); // fecha actual
  const tableRef = useRef(null); // Ref para referenciar la tabla en el DOM
  const date = fechaActual.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = fechaActual.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: tableRef.current });
    doc.save("recibo.pdf");
  };

  const handleClose = () => {
    const value = "deleteAll";
    dispatch(deleteOfCart(value));
    setShowAlert(false);
  };

  return (
    <div>
      <Alert show={showAlert} variant="success">
        <Alert.Heading>¡Compra Exitosa!</Alert.Heading>
        <p>
          <p>Resúmen de Compra - Recibo</p>
          <Table striped bordered hover ref={tableRef}>
            <thead>
              <tr>
                <td style={{ width: "20%" }}>Fecha de pago:</td>
                <td style={{ width: "50%" }}>
                  {date} {time}
                </td>
                <td style={{ width: "30%" }}></td>
              </tr>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((e, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{e.name}</td>
                    <td>${e.price}.00</td>
                  </tr>
                );
              })}
              <tr>
                <td> </td>
                <td>TOTAL</td>
                <td>
                  $
                  {products.map((e) => e.price || 0).reduce((a, b) => a + b, 0)}
                  .00
                </td>
              </tr>
            </tbody>
          </Table>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleDownload} variant="outline-success">
            Descargar
          </Button>
          <Button onClick={handleClose} variant="outline-success">
            Cerrar
          </Button>
        </div>
      </Alert>
    </div>
  );
}
