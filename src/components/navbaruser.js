// import logo from './DumbMerch.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../asssets/shop.svg'
import { Link } from 'react-router-dom';
import Card from '../asssets/ion.png';
import be from '../asssets/Be.svg';
import ve from '../asssets/Vectors (1).svg';
import ns from '../asssets/ns.svg';
import basket from '../asssets/basket.svg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';


function NavUser(countData) {

    // let { data: Count, refetch } = useQuery('productCache', async () => {
    //     const config = {
    //         method: "GET",
    //         headers: {
    //             Authorization: 'Basic ' + localStorage.token,
    //         },
    //     };

    //     const response = await API.get('/carts');
    //     return response.data.data;;
    // });
    const Count = localStorage.cartAmount

    return (
        <Navbar bg="light" expand="lg" style={{
            height: 80,
            width: "100%",
            left: 0,
            top: 0,
            borderRadius: 0,
            backgroundColor: "rgb(254,254,254)",
            borderShadow: '10px'

        }}>
            <Container fluid
            >
                <Link to="/Home" style={{ marginBottom: 60 }}>


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
                        <Link to="/cart">
                            <div>
                                <img src={basket} alt="" style={{ width: 25, marginRight: 10, marginTop: 5, position: 'absolute', }} />
                                {Count > 0 &&
                                    (
                                        <div style={{
                                            width: "15px",
                                            height: "15px",
                                            marginLeft: "15px",
                                            marginTop: "10px",
                                            backgroundColor: 'red',
                                            borderRadius: 25,
                                            // marginLeft: 8,
                                        }}>
                                            <p style={{
                                                color: 'white',
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}>{Count}</p>
                                        </div>
                                    )
                                }


                            </div>
                        </Link>
                        <label for="nav-dropdown-dark-example">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80" alt="user avatar" class="rounded-circle" style={{ width: 40, height: 40, marginLeft: 40, marginRight: 0 }} />
                        </label>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            menuVariant="dark"

                            style={{ marginRight: 290 }}
                        >
                            <Link to="/profile">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            </Link>
                            <Link to="/complain-user">
                                <NavDropdown.Item href="#action/3.2">
                                    Complain
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/">
                                <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
                            </Link>

                        </NavDropdown>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavUser;