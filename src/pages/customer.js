import NavAdmin from '../components/navbar-admin';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import less from '../asssets/less.svg';
import add from '../asssets/add.svg';
import deletes from '../asssets/delete.svg'

function ComponentCustomer() {
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
                            <tr>
                                <td>1</td>
                                <td>Jesicca Veronica</td>
                                <td>Amsterdam</td>
                                <td>12342</td>
                                <td>Coffe</td>
                                <td>Waiting</td>
                                <td ><Button style={{ backgroundColor: '#F32424', paddingLeft: 20, paddingRight: 20, marginLeft: 40 }}>Cancel</Button>
                                    <Button style={{ backgroundColor: '#5FD068', marginLeft: 5 }}>Approve</Button></td>

                            </tr>


                        </tbody>
                    </Table>

                </Row>
            </Container>
        </div>
    );
}

export default ComponentCustomer;