import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/Home.module.css";
import Head from "next/head";
import MedForm from "../components/medForm";
import MedCard from "../components/medCard";
import Prescription from "../components/prescription";
import { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [medications, setMedications] = useState([]);
  const [fullname, setFullname] = useState('');
  const [pdf, setPDF] = useState([]);
  const [copie, setCopie] = useState(true);
  const [showMedsForm, setShow] = useState(false);
  const [showPrescript, setShowPrescript] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.addEventListener(
      "keyup",
      (ev) => ev.key === "Escape" && setShowPrescript(false)
    );
  }, [setShowPrescript]);

  const generatePDF = async () => {
    const prescriptionData = {
      fullname,
      medications,
    };
    setLoading(true);
    const rawRes = await fetch(`http://localhost:3000//api/prescription/generate`, {
      method: "POST",
      body: JSON.stringify(prescriptionData),
    });
    const res = (await rawRes.body.getReader().read()).value.buffer;
    setPDF(res);
    setLoading(false)
    setShowPrescript(true);
  };

  const removeMed = (index) => {
    const updated = medications.filter((_med, i) => i !== index);
    setMedications(updated);
  };
  return (
    <>
      <Head>
        <title>Prescript</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main className={style.mainConteiner}>
        <h1> Gerador de prescrição </h1>
        <Form>
          <Form.Group>
            <div>
              <Form.Label htmlFor="name"> Nome completo </Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                id="fullname"
                value={fullname}
                onChange={(ev) => setFullname(ev.target.value)}
                min="6"
                required
              />
            </div>
            <div className={style.copiesBtn}>
              <Form.Label htmlFor="copies"> Cópia? </Form.Label>
              <Form.Check
                type="checkbox"
                name="copies"
                id="copies"
                defaultChecked
                onChange={() => (copie ? setCopie(false) : setCopie(true))}
              />
            </div>
          </Form.Group>
        </Form>
        {showMedsForm ? (
          <MedForm
            medications={medications}
            setMedications={setMedications}
            setShow={setShow}
          />
        ) : (
          <>
            <div className={style.addMedBtn}>
              <h4> Medicação </h4>
              <Button variant="dark" onClick={() => setShow(true)}>
                {" "}
                Adicionar Receita <FontAwesomeIcon icon={faPlusCircle} />{" "}
              </Button>
            </div>
            {medications &&
              medications.map((med, index) => (
                <MedCard
                  med={med}
                  id={index}
                  key={index}
                  removeMed={removeMed}
                />
              ))}
          </>
        )}
        {!showMedsForm && (
          <Button
            variant="success"
            type="button"
            style={ { margin: '20px 0' } }
            onClick={() => generatePDF()}
            disabled={medications.length === 0 && true}
          >
            { loading ?  <Spinner as="span" size="sm" role="status" aria-hidden="true" animation="border" /> : 'Gerar Prescrição' }
          </Button>
        )}
      </main>
      <Prescription
        show={showPrescript}
        setShow={setShowPrescript}
        copie={copie}
        fullName={fullname}
        pdf={ pdf }
      />
    </>
  );
}
