import NavUser from '../components/navbaruser';
import { Container, Row, Col, } from 'react-bootstrap';
import foto from '../asssets/landscapcoffe.jfif'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import background from '../asssets/ffff.svg'
import backgrounds from '../asssets/cappp.svg'
import title from '../asssets/Title.svg'
import convertRupiah from 'rupiah-format';
import { Link } from 'react-router-dom';
import { API } from '../config/api'
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query'

function ComponentUser() {

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
        // navigate('/product')
    });

    return (
        //         <div style={{ backgroundColor: '#E5E5E5', height: '150vh' }}>
        //             <NavUser />
        //             <Container>
        //                 <Row>
        //                     <Col>
        //                         <Row>

        //                             <img
        //                                 src={background}
        //                                 style={{
        //                                     width: '58%',
        //                                     height: '500px',
        //                                     objectFit: 'cover',
        //                                     position: 'absolute',
        //                                     marginTop: 40,

        //                                 }}
        //                                 alt=""
        //                             />
        //                             <img
        //                                 src={backgrounds}
        //                                 style={{
        //                                     width: '25%',
        //                                     height: '270px',
        //                                     objectFit: 'cover',
        //                                     alignItems: 'flex-end',
        //                                     marginTop: 80,
        //                                     marginLeft: 730,
        //                                     position: 'absolute',
        //                                     position: "absolute"
        //                                 }}
        //                                 alt=""
        //                             />
        //                             <img
        //                                 src={title}
        //                                 style={{
        //                                     width: '30%',
        //                                     height: '300px',
        //                                     objectFit: 'cover',
        //                                     alignItems: 'flex-end',
        //                                     marginTop: 120,
        //                                     marginLeft: 100,
        //                                     position: 'absolute',
        //                                     position: "absolute"
        //                                 }}
        //                                 alt=""
        //                             />

        //                         </Row>



        //                         {/* <Link to="/detail"> */}
        //                             <Row style={{ marginBottom: 60 }}>
        //                                 <Col style={{ marginTop: 600 }}>
        //                                     {products?.length !== 0 ? (
        //                                         products?.map((item, index) => (
        //                                             <Col sm="3" item={item} key={index} >
        //                                                 <Link to={`/detail/` + item.id} style={{ textDecoration: "none" }}>
        //                                                     <Card style={{ width: '18rem' }}>
        //                                                         <Card.Img variant="top" src={item.image} alt={item.name} />
        //                                                         <Card.Body style={{ backgroundColor: '#F6E6DA', lineHeight: 1 }}>
        //                                                             <Card.Title >{item.name}</Card.Title>
        //                                                             <Card.Text >
        //                                                                 <p>{convertRupiah.convert(item.price)}</p>
        //                                                                 <p>Stock : {item.qty}</p>
        //                                                             </Card.Text>
        //                                                         </Card.Body>
        //                                                     </Card>
        //                                                 </Link>
        //                                             </Col>
        //                                         ))
        //                                     ) : (
        //                                         <Col>
        //                                             <div className="text-center pt-5">
        //                                                 {/* <img
        //                                         className="img-fluid"
        //                                         style={{ width: '40%' }}
        //                                         alt="empty"
        //                                     /> */}
        //                                                 <div className="mt-3">No data product</div>
        //                                             </div>
        //                                         </Col>
        //                                     )}
        //                                 </Col>
        //                             </Row>
        //                         </Link>


        //                     </Col>

        //                 </Row>
        //             </Container >
        //         </div >
        //     );
        // }
        <div style={{ backgroundColor: '#E5E5E5', height: '150vh' }}>
            <NavUser />
            <Container>
                <Row>
                    <Col>
                        <Row>

                            <img
                                src={background}
                                style={{
                                    width: '58%',
                                    height: '500px',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    marginTop: 40,

                                }}
                                alt=""
                            />
                            <img
                                src={backgrounds}
                                style={{
                                    width: '25%',
                                    height: '270px',
                                    objectFit: 'cover',
                                    alignItems: 'flex-end',
                                    marginTop: 80,
                                    marginLeft: 730,
                                    position: 'absolute',
                                    position: "absolute"
                                }}
                                alt=""
                            />
                            <img
                                src={title}
                                style={{
                                    width: '30%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    alignItems: 'flex-end',
                                    marginTop: 120,
                                    marginLeft: 100,
                                    position: 'absolute',
                                    position: "absolute"
                                }}
                                alt=""
                            />
                        </Row>
                        <Row style={{ marginBottom: 60 }}>

                            <Col style={{ marginTop: 600, width: '100%', justifyContent: 'left', display: 'flex', flexDirection: 'row-reverse' }}>

                                {/* <Link to="/detail"> */}

                                <Row>
                                    {products?.length !== 0 ? (
                                        products?.map((item, index) => (
                                            <Col sm="3" item={item} key={index}>
                                                <Link to={`/detail/` + item.id} style={{ textDecoration: "none" }}>
                                                    <Card style={{ width: '18rem' }}>
                                                        <Card.Img variant="top" src={item.image} alt={item.name} />
                                                        <Card.Body style={{ backgroundColor: '#F6E6DA', lineHeight: 1 }}>
                                                            <Card.Title >{item.name}</Card.Title>
                                                            <Card.Text >
                                                                <p>{convertRupiah.convert(item.price)}</p>
                                                                <p>Stock : {item.qty}</p>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        ))
                                    ) : (
                                        <Col>
                                            <div className="text-center pt-5">
                                                <img
                                                    className="img-fluid"
                                                    style={{ width: '40%' }}
                                                    alt="empty"
                                                />
                                                <div className="mt-3">No data product</div>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                                {/* </Link> */}


                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ComponentUser;