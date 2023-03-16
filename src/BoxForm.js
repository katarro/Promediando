import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./App.css";

function BoxForm(props) {
  const [notas, setNotas] = useState([0]);
  const [notaExamen, setNotaExamen] = useState(0);
  const [promedioFinal, setPromedioFinal] = useState(0);
  const [ponderacionExamen, setPonderacionExamen] = useState(0);
  const [ponderaciones, setPonderaciones] = useState([0]);
  const [promedio, setPromedio] = useState(0);
  const [notaAprobada, setNotaAprobada] = useState(true);
  const [promedioFinalAprobado, setPromedioFinalAprobado] = useState(true);

  useEffect(() => {
    const datosGuardados = recuperarDeLocalStorage();
    if (datosGuardados) {
      setNotas(datosGuardados.notas);
      setPonderaciones(datosGuardados.ponderaciones);
      setPromedio(datosGuardados.promedio);
      setNotaExamen(datosGuardados.notaExamen);
      setPonderacionExamen(datosGuardados.ponderacionExamen);
      setPromedioFinal(datosGuardados.promedioFinal);
    }
  }, []);

  const calcularAprobacion = () => {
    if (promedio >= 39.45) {
      setNotaAprobada(true);
    } else {
      setNotaAprobada(false);
    }
    if (promedioFinal >= 39.45) {
      setPromedioFinalAprobado(true);
    } else {
      setPromedioFinalAprobado(false);
    }
  };

  const agregarNota = () => {
    setNotas([...notas, 0]);
    setPonderaciones([...ponderaciones, 0]);
    guardarEnLocalStorage(); // llamada a la función guardarEnLocalStorage
  };

  const eliminarNota = (index) => {
    setNotas([...notas.slice(0, index), ...notas.slice(index + 1)]);
    setPonderaciones([
      ...ponderaciones.slice(0, index),
      ...ponderaciones.slice(index + 1)
    ]);
    guardarEnLocalStorage(); // llamada a la función guardarEnLocalStorage
  };

  const actualizarNota = (index, event) => {
    const nuevasNotas = [...notas];
    nuevasNotas[index] = parseInt(event.target.value);
    setNotas(nuevasNotas);
    guardarEnLocalStorage(); // llamada a la función guardarEnLocalStorage
  };

  const actualizarPonderacion = (index, event) => {
    const nuevasPonderaciones = [...ponderaciones];
    nuevasPonderaciones[index] = parseInt(event.target.value);
    setPonderaciones(nuevasPonderaciones);
    guardarEnLocalStorage(); // llamada a la función guardarEnLocalStorage
  };

  const calcularPromedio = () => {
    let sumaNotas = 0;
    let sumaPonderaciones = 0;
    for (let i = 0; i < notas.length; i++) {
      sumaNotas += notas[i] * (ponderaciones[i] / 100);
      sumaPonderaciones += ponderaciones[i];
    }
    let promedio = sumaNotas / (sumaPonderaciones / 100);
    setPromedio(promedio);
    guardarEnLocalStorage();

    if (notaExamen !== 0) {
      let ponderacionResto = 100 - ponderacionExamen; // 100 - 30
      let ponNotaPresentacion = ponderacionResto / 100;
      let ponNotaExamen = ponderacionExamen / 100;

      let promedioFinal =
        promedio * ponNotaPresentacion + notaExamen * ponNotaExamen;
      setPromedioFinal(promedioFinal);
      calcularAprobacion();
    }
  };

  const guardarEnLocalStorage = () => {
    const datos = {
      nombreRamo: props.nombreRamo,
      notas: notas,
      ponderaciones: ponderaciones,
      promedio: promedio,
      notaExamen: notaExamen,
      ponderacionExamen: ponderacionExamen,
      promedioFinal: promedioFinal
    };
    localStorage.setItem(props.nombreRamo, JSON.stringify(datos));
  };

  const recuperarDeLocalStorage = () => {
    const datosGuardados = localStorage.getItem(props.nombreRamo);
    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    } else {
      return null;
    }
  };

  return (
    <Form className="form">
      <h5>{props.nombreRamo}</h5>

      {notas !== undefined ? (
        <>
          {notas.map((nota, index) => (
            <FormGroup key={index} className="notas">
              <br />

              <div className="nota">
                <Label className="name">Nota {index + 1}</Label>
                <Input
                  type="number"
                  placeholder="70"
                  value={nota || ""}
                  onChange={(event) => actualizarNota(index, event)}
                  style={{ width: "35%" }}
                />
              </div>

              <br />
              <br />
              <div className="nota">
                <Input
                  type="number"
                  placeholder="100"
                  value={ponderaciones[index] || ""}
                  onChange={(event) => actualizarPonderacion(index, event)}
                  style={{ width: "45%" }}
                />
                <Label className="name">%</Label>
              </div>

              {notas.length > 1 && (
                <Button
                  color="danger"
                  className="eliminar"
                  onClick={() => eliminarNota(index)}
                  style={{ width: "20%", height: "20%", marginLeft: "-5px" }}
                >
                  Borrar
                </Button>
              )}
            </FormGroup>
          ))}
        </>
      ) : null}

      {/****************************************/}

      <div className="examen">
        <div className="nota">
          <Label className="name">Examen</Label>
          <Input
            type="number"
            placeholder="70"
            value={notaExamen || ""}
            onChange={(event) => setNotaExamen(event.target.value)}
            style={{ width: "35%" }}
          />
        </div>

        <div className="nota">
          <Input
            type="number"
            placeholder="100"
            value={ponderacionExamen || ""}
            onChange={(event) => setPonderacionExamen(event.target.value)}
            style={{ width: "40%" }}
          />
          <Label className="name">%</Label>
        </div>

        {/****************************************/}
        <br />
      </div>
      <br />

      <div className="nota" id="promedio">
        <div className="contenedor-input">
          <Label>Promedio</Label>
          <Input
            type="number"
            readOnly
            value={promedio !== undefined ? promedio.toFixed(1) : null}
            style={{ width: "40%" }}
            className={notaAprobada ? "aprobado" : "reprobado"}
          />
        </div>
        <div className="contenedor-input">
          <Label>Promedio Final</Label>
          <Input
            type="number"
            readOnly
            value={
              promedioFinal !== undefined ? promedioFinal.toFixed(1) : null
            }
            style={{ width: "40%" }}
            className={promedioFinalAprobado ? "aprobado" : "reprobado"}
          />
        </div>
      </div>

      <br />

      <Button color="primary" onClick={agregarNota} style={{ width: "10%" }}>
        +
      </Button>
      <br />
      <br />
      <Button color="success" onClick={calcularPromedio}>
        Calcular promedio
      </Button>
      <br />
      <br />
    </Form>
  );
}
export default BoxForm;
