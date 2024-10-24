import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';

const SingleCountry = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // Fetch country data
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                console.log('Country Response:', res.data[0]);
                setCountry(res.data[0]);

                // Extract latitude and longitude
                const lat = res.data[0].latlng[0];
                const lon = res.data[0].latlng[1];

                // Fetch weather data using lat and lon
                return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=80e0e8f9eed0ab4613750c91afa6aebd`);
            })
            .then((weatherRes) => {
                console.log('Weather Response:', weatherRes.data); // Log the weather response
                setWeather(weatherRes.data);
            })
            .catch((e) => {
                console.error('Error fetching data:', e.response || e.message);
            });
    }, [name]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <Row className="mt-4">
            <Col md={6} className="d-flex align-items-center justify-content-center">
                <Image src={country.flags.png} alt={`${country.name.common}'s flag`} className="img-fluid shadow-lg" />
            </Col>

            <Col md={6} className="mt-4 mt-md-0">
                <h1 className="mb-3">{country.name.common}</h1>
                <h3 className="text-muted">Official name: {country.name.official}</h3>

                <ListGroup variant="flush" className="mt-4">
                    <ListGroup.Item>
                        <strong>Capital:</strong> {country.capital && country.capital[0]}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <strong>Population:</strong> {country.population.toLocaleString()}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <strong>Region:</strong> {country.region}
                    </ListGroup.Item>
                    {country.subregion && (
                        <ListGroup.Item>
                            <strong>Sub-Region:</strong> {country.subregion}
                        </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                        <strong>Languages:</strong>
                        <ul>
                            {Object.values(country.languages).map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <strong>Currency: </strong>
                        {Object.values(country.currencies).map((currency, index) => (
                            <span key={index}>
                                {currency.name} ({currency.symbol})
                            </span>
                        ))}
                    </ListGroup.Item>

                    {country.borders && country.borders.length > 0 && (
                        <ListGroup.Item>
                            <strong>Borders:</strong>
                            <ul>
                                {country.borders.map((border, index) => (
                                    <li key={index}>{border}</li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                    )}

                    {/* Add Weather Information Below */}
                    {weather && (
                        <ListGroup.Item>
                            <strong>Current Weather in {country.capital[0]}:</strong>
                            <ul>
                                <li>Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</li>
                                <li>Weather: {weather.weather[0].description}</li>
                                <li>Humidity: {weather.main.humidity}%</li>
                            </ul>
                        </ListGroup.Item>
                    )}
                    
                </ListGroup>
            </Col>
        </Row>
    );
}

export default SingleCountry;
