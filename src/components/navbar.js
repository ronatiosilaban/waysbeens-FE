// import logo from './DumbMerch.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from '../asssets/Ways.svg';
import be from '../asssets/Be.svg';
import ve from '../asssets/Vectors (1).svg';
import ns from '../asssets/ns.svg';
import React, { useState, useEffect } from "react";
import Modal from "./modal";
import Modals from "./modals";
import { Link } from 'react-router-dom';

function NavScrollExample() {
    const [confirmLogin, setConfirmLogin] = useState(null);
    const [confirmRegister, setConfirmRegister] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);

    const handleLogin = () => {
        handleShow();
    };
    const handleRegister = () => {
        handleShows();
    };

    return (
        <Navbar bg="light" expand="lg" style={{
            height: 80,
            width: "100%",
            left: 0,
            top: 0,
            borderRadius: 0,
            backgroundColor: "#F5F5F5",
            borderShadow: '10px'

        }}>
            <Container fluid
            >
                <img
                    src={Card}
                    style={{
                        width: '4.5%',
                        height: '48px',
                        objectFit: 'cover',
                        position: 'absolute',
                        marginTop: 10,
                        marginLeft: 300

                    }}
                    alt=""
                />
                <img
                    src={be}
                    style={{
                        width: '2.5%',
                        height: '45px',
                        objectFit: 'cover',
                        position: 'absolute',
                        marginTop: 10,
                        marginLeft: 375

                    }}
                    alt=""
                />
                <img
                    src={ve}
                    style={{
                        width: '1.3%',
                        height: '23px',
                        objectFit: 'cover',
                        position: 'absolute',
                        marginTop: 23,
                        marginLeft: 420

                    }}
                    alt=""
                />
                <img
                    src={ns}
                    style={{
                        width: '1.4%',
                        height: '15px',
                        objectFit: 'cover',
                        position: 'absolute',
                        marginTop: 15,
                        marginLeft: 445

                    }}
                    alt=""
                />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex">
                        {/* <Button style={{ paddingRight: 25, paddingLeft: 25, marginRight: 10, borderColor: "rgb(97,61,43)", color: "rgb(97,61,43)", backgroundColor: "white", fontWeight: 600 }}></Button> */}
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"
                            style={{ paddingRight: 25, paddingLeft: 25, marginRight: 10, borderColor: "rgb(97,61,43)", color: "rgb(97,61,43)", backgroundColor: "white", fontWeight: 600 }}
                            onClick={() => {
                                handleLogin()
                            }}>Login</button>
                        {/* <Button style={{ paddingRight: 20, paddingLeft: 20, marginRight: 300, borderColor: "rgb(97,61,43)", backgroundColor: "rgb(97,61,43)", color: "white", fontWeight: 600, fontSize: 15 }}>Register</Button> */}
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"
                            style={{ paddingRight: 20, paddingLeft: 20, marginRight: 300, borderColor: "rgb(97,61,43)", backgroundColor: "rgb(97,61,43)", color: "white", fontWeight: 600, fontSize: 15 }}
                            onClick={() => {
                                handleRegister()
                            }}
                        >Register</button>
                    </Form>
                </Navbar.Collapse>
                <Modal
                    setConfirmLogin={setConfirmLogin}
                    show={show}
                    handleClose={handleClose}
                />
                <Modals
                    setConfirmDelete={setConfirmRegister}
                    show={shows}
                    handleCloses={handleCloses}
                />
            </Container >
        </Navbar >
    );
}

export default NavScrollExample;