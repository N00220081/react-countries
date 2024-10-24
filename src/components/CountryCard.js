import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/CountryCard.css'

const CountryCard = (props) => {
    const {name, flag, region} = props;

    return (
        <Card className="my-3 country-card h-100 shadow-sm">
            <Card.Img className='card-img-top' src={flag} variant='top'/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">
                    <Link to={`/country/${name}`} className="country-name-link">{props.name}</Link>
                </Card.Title>
                <Card.Text className="text-muted">{region}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CountryCard;
