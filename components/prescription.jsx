import Link from 'next/link';
import { Modal } from 'react-bootstrap';
import { Document, pdfjs, Page } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';


export default function Prescription ({ show, setShow }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
      <>
      { show && (
        <Modal show={ show } backdropClassName >
        <Modal.Header closeButton onHide={ setShow }>
        <a
          download="prescription.pdf"
          href='http://localhost:3000/api/prescription/get'
        >
          <FontAwesomeIcon icon={ faFileDownload } />
        </a>
        </Modal.Header>
        <Modal.Body style={ { 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } }>
        <Document
          file='/api/prescription/get'
          onLoadError={ (err) => console.log(err)}
          onLoadProgress={ () => console.log('loading') }
          onLoadSuccess={ () => console.log('it should works') }
        >
        <Page pageNumber={ 1 } height={ 700  } />
        </Document>    
        </Modal.Body>
        <Modal.Footer style={ 
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }
         } >
          <p style={ { 
            fontSize: '12px',
            fontStyle: 'italic',
           } } >
            obs: a escala do documento está reduzida, para ver em escala real, baixe-o
          </p>
        </Modal.Footer>
        </Modal>
      ) }
      </>
    )
}