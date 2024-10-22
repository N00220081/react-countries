import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import Filter from '../components/Filter';  // Import the new Filter component
import { Row, Spinner, Alert } from 'react-bootstrap';

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');  // New state for region filter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountriesList(response.data);
        setFilteredCountries(response.data);  // Initialize filtered countries with all data
        setLoading(false);
      } catch (error) {
        setError('Error fetching countries data');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countriesList;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    setFilteredCountries(filtered);
  }, [searchTerm, region, countriesList]);

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle region change
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  let countryCards = filteredCountries.map((country) => {
    return (
      <CountryCard
        key={country.ccn3}
        flag={country.flags.png}
        name={country.name.common}
        region={country.region}
      />
    );
  });

  return (
    <div>
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        region={region}
        handleRegionChange={handleRegionChange}
      />
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <Alert variant="danger" style={{ textAlign: 'center' }}>
          {error}
        </Alert>
      )}
      <Row md={3} xs={1}>
        {countryCards.length > 0 ? countryCards : <p>No countries found.</p>}
      </Row>
    </div>
  );
};

export default Home;
