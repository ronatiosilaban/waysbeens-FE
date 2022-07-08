import NavAdmin from '../components/navbar-admin';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import { API } from '../config/api'

function ComponentEditProduct() {
    const title = 'Edit Product';
    document.title = 'Waysbeens | ' + title;
    let navigate = useNavigate();

    const { id } = useParams();



    const [preview, setPreview] = useState(null); //For image preview
    const [product, setProduct] = useState({}); //Store product data

    const [form, setForm] = useState({
        image: '',
        name: '',
        desc: '',
        price: '',
        qty: '',
    });

    let { data: products, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });



    useEffect(() => {
        if (products) {
            setPreview(products.image);
            setForm({
                ...form,
                name: products.name,
                desc: products.desc,
                price: products.price,
                qty: products.qty,
            });
            setProduct(products);
        }
    }, [products]);




    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };


    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
            }
            formData.set('name', form.name);
            formData.set('desc', form.desc);
            formData.set('price', form.price);
            formData.set('qty', form.qty);


            // Insert product data
            const response = await API.patch(
                '/product/' + product.id,
                formData,
                // config
            );
            console.log('respone', formData);

            navigate('/List');
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
            {/* <NavAdmin /> */}
            <Container>
                <Row>
                    <Col sm={6}>
                        <Row style={{ marginTop: 100, color: '#733C3C', marginBottom: 20 }}><h1>Edit Product</h1></Row>
                        <Row>
                            <Form onSubmit={(e) => handleSubmit.mutate(e)} >
                                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Name" style={{ borderColor: '#A64B2A', backgroundColor: '#E4D1B9' }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="number" placeholder="Stock" style={{ borderColor: '#A64B2A', backgroundColor: '#E4D1B9' }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Price" style={{ borderColor: '#A64B2A', backgroundColor: '#E4D1B9' }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" placeholder='Description' rows={3} style={{ borderColor: '#A64B2A', backgroundColor: '#E4D1B9' }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="file" placeholder="Your Product Photos" style={{ width: '50%', borderColor: '#A64B2A', backgroundColor: '#E4D1B9' }} />
                                </Form.Group> */}
                                <form>
                                    <input type="text"
                                        placeholder="Name Product"
                                        name="name"
                                        value={form?.name}
                                        onChange={handleChange}
                                        style={{ borderColor: '#A64B2A', backgroundColor: '#613D2B40', width: "90%", height: 50, borderRadius: 5 }}
                                    />
                                </form>
                                <form className="mb-3">
                                    <input type="text" placeholder="Price"
                                        name="price"
                                        value={form?.price}
                                        onChange={handleChange}
                                        style={{ borderColor: '#A64B2A', backgroundColor: '#613D2B40', width: "90%", height: 50, borderRadius: 5, marginTop: 10, }}
                                    />
                                </form>
                                <form>
                                    <input type="number" placeholder="Qty"
                                        name="qty"
                                        value={form?.qty}
                                        onChange={handleChange}
                                        style={{ borderColor: '#A64B2A', backgroundColor: '#613D2B40', width: "90%", height: 50, borderRadius: 5 }}
                                    />
                                </form>
                                <form>
                                    <textarea rows={3} placeholder="Deskription"
                                        name="desc"
                                        onChange={handleChange}
                                        value={form?.desc}
                                        style={{ borderColor: '#A64B2A', backgroundColor: '#613D2B40', width: "90%", borderRadius: 5, marginTop: 10, }}
                                    />
                                </form>

                                <input
                                    type="file"
                                    id="upload"
                                    name="image"
                                    onChange={handleChange}
                                    hidden


                                />
                                <label for="upload"
                                    style={{ borderColor: '#A64B2A', backgroundColor: '#613D2B40', width: "40%", height: 50, borderRadius: 5, marginTop: 10, padding: 10 }} >
                                    Upload file
                                </label>
                                {/* <Button style={{ width: '40%', marginLeft: 200, marginTop: 50, backgroundColor: '#A64B2A' }}></Button> */}
                                <Row>
                                    <button style={{ width: '40%', marginLeft: 190, marginTop: 50, backgroundColor: '#613D2B', padding: 10, borderRadius: 10, color: 'white' }} >Edit Product</button>
                                </Row>
                            </Form>
                        </Row>
                    </Col>
                    <Col style={{ marginTop: 100, marginLeft: 50 }}>
                        {preview && (
                            <div>
                                <img
                                    src={preview}
                                    style={{
                                        width: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'cover',
                                    }}
                                    alt="preview"
                                />
                            </div>
                        )}
                    </Col>

                </Row>

            </Container>
        </div>
    );
}

export default ComponentEditProduct; 