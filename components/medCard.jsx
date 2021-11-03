import { Card } from "react-bootstrap";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MedCard ({ 
    med: {
    name,
    appearance,
    qtd,
    },
    id,
    removeMed,
 }) {
    return (
        <Card style={ { width: '60%', height: '50px', margin: '6px 0' } }>
            <Card.Body style={ {
                alignItems: 'flex-start', 
                display: 'flex',
                justifyContent: 'space-between',
                } } >
                <p>{ `${ name } ${ appearance && appearance}`}</p>
                <p>{ qtd }</p>
                <FontAwesomeIcon
                  icon={ faTimesCircle }
                  style={ { fontSize: 20, color: 'red' } }
                  onClick= { () => removeMed(id) }
                  />

            </Card.Body>
        </Card>
    )
}