import style from "../styles/Home.module.css";
import { Card } from "react-bootstrap";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MedCard({
  med: { name, appearance, qtd },
  id,
  removeMed,
}) {
  const fontSize = `${name} ${appearance && appearance}`.length > 50 ? '12px' : '18px';
  return (
    <Card className={style.medCard}>
      <Card.Body className={style.medCardBody}>
        <div style={{ width: "70%", fontSize }}>
          <p>{`${name} ${appearance && appearance}`}</p>
        </div>
        <div style={{ width: "30%" }}>
          <p>{qtd}</p>
        </div>
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ fontSize: 20, color: "red" }}
          onClick={() => removeMed(id)}
          width="10%"
        />
      </Card.Body>
    </Card>
  );
}
