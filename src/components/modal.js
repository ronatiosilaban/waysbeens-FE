import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/user';
import { useContext, useEffect } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Alert } from "react-bootstrap";




export default function LoginData({ show, handleClose, setConfirmLogin }) {

    const handleLogin = () => {
        setConfirmLogin(true)
    }

    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    // useEffect(() => {
    //     console.log("App comp did mount");
    //     console.log(state);
    // }, [])

    const [form, setForm] = useState({
        email: '',
        password: '',
    });


    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const body = JSON.stringify(form);

            const response = await API.post('/login', body, config);
            console.log(response.data.data);
            // Handling response here
            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data
                })

                if (response.data.data.status === "admin") {
                    navigate('/customer')
                } else {
                    navigate('/Home')
                }

                const alert = (
                    <Alert variant="success" className="py-1">
                        Login Success
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    account not found
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });


    return (
        // <Modal show={show} onHide={handleClose} centered>
        //     <Modal.Body className="text-dark">
        //         <div style={{fontSize: '20px', fontWeight: '900'}}>
        //             Delete Data
        //         </div>
        //         <div style={{fontSize: '16px', fontWeight: '500'}} className="mt-2">
        //             Are you sure you want to delete this data?
        //         </div>
        //         <div className="text-end mt-5">
        //             <Button onClick={handleDelete} size="sm" className="btn-success me-2" style={{width: '135px'}}>Yes</Button>
        //             <Button onClick={handleClose} size="sm" className="btn-danger" style={{width: '135px'}}>No</Button>
        //         </div>
        //     </Modal.Body>
        // </Modal>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login Account</Modal.Title>

            </Modal.Header>
            {message && message}
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
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
                            onChange={handleChange}
                            name="password"
                            value={password}
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit" >
                        Login
                    </Button>
                </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button> */}
            {/* <Link to="/Home">
                </Link>

            </Modal.Footer>  */}
        </Modal >
    )
}