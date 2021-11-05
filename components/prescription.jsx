import { Modal } from 'react-bootstrap';
import { Document, pdfjs, Page } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';


export default function Prescription ({ show, setShow, copie }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
      <>
      { show && (
        <Modal
          show={ show }
        >
        <Modal.Header closeButton onHide={ setShow }>
        <a
          download="prescription.pdf"
          href={ copie ? "http://localhost:3000/api/prescription/generateCopies" : "http://localhost:3000/api/prescription/get" }
          >
            <FontAwesomeIcon icon={ faFileDownload } />
          </a>
        </Modal.Header>
        <Modal.Body style={ { 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overfloX: 'hidden',
        } }>
        <Document
          file='/api/prescription/get'
          onLoadError={ (err) => console.log(err)}
          onLoadProgress={ () => console.log('loading') }
          onLoadSuccess={ () => console.log('it should works') }
        >
        <Page pageNumber={ 1 } height={ 700 } />
        </Document>    
        </Modal.Body>
        </Modal>
      ) }
      </>
    )
}