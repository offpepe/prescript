import { useState } from 'react';
import style from "../styles/Home.module.css";
import crypto from "crypto";
import Link from "next/link";
import { Modal, Spinner } from "react-bootstrap";
import { Document, pdfjs, Page } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Prescription({ show, setShow, copie, fullName, pdf: pdfProp }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const fName = fullName.split(" ").join("_");
  const date = new Date().toLocaleDateString("en-US");
  const hash = crypto.createHash("md5").update(fName).digest("base64");
  const pdf = copie
    ? `${ process.env.APP || 'http://localhost:3000' }/api/prescription/generateCopie`
    : `${ process.env.APP || 'http://localhost:3000' }/api/prescription/get`;
  return (
    <>
      {show && (
        <Modal show={show}>
          <Modal.Header closeButton onHide={setShow}>
            <div className={style.prescriptionPreviewHeader}>
              <a
                download={`Prescrição_${fName}_${date}_${hash}.pdf`}
                href={ pdf }
              >
                <FontAwesomeIcon icon={faFileDownload} />
              </a>
              <Link
                href={
                  copie ? "/prescriptionView?copie=true" : "/prescriptionView"
                }
              >
                <a target="_blank" rel="noreferrer">
                  ​
                  <FontAwesomeIcon icon={faPrint} />
                </a>
              </Link>
            </div>
          </Modal.Header>
          <Modal.Body className={style.prescriptionPreviewBody}>
            <Document
              file={ '/api/prescription/get' }
              error={ (err) => alert(err.message) }           
              loading={ <Spinner animation="grow" /> }

            >
              <Page pageNumber={1} height={700} />
            </Document>
          </Modal.Body>
          <Modal.Footer className={style.prescriptionPreviewFooter}>
            <p>
              obs: a escala do documento está reduzida, para ver em escala real,
              baixe-o
            </p>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
