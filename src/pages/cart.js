import NavUser from '../components/navbaruser';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
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
  const title = 'Cart';
  document.title = 'Waysbeens | ' + title;
  let navigate = useNavigate();

  // let { id } = useParams();
  const [link, setLink] = useState('')
  const [state] = useContext(UserContext);
  console.log('state', state);

  // console.log('id', id);
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

    const response = await API.get('/cart');
    // console.log('respon', response.data);
    setLink(response.data.link)
    return response.data.data;;
  });

  let { data: Count } = useQuery('cartChace', async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: 'Basic ' + localStorage.token,
      },
    };

    const response = await API.get('/carts');
    return response.data.data;;
  });



  const [minusButton, setMinusButton] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState({
    qty: '',
    subtotal: '',
  })

  const handleIncrement = async (item) => {
    const data = {
      qty: item?.qty + 1,
      idProduct: item.product.id

    }

    const response = await API.patch('/cart', data)
    refetch();
    console.log('ini increment', response);
  }


  const handleDecrement = async (item) => {
    if (item?.qty > 1) {
      const data = {
        qty: item.qty - 1,
        idProduct: item.product.id

      }
      const respones = await API.patch('/cart', data)
      refetch();
      console.log('ini decrement', respones);
    }

  }

  useEffect(() => {
    handleDecrement()
    handleDecrement()

  }, [setCart])

  useEffect(() => {
    if (Count !== undefined) {
      localStorage.setItem('cartAmount', Count.amount)
    }
  }, [Count])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };



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
        // amount: carts?.product?.price * counter
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

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
      refetch();
    }
  }, [confirmDelete]);

  console.log('cusss', Count);

  return (
    <div style={{ backgroundColor: '#E5E5E5', height: 'auto', paddingBottom: 140 }}>
      <NavUser countData={Count} />
      <Container style={{ paddingBottom: 255 }}>
        <Row style={{ marginTop: 90, fontSize: 30, color: "#361500", fontWeight: 700 }}><p>My Cart</p></Row>
        <Row><p style={{ marginTop: 20, fontSize: 25, color: '#613D2B', borderColor: 'black', paddingBottom: 10 }}>Review Your Order</p></Row>
        <Row>
          {carts?.length !== 0 ? (
            <>
              {carts?.map((item, index) => (
                <Row style={{ marginBottom: 40 }}>
                  <Col sm={7} >
                    <Row style={{ borderBottom: 'solid', borderTop: 'solid', height: 150, color: '#613D2B' }}>
                      <Col sm={1}>
                        <img
                          src={item.product.image}
                          style={{
                            width: '5%',
                            height: '100px',
                            objectFit: 'cover',
                            position: 'absolute',
                            position: "absolute",
                            marginTop: 20,
                            marginBottom: 15
                          }}
                          alt=""
                        />
                      </Col>
                      <Col sm={9} style={{ marginLeft: 35, marginTop: 20 }}>
                        <Row>
                          <Col sm={9}>
                            <p style={{ textAlign: 'left', paddingLeft: 10, color: '#8E3200', fontWeight: 600 }}>{item.product.name}</p>
                          </Col>
                          <Col sm={3} >
                            <Row>
                              <p style={{ textAlign: 'right', marginLeft: 90, color: '#8E3200' }}>{convertRupiah.convert(item.product.price)}</p>
                            </Row>
                          </Col>
                        </Row>
                        <Row >
                          <Col sm={10}>
                            <div
                              onMouseLeave={() => setMinusButton(false)}
                              onMouseEnter={() => setMinusButton(true)}
                              onClick={() => handleDecrement(item)}>
                              <img
                                src={lesse}

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
                            </div>
                            <p style={{ position: 'absolute', marginLeft: 23, backgroundColor: '#F6E6DA', paddingLeft: 9, paddingRight: 9 }} >{item.qty}</p>
                            <div
                              onMouseLeave={() => setPlusButton(false)}
                              onMouseEnter={() => setPlusButton(true)}
                              onClick={() => handleIncrement(item)}>
                              <img
                                src={adde}

                                style={{
                                  width: 13,
                                  height: '13px',
                                  objectFit: 'cover',
                                  position: 'absolute',
                                  marginTop: 7,
                                  marginLeft: 65
                                }}
                                alt=""
                              />
                            </div>
                          </Col>
                          <Col sm={2} >
                            <Row>
                              <div
                                onClick={() => {
                                  handleDelete(item.id);
                                }}
                                style={{
                                  width: '40%',
                                  height: '18px',
                                  objectFit: 'cover',
                                  marginLeft: 160


                                }}>

                                <img
                                  src={deletes}

                                  alt=""
                                />
                              </div>
                            </Row>
                          </Col>

                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={4} style={{ marginTop: 20, marginLeft: 30, color: '#8E3200' }}>

                    <Row style={{ borderTop: 'solid' }}>
                      <Col style={{ textAlign: 'left', marginTop: 10 }}>
                        <p >Subtotal</p>
                      </Col>
                      <Col style={{ textAlign: 'right', marginTop: 10 }}>
                        <p>{convertRupiah.convert(item.product.price)}</p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: 'solid' }}>
                      <Col style={{ textAlign: 'left', marginTop: 8 }}>
                        <p >Qty</p>
                      </Col>
                      <Col style={{ textAlign: 'right', marginTop: 8 }}>
                        <p>{item.qty}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ textAlign: 'left', marginTop: 8 }}>
                        <p >Total</p>
                      </Col>
                      <Col style={{ textAlign: 'right', marginTop: 8 }}>
                        <p>{convertRupiah.convert(item.product.price * item.qty)}</p>
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


              ))}
            </>
          ) : (
            <div className="no-data-transaction">No transaction</div>

          )}
          <MyVerticallyCenteredModal
            setConfirmDelete={setConfirmDelete}
            show={show}
            handleClose={handleClose}
          // onHide={() => setModalShow(false)}

          />
        </Row>
      </Container>
    </div >
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
        <Button variant="success" onClick={handleDelete} >
          Yes
        </Button>
        <Button variant="danger" onClick={handleClose} >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ComponentCart;