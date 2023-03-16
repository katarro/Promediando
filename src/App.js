import React, { useState, useEffect } from "react";
import { Container, Input, Button } from "reactstrap";
import BoxForm from "./BoxForm";

function App() {
  const [boxForms, setBoxForms] = useState(
    JSON.parse(localStorage.getItem("boxForms")) || []
  );
  const [nombreRamo, setNombreRamo] = useState("");
  const agregarBoxForm = (nombreRamo) => {
    setBoxForms([...boxForms, { nombreRamo }]);
  };
  const eliminarBoxForm = (index) => {
    const nuevosBoxForms = [...boxForms];
    nuevosBoxForms.splice(index, 1);
    setBoxForms(nuevosBoxForms);
  };

  useEffect(() => {
    localStorage.setItem("boxForms", JSON.stringify(boxForms));
  }, [boxForms]);

  return (
    <Container className="text-center">
      <br />
      <h1>Calculadora de promedio de notas</h1>
      <hr />
      <br />
      {boxForms.map((boxForm, index) => (
        <div key={index}>
          <BoxForm nombreRamo={boxForm.nombreRamo} />
          <br />
          <Button color="danger" onClick={() => eliminarBoxForm(index)}>
            Eliminar Ramo
          </Button>
          <hr />

          <br />
          <br />
        </div>
      ))}

      <div className="nota">
        <Input
          type="text"
          placeholder="Nombre Ramo"
          style={{ width: "38%" }}
          value={nombreRamo}
          onChange={(event) => setNombreRamo(event.target.value)}
        />
      </div>
      <br />

      <div>
        <Button
          onClick={() => {
            agregarBoxForm(nombreRamo);
            setNombreRamo("");
          }}
        >
          Agregar Ramo
        </Button>
      </div>

      <br />
    </Container>
  );
}

export default App;
