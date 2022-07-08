import NavUser from '../components/navbaruser';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import convertRupiah from 'rupiah-format';

import { API } from '../config/api';

function ComponentDetail() {
    const title = 'Detail Product';
    document.title = 'Waysbeens | ' + title;
    let navigate = useNavigate();
    let { id } = useParams();

    const [form, setForm] = useState();
    let { data: product } = useQuery('productCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.token,
            },
        };
        const response = await API.get('/product/' + id, config);
        console.log('resss', response);
        return response.data.data;
    });

    let { data: Count, refetch } = useQuery('cartChace', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.token,
            },
        };

        const response = await API.get('/carts');
        return response.data.data;;
    });

    useEffect(() => {
        if (Count !== undefined) {
            localStorage.setItem('cartAmount', Count.amount)
        }
    }, [Count])
    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleBuy = useMutation(async (e) => {
        try {
            e.preventDefault();

            const data = {
                idProduct: product.id,
                // idUser: product.user.id,
                // amount: localStorage.productCount
            };
            console.log(data);

            const body = JSON.stringify(data);

            const config = {
                method: "POST",
                headers: {
                    Authorization: 'Basic ' + localStorage.token,
                    'Content-type': 'application/json',
                },
                body
            };


            // await API.post('/transaction', body, config);
            const response = await API.post('/cart', body, config);
            refetch()
            console.log('data', response.data.data);
            // navigate(`/cart/${response.data.data.id}`)


            // navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    });


    console.log('prodct', product);
    return (
        <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
            <NavUser />
            <Container>
                <Row>
                    <Col sm={4}>
                        <img
                            src={product?.image}
                            style={{
                                width: '436px',
                                height: '555px',
                                objectFit: 'cover',
                                position: 'absolute',
                                marginTop: 100

                            }}
                            alt=""
                        />
                    </Col>
                    <Col sm={8} style={{ marginTop: 130, color: '#733C3C', marginLeft: 500 }}>
                        <Row><h1>{product?.name}</h1></Row>
                        <Row><p>Stock : {product?.qty}</p></Row>
                        <Row><p style={{ color: 'black' }}>{product?.desc}</p></Row>
                        <Row><p style={{ fontSize: 20, fontWeight: 600, textAlign: 'right', marginTop: 20 }}>{convertRupiah.convert(product?.price)}</p></Row>
                        <Row><Button
                            onClick={(e) => handleBuy.mutate(e)}
                            style={{ backgroundColor: '#733C3C', fontWeight: 600, marginTop: 20 }}>Add Card</Button></Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ComponentDetail;