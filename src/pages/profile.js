import NavUser from '../components/navbaruser';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import barcode from '../asssets/barcode.svg'
import Card from '../asssets/Ways.svg';
import be from '../asssets/Be.svg';
import ve from '../asssets/Vectors (1).svg';
import ns from '../asssets/ns.svg';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { useQuery, useMutation } from 'react-query';
import convertRupiah from 'rupiah-format';
import dateFormat from 'dateformat';

import { API } from '../config/api';

function ComponentProfile() {

    const [link, setLink] = useState('')

    const [state] = useContext(UserContext);
    console.log('local', localStorage.productCount);
    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get('/profile');
        return response.data.data;
    });

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions')
        setLink(response.data.link)
        return response.data.data;
    });



    console.log('profile', transactions);
    return (
        <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
            <NavUser />
            <Container>
                <Row>
                    <Col sm={6} style={{ marginTop: 100 }}>
                        <Row><p style={{ fontSize: 25, fontWeight: 600 }}>My Profile</p></Row>
                        <Row>
                            <Col>
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                                    style={{
                                        width: '15%',
                                        height: '300px',
                                        objectFit: 'cover',
                                        alignItems: 'flex-end',
                                        marginTop: 15,
                                        position: 'absolute',

                                    }}
                                    alt=""
                                />
                            </Col>
                            <Col style={{ marginTop: 10, fontSize: 20, fontWeight: 500 }}>
                                <Row><p style={{ color: '#733C3C' }} >Full Name</p></Row>
                                <Row><p style={{ lineHeight: 0 }}>{state.user.name}</p></Row>
                                <Row style={{ marginTop: 30, color: '#733C3C' }}><p>Email</p></Row>
                                <Row><p style={{ lineHeight: 0 }}>{state.user.email}</p></Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6} style={{ marginTop: 100 }}>
                        <Row>
                            <p style={{ fontSize: 25, fontWeight: 600 }}>My Transaction</p>
                        </Row>

                        {transactions?.length !== 0 ? (
                            <>
                                {transactions?.map((item, index) => (

                                    <Row key={index}>
                                        <Col xs="3" >
                                            <Row style={{ backgroundColor: '#E4D1B9', width: 600, height: 170, marginBottom: 20 }}>
                                                <Col sm={1}>
                                                    <img
                                                        src={link + item.product.image}
                                                        style={{
                                                            width: '5%',
                                                            height: '130px',
                                                            objectFit: 'cover',
                                                            position: 'absolute',
                                                            position: "absolute",
                                                            margin: 10,
                                                            marginTop: 15
                                                        }}
                                                        alt=""
                                                    />
                                                </Col>
                                                <Col sm={6} style={{ marginLeft: 70, marginTop: 10, color: '#8E3200' }}>
                                                    <Row><p style={{ lineHeight: 0, fontSize: 20, marginTop: 10, fontWeight: 500 }}>{item.product.name}</p></Row>
                                                    <Row><span style={{ lineHeight: 0, fontSize: 10, marginTop: 5 }}>{dateFormat(item.product.createdAt, 'dddd, d mmmm yyyy')}</span></Row>
                                                    <Row><span style={{ lineHeight: 0, fontSize: 10, marginTop: 30 }}>Price : {convertRupiah.convert(item.product.price)}</span></Row>
                                                    <Row><span style={{ lineHeight: 0, fontSize: 10, marginTop: 30 }}>Qty : {item.product.qty}</span></Row>
                                                    <Row><span style={{ lineHeight: 0, fontSize: 10, marginTop: 30, fontWeight: 600 }}>Sub-Total : {convertRupiah.convert(item.amount)}</span></Row>
                                                </Col>
                                                <Col sm={3} style={{ justifyContent: 'right', alignItems: 'flex-end' }}>
                                                    <Row style={{ marginLeft: 20 }}>
                                                        <img
                                                            src={Card}
                                                            style={{
                                                                width: '4%',
                                                                height: '30px',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                marginTop: 10,


                                                            }}
                                                            alt=""
                                                        />
                                                        <img
                                                            src={be}
                                                            style={{
                                                                width: '2%',
                                                                height: '20px',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                marginTop: 15,
                                                                marginLeft: 55

                                                            }}
                                                            alt=""
                                                        />
                                                        <img
                                                            src={ve}
                                                            style={{
                                                                width: '2%',
                                                                height: '12px',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                marginTop: 23,
                                                                marginLeft: 70

                                                            }}
                                                            alt=""
                                                        />
                                                        <img
                                                            src={ns}
                                                            style={{
                                                                width: '2%',
                                                                height: '5px',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                marginTop: 27,
                                                                marginLeft: 82

                                                            }}
                                                            alt=""
                                                        />
                                                    </Row>
                                                    <Row sm={3}>

                                                        <img
                                                            src={barcode}
                                                            style={{
                                                                width: '6%',
                                                                height: '70px',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                position: "absolute",
                                                                justifyContent: 'right',
                                                                marginLeft: 40,
                                                                marginTop: 50
                                                            }}
                                                            alt=""
                                                        />
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>



                                ))}
                            </>
                        ) : (
                            <div className="no-data-transaction">No transaction</div>

                        )}
                    </Col>
                </Row>

            </Container >
        </div >
    );
}

export default ComponentProfile;