import NavUser from '../components/navbaruser';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import lesse from '../asssets/less.svg';
import adde from '../asssets/add.svg';
import React, { useState, useEffect, useContext } from 'react';
import deletes from '../asssets/delete.svg'
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import convertRupiah from 'rupiah-format';
import { UserContext } from '../context/user'

function ComponentCart() {
    let navigate = useNavigate();

    let { id } = useParams();

    const [state] = useContext(UserContext);
    console.log('state', state);

    console.log('id', id);
    const [form, setForm] = useState({
        amount: '',

    });

    let { data: carts, refetch } = useQuery('productCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.token,
            },
        };
        const response = await API.get('/cart/' + id);
        // console.log('respon', response.data);

        return response.data.data;;
    });

    const [counter, setCounter] = useState(1)

    function add() {
        setCounter(counter + 1)

    }

    function less() {
        if (counter > 1) {
            setCounter(counter - 1)

        }
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        localStorage.setItem('productCount', counter);
    }, [counter])

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        //change this according to your client-key
        const myMidtransClientKey = 'SB-Mid-client-jVNU7kHcOGPAWIlc';

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const handleBuy = useMutation(async (e) => {
        try {
            e.preventDefault();

            const data = {
                idProduct: carts.product.id,
                idSeller: carts.product.idUser,
                // idBuyer: state?.user.id,
                price: carts?.product?.price,
                amount: carts?.product?.price * counter
            };
            console.log('ahhhha', data);

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
            const response = await API.post('/transaction', body, config);
            const token = response.data.payment.token
            console.log('data', response);


            // Init Snap for display payment page with token here ...
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    // alert("you closed the popup without finishing the payment");
                    // const response = await API.delete(`/transaction/${id}`, body, config);
                    // const token = response.data.payment.token
                    try {
                        alert("you closed the popup without finishing the payment");
                    } catch (error) {
                        console.log(error);
                    }
                },
            });
            // navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    });
    console.log('carts', carts);
    return (
        <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
            <NavUser />
            <Container>
                <Row>
                    <Col sm={7} >
                        <Row style={{ marginTop: 90, fontSize: 30, color: "#361500", fontWeight: 700 }}><p>My Cart</p></Row>
                        <Row><p style={{ marginTop: 20, fontSize: 25, borderBottom: 'solid', color: '#613D2B', borderColor: 'black', paddingBottom: 10 }}>Review Your Order</p></Row>
                        <Row style={{ borderBottom: 'solid', height: 120, color: '#613D2B' }}>
                            <Col sm={1}>
                                <img
                                    src={carts?.product?.image}
                                    style={{
                                        width: '5%',
                                        height: '100px',
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        position: "absolute"
                                    }}
                                    alt=""
                                />
                            </Col>
                            <Col sm={9} style={{ marginLeft: 35, marginTop: 10 }}>
                                <Row>
                                    <Col sm={9}>
                                        <p style={{ textAlign: 'left', paddingLeft: 10, color: '#8E3200', fontWeight: 600 }}>{carts?.product?.name}</p>
                                    </Col>
                                    <Col sm={3} >
                                        <Row>
                                            <p style={{ textAlign: 'right', marginLeft: 90, color: '#8E3200' }}>{convertRupiah.convert(carts?.product?.price)}</p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col sm={10}>
                                        <img
                                            src={lesse}
                                            onClick={less}
                                            style={{
                                                width: 10,
                                                height: '5px',
                                                objectFit: 'cover',
                                                position: 'absolute',
                                                marginTop: 10,
                                                marginLeft: 10

                                            }}
                                            alt=""
                                        />
                                        <p style={{ position: 'absolute', marginLeft: 25, backgroundColor: '#F6E6DA', paddingLeft: 9, paddingRight: 9 }}>{counter}</p>
                                        <img
                                            src={adde}
                                            onClick={add}
                                            style={{
                                                width: 13,
                                                height: '13px',
                                                objectFit: 'cover',
                                                position: 'absolute',
                                                marginTop: 7,
                                                marginLeft: 60
                                            }}
                                            alt=""
                                        />
                                    </Col>
                                    <Col sm={2} >
                                        <Row>
                                            <img
                                                src={deletes}
                                                style={{
                                                    width: '40%',
                                                    height: '18px',
                                                    objectFit: 'cover',
                                                    marginLeft: 160


                                                }}
                                                alt=""
                                            />
                                        </Row>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4} style={{ marginTop: 230, marginLeft: 30, color: '#8E3200' }}>

                        <Row style={{ borderTop: 'solid' }}>
                            <Col style={{ textAlign: 'left', marginTop: 10 }}>
                                <p >Subtotal</p>
                            </Col>
                            <Col style={{ textAlign: 'right', marginTop: 10 }}>
                                <p>{convertRupiah.convert(carts?.product?.price)}</p>
                            </Col>
                        </Row>
                        <Row style={{ borderBottom: 'solid' }}>
                            <Col style={{ textAlign: 'left', marginTop: 8 }}>
                                <p >Qty</p>
                            </Col>
                            <Col style={{ textAlign: 'right', marginTop: 8 }}>
                                <p>{counter}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: 'left', marginTop: 8 }}>
                                <p >Total</p>
                            </Col>
                            <Col style={{ textAlign: 'right', marginTop: 8 }}>
                                <p>{convertRupiah.convert(carts?.product?.price * counter)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: 'right', marginTop: 8 }}>
                                <Button
                                    onClick={(e) => handleBuy.mutate(e)}
                                    style={{ paddingLeft: 100, paddingRight: 100, backgroundColor: '#361500' }}>Pay</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ComponentCart;