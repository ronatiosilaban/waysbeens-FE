import React from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../context/user'
import default_profile from '../asssets/coffe.jpg'


export default function Chat({ contact, user, messages, sendMessage }) {

    // const [state] = useContext(UserContext)

    return (

        <>
            {contact ? (
                <>

                    <Row style={{
                        backgroundColor: '#C4C4C4', padding: 10, width: "800px", marginLeft: 3, width: "100%"
                    }}>
                        < Col sm={1} >
                            <img src={default_profile} alt="user avatar" class="rounded-circle" style={{ width: 50, height: 50, }} />
                        </Col>
                        <Col style={{ marginTop: 10 }}><p></p></Col>
                    </Row>


                    <div id="chat-messages" style={{ height: "60vh", backgroundColor: '#DFDFDF' }} className="overflow-auto px-3 py-2">

                        {messages.map((item, index) => (
                            <div key={index} className={`d-flex py-1 ${item.idSender == user.id ? "justify-content-end" : "justify-content-start"}`}>

                                {/* <div

                                    className={item.idSender === user.id ? "chat-me" : "chat-other"}

                                > */}
                                <div
                                    style={{
                                        color: 'rgb(202, 199, 199)',
                                        lineHeight: '5px',
                                        paddingLeft: '1rem',
                                        paddingTop: '1rem',
                                        paddingBottom: '1rem',
                                        paddingRight: '1rem',
                                        marginLeft: '0rem',
                                        marginRight: '1rem',
                                        marginBottom: '1rem',
                                        borderRadius: 15,
                                        backgroundColor: '#FFFFFF',
                                        fontWeight: 500,
                                        color: 'black',
                                        textAlign: 'right'
                                        // background: 'var(--right-msg-bg)'
                                    }}>{item.message}</div>
                                <div>{user.id}</div>
                                {/* </div> */}


                            </div>
                        ))}
                    </div>


                    <div className="px-3">
                        <textarea
                            placeholder="Send Message"
                            style={{ height: '6vh', width: "100%", borderRadius: 10 }}
                            onKeyPress={sendMessage} />
                    </div>



                </>
            ) : (
                <div
                    style={{ height: "89.5vh" }}
                    className="h4 d-flex justify-content-center align-items-center"
                >
                    No Message
                </div>
            )
            }
        </>

    );
}
// style={{
//     color: 'rgb(202, 199, 199)',
//     lineHeight: '5px',
//     paddingLeft: '1rem',
//     paddingTop: '1rem',
//     paddingBottom: '1rem',
//     paddingRight: '1rem',
//     marginLeft: '0rem',
//     marginRight: '1rem',
//     marginBottom: '1rem',
//     borderRadius: 15,
//     backgroundColor: '#FFFFFF',
//     fontWeight: 500,
//     color: 'black',
//     textAlign: 'right'
//     // background: 'var(--right-msg-bg)'
// }}