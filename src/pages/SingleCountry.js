import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Row, Col, Image } from 'react-bootstrap'

const SingleCountry = () => {
    const { name } = useParams();

    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                console.log('Response:', res.data[0]);
                setCountry(res.data[0])
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])

    if (!country) {
        return <div>Loading...</div>
    }

    return (
        <Row>
            <Col>
                <Image src={country.flags.png} alt={`${country.name.common}'s flag`} />
            </Col>

            <Col>

                <h1>{country.name.common}</h1>
                <h2>Official name: {country.name.official}</h2>
                <p>Region: {country.region}</p>
                {
                    country.subregion && <p>Sub-Region: {country.subregion}</p>
                }

                <p>Languages:</p>
                <ul>
                    {
                        Object.values(country.languages).map((language) => {
                            return <li>{language}</li>
                        })
                    }
                </ul>

                <p>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</p>
            </Col>
        </Row>
    );
}

export default SingleCountry