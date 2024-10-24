import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/NavBar.css'

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" >
                    Rest Countries
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/weather" className="nav-item-custom">
                            Weather
                        </Nav.Link>
                        <Nav.Link as={Link} to="/holiday" className="nav-item-custom">
                            National Holiday
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;