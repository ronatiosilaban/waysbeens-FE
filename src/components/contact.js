import React from "react";
import { Container, Row, Col, Button, } from 'react-bootstrap';
import default_profile from '../asssets/coffe.jpg'
import sendchat from "../asssets/add.svg"

export default function Contact({ dataContact, clickContact, contact }) {
    return (
        <>

            {dataContact.length > 0 && (
                <>
                    {dataContact.map((item) => (
                        <Row
                            key={item.id}
                            className={`contact p-2 ${contact?.id === item?.id && "contact-active"
                                }`}
                            onClick={() => {
                                clickContact(item);

                            }}
                            style={{ backgroundColor: '#DFDFDF', padding: 10, borderRadius: 10, marginRight: 10 }}>


                            <Col sm={2}>
                                <img
                                    src={item.profile?.image || default_profile}
                                    className="rounded-circle me-2 img-contact"
                                    style={{ width: 50, height: 50, }}
                                    alt="user avatar"
                                />
                            </Col>
                            <Col>
                                {/* <div className="ps-1 text-contact d-flex flex-column justify-content-around"> */}
                                <p className="mb-0" style={{ marginTop: 10 }}>{item.name}</p>
                                {/* </div> */}
                            </Col>

                        </Row>
                    ))}
                </>
            )}
        </>
    );
}
