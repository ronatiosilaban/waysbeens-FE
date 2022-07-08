import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../asssets/shop.svg'
import { img } from 'react-bootstrap'
import Card from '../asssets/ion.png';
import be from '../asssets/Be.svg';
import ve from '../asssets/Vectors (1).svg';
import ns from '../asssets/ns.svg';
import basket from '../asssets/basket.svg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavAdmin() {
    return (
        <Container fluid>
            <Navbar bg="light" expand="lg" style={{
                height: 80,
                width: "100%",
                left: 0,
                top: 0,
                borderRadius: 0,
                borderShadow: '10px'

            }}>
                <Link to="/customer" style={{ marginBottom: 60 }}>
                    <img
                        src={Card}
                        style={{
                            width: '8.5%',
                            height: '45px',
                            objectFit: 'cover',
                            position: 'absolute',
                            marginTop: 5,
                            marginLeft: 300

                        }}
                        alt=""
                    />
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80" alt="user avatar" class="rounded-circle" style={{ width: 40, height: 40 }} />

                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            menuVariant="dark"
                            style={{ marginRight: 290 }}
                        >
                            <Link to="/product">
                                <NavDropdown.Item href="#action/3.1">Add Product</NavDropdown.Item>
                            </Link>
                            <Link to="/list">
                                <NavDropdown.Item href="#action/3.2">
                                    List Product
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/customer">
                                <NavDropdown.Item href="#action/3.2">
                                    List Income
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/complain-admin">
                                <NavDropdown.Item href="#action/3.3">Complain</NavDropdown.Item>
                            </Link>
                            <NavDropdown.Divider />
                            <Link to="/">
                                <NavDropdown.Item href="#action/3.4">
                                    Logout
                                </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Form>
                </Navbar.Collapse>

            </Navbar >
        </Container>
    );
}

export default NavAdmin;