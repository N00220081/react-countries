// src/components/NationalHolidays.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ListGroup } from "react-bootstrap";

const NationalHolidays = () => {
    const { name } = useParams();
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                // Replace YOUR_API_KEY with your actual API key
                const response = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=wzcDe2FzyCsIX2iXcHwW8bcvIW2qPO07&country=${name}&year=2024`);
                console.log('Holidays Response:', response.data);
                setHolidays(response.data.response.holidays);
            } catch (error) {
                console.error("Error fetching holidays:", error);
            }
        };

        fetchHolidays();
    }, [name]);

    return (
        <div>
            <h1>National Holidays in {name}</h1>
            <ListGroup>
                {holidays.length > 0 ? (
                    holidays.map((holiday) => (
                        <ListGroup.Item key={holiday.name}>
                            <strong>{holiday.name}</strong> - {holiday.date.iso}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No holidays found.</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default NationalHolidays;
