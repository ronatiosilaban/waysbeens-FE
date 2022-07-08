import NavAdmin from '../components/navbar-admin';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import less from '../asssets/less.svg';
import add from '../asssets/add.svg';
import deletes from '../asssets/delete.svg'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { useQuery, useMutation } from 'react-query';
import convertRupiah from 'rupiah-format';
import dateFormat from 'dateformat';

import { API } from '../config/api';

function ComponentCustomer() {
    const title = 'Income Transaction';
    document.title = 'Waysbeens | ' + title;
    const [link, setLink] = useState('')

    let { data: transactions, refetch } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions')
        setLink(response.data.link)
        return response.data.data;
    });

    const handleCancle = async (item) => {
        const data = {
            status: "cancle",
            idSeller: item.seller.id

        }

        const response = await API.patch('/transactions', data)
        refetch()
        console.log('ini increment', response);
    }

    const handleAprove = async (item) => {
        const data = {
            status: "on the way",
            idSeller: item.seller.id

        }

        const response = await API.patch('/transactions', data)
        refetch()
        console.log('ini increment', response);
    }
    console.log('tarsss', transactions);

    return (
        <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
            <NavAdmin />
            <Container>
                <Row>
                    <Col style={{ marginTop: 100, color: '#733C3C', marginBottom: 20 }}><h1>Income Transaction</h1></Col>

                </Row>
                <Row>
                    <Table striped bordered hover style={{ marginLeft: 70, width: '90%' }}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th style={{ width: 50 }}>No</th>
                                <th style={{ width: 180 }}> Name</th>
                                <th style={{ width: 200 }}>Address</th>
                                <th style={{ width: 100 }}>Post Code</th>
                                <th style={{ width: 200 }}>Products Order</th>
                                <th style={{ width: 100 }}>Status</th>
                                <th style={{ width: 250 }}>Action</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                transactions?.map((item, index) => (
                                    <tr key={index}>
                                        <td >{index + 1}</td>
                                        <td>{item.buyer.name}</td>
                                        <td>Amsterdam</td>
                                        <td>12342</td>
                                        <td>{item.product.name}</td>
                                        <td>{item.status}</td>
                                        <td ><Button
                                            onClick={() => {
                                                handleCancle(item);
                                            }}
                                            style={{ backgroundColor: '#F32424', paddingLeft: 20, paddingRight: 20, marginLeft: 40 }}>Cancel</Button>
                                            <Button
                                                onClick={() => {
                                                    handleAprove(item);
                                                }}
                                                style={{ backgroundColor: '#5FD068', marginLeft: 5 }}>Approve</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    {/* ) : (
                    <div className="text-center pt-5">
                        <div className="mt-3">No data product</div>
                    </div>
                    )} */}


                </Row>
            </Container>
        </div >
    );
}

export default ComponentCustomer;