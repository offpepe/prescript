import style from "../styles/Home.module.css";
import { Form, Button } from "react-bootstrap";

export default function MedForm({ medications, setMedications, setShow }) {
  return (
    <Form
      className={style.medForm}
      onSubmit={(ev) => {
        ev.preventDefault();
        const { medName, appearance, quantity, usage, obs } = ev.target;
        const updatedMeds = medications;
        updatedMeds.push({
          name: medName.value,
          appearance: appearance.value,
          qtd: quantity.value,
          usage: usage.value,
          obs: obs.value,
        });
        setMedications(updatedMeds);
        setShow(false);
      }}
    >
      <Form.Group className={style.medFormGroup}>
        <div className={style.formRow}>
          <Form.Label htmlFor="medName"> Nome da medicação* </Form.Label>
          <Form.Control type="text" name="medName" id="medName" required />
        </div>
        <div>
          <Form.Label htmlFor="appearance">Apresentação</Form.Label>
          <Form.Control type="text" name="appearance" id="appearance" />
        </div>
        <div style={{ width: "15%", marginLeft: "5px" }}>
          <Form.Label htmlFor="quantity"> Quantidade* </Form.Label>
          <Form.Control type="text" name="quantity" id="quantity" required />
        </div>
      </Form.Group>
      <Form.Label htmlFor="usage"> Modo de uso* </Form.Label>
      <Form.Control
        as="textarea"
        name="usage"
        id="usage"
        style={{ height: "100px" }}
        required
      />
      <Form.Label htmlFor="quantity"> Observação </Form.Label>
      <Form.Control type="text" name="obs" id="obs" />
      <div className={style.btnConteiner}>
        <Button variant="secondary" type="submit">
          {" "}
          Adicionar medicação{" "}
        </Button>
        <Button variant="danger" onClick={() => setShow(false)} type="button">
          {" "}
          Cancelar{" "}
        </Button>
      </div>
    </Form>
  );
}
