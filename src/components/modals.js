import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Alert } from "react-bootstrap";

export default function RegisterData({ show, handleCloses }) {

    // const handleRegister = () => {
    //     setConfirmRegister(true)
    // }

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/register', body, config);
            console.log('response', response);
            // Handling response here
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });


    return (

        <Modal show={show} onHide={handleCloses}>
            <Modal.Header closeButton>
                <Modal.Title>Login Account</Modal.Title>
            </Modal.Header>
            {message && message}
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="Text"
                            placeholder="Your Username"
                            autoFocus
                            id="name"
                            onChange={handleChange}
                            value={name}
                            name="name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Your Email"
                            autoFocus
                            id="email"
                            onChange={handleChange}
                            value={email}
                            name="email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your Password"
                            autoFocus
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* <Link to="/customer"> */}
                    {/* <Button variant="primary" >
                        Register
                    </Button>
                    </Link> */}
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Name"
                            id="name"
                            onChange={handleChange}
                            value={name}
                            name="name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email"
                            id="email"
                            onChange={handleChange}
                            value={email}
                            name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control type="password" placeholder="Password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit">
                        Register
                    </Button>
                </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleCloses}>
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}