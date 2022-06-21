import NavAdmin from '../components/navbar-admin';
import React, { useState, useEffect, } from 'react';
import { Container, Row, Col, Button, Modal, } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import convertRupiah from 'rupiah-format';
import { API } from '../config/api';


function ComponentList() {
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [show, setShow] = useState(false);
    // const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
        // navigate('/product')
    });

    const handleEdit = (id) => {
        navigate('/edit-product/' + id);
    };

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };
    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);



    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/product/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
            <NavAdmin />
            <Container>
                <Row>
                    <Col style={{ marginTop: 100, color: '#733C3C', marginBottom: 20 }}><h1>List Product</h1></Col>

                </Row>
                <Row>
                    {/* <Table striped bordered hover style={{ marginLeft: 70, width: '90%' }}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th style={{ width: 50 }}>No</th>
                                <th style={{ width: 180 }}> Name Product</th>
                                <th style={{ width: 200 }}>Price</th>
                                <th style={{ width: 100 }}>Qty</th>
                                <th style={{ width: 200 }}>Image</th>
                                <th style={{ width: 250 }}>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ textAlign: 'center' }}>
                                <td>1</td>
                                <td>Coffee</td>
                                <td>Rp.300.900</td>
                                <td>2</td>
                                <td>hhtps.image</td>
                                <td >
                                    {/* <Button style={{ backgroundColor: '#F32424', paddingLeft: 20, paddingRight: 20, }}>Delete</Button> */}
                    {/* <Button
                                        onClick={() => {
                                            handleDelete();
                                        }}
                                        className="btn-sm btn-danger"
                                        style={{ backgroundColor: '#F32424', paddingLeft: 20, paddingRight: 20, }}

                                    >
                                        Delete
                                    </Button>
                                    <Button style={{ backgroundColor: '#5FD068', marginLeft: 5, paddingLeft: 30, paddingRight: 30, }}>Edit</Button></td>

                            </tr>


                        </tbody>
                    </Table>  */}
                    {products?.length !== 0 ? (
                        <Table striped bordered hover  >
                            <thead >
                                <tr >
                                    <th  >No</th>
                                    <th >Photo</th>
                                    <th >Product Name</th>
                                    <th  >Product Desc</th>
                                    <th >price</th>
                                    <th  >Qty</th>
                                    <th >Action</th>

                                </tr>
                            </thead>
                            <tbody >
                                {
                                    products?.map((item, index) => (
                                        <tr key={index}>
                                            <td >{index + 1}</td>
                                            <td className="align-middle">
                                                <img
                                                    src={item.image}
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt={item.name}
                                                />
                                            </td>
                                            <td className="align-middle">{item.name}</td>
                                            <td className="align-middle">
                                                {/* <ShowMoreText
                                                            lines={1}
                                                            more="show"
                                                            less="hide"
                                                            className="content-css"
                                                            anchorClass="my-anchor-css-class"
                                                            expanded={false}
                                                            width={280}
                                                        >
                                                        </ShowMoreText> */}
                                                {item.desc}
                                            </td>
                                            <td className="align-middle">
                                                {/* {rupiahFormat.convert(item.price)} */}
                                                {convertRupiah.convert(item.price)}
                                            </td>
                                            <td className="align-middle">{item.qty}</td>
                                            <td className="align-middle">
                                                <td >
                                                    <button
                                                        onClick={() => {
                                                            handleEdit(item.id);
                                                        }}
                                                        className="btn-sm btn-success me-2"
                                                        style={{ width: '135px' }}
                                                    >
                                                        Edit
                                                    </button>
                                                    {/* <button className={cssModules.buttons} onClick={() => setModalShow(true)} >Delete</button> */}
                                                    <Button
                                                        onClick={() => {
                                                            handleDelete(item.id);
                                                        }}
                                                        className="btn-sm btn-danger"
                                                        style={{ width: '135px' }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    ) : (
                        <div className="text-center pt-5">
                            <div className="mt-3">No data product</div>
                        </div>
                    )}

                    <MyVerticallyCenteredModal
                        setConfirmDelete={setConfirmDelete}
                        show={show}
                        handleClose={handleClose}
                    // onHide={() => setModalShow(false)}

                    />

                </Row>
                {/* <MyVerticallyCenteredModal
                    setConfirmDelete={setConfirmDelete}
                    show={show}
                    handleClose={handleClose} */}
                {/* onHide={() => setModalShow(false)} */}

                {/* /> */}
            </Container>
        </div>
    );
}

function MyVerticallyCenteredModal({ show, handleClose, setConfirmDelete }) {
    const handleDelete = () => {
        setConfirmDelete(true)
    }
    return (
        <Modal
            // {...props}
            show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete this data?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleDelete}>
                    Yes
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ComponentList;