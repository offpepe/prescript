import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import MedForm from '../components/medForm';
import MedCard from '../components/medCard';
import Prescription from '../components/prescription';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [medications, setMedications] = useState([]);
  const [fullname, setFullname] = useState('');
  const [copie, setCopie] = useState(true);
  const [showMedsForm, setShow] = useState(false);
  const [showPrescript, setShowPrescript] = useState(false);

  const generatePDF = async () => {
    const prescriptionData = {
      fullname,
      medications,
    };

    await fetch('http://localhost:3000/api/prescription/generate', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
    setShowPrescript(true);
  }

  const removeMed = (index) => {
    const updated = medications.filter((_med, i) => i !== index );
    setMedications(updated);
  }

  return (
    <>
      <Head>
        <title>Prescript</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="main conteiner" style={ {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '30px',
      } } >
      <h1> Gerador de prescrição </h1>
      <Form style={ { width: '70%' } } >
        <Form.Group>
          <div>
            <Form.Label htmlFor="name"> Nome completo </Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              id="fullname"
              value={ fullname }
              onChange={ (ev) => setFullname(ev.target.value) }
              min="6"
              required
            />
          </div>
          <div style={ { display: 'flex', alignItems: 'flex-start', margin: '10px 0' } }>
          <Form.Label htmlFor="copies"> Cópia? </Form.Label>
          <Form.Check
            type="checkbox"
            name="copies"
            style={ { margin: '0 10px' } }
            id="copies"
            defaultChecked
            onChange={ () => (copie ? setCopie(false) : setCopie(true)) }
             />
           </div>
        </Form.Group>
      </Form>
      { showMedsForm ? (
        <MedForm
          medications={ medications }
          setMedications={ setMedications }
          setShow={ setShow }
        />
      ) 
      : (
      <>
        <div style={ {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          width: '70%',
        } }>
        <h4 style={ { margin: '20px 0' } } > Medicação </h4>
        <h4 onClick={ () => setShow(true) }><FontAwesomeIcon icon={ faPlusCircle } /> </h4>
        </div>
        { medications && medications.map((med, index) => (
        <MedCard
          med={ med }
          id={ index }
          key={ index }
          removeMed={ removeMed } 
        />)) }
      </>) }
        { !showMedsForm && <Button
          variant="success"
          type="button"
          onClick={ () => generatePDF() }
          disabled={ medications.length === 0 && true }
          > Gerar Prescrição </Button> }
      </div>
      <Prescription show={ showPrescript }  setShow={ setShowPrescript } copie={ copie } />
    </>
  )
}
