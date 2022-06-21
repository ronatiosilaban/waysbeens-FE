import NavAdmin from '../components/navbar-admin';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { io } from 'socket.io-client'
import { UserContext } from '../context/user'
import React, { useEffect, useState, useContext } from 'react';
import Contact from '../components/contact'
import Chat from '../components/text'

let socket
export default function ComponentComplainAdmin() {
    const title = "Complain admin"
    document.title = 'WaysBeans | ' + title

    // const [contact, setContact] = useState(null)
    // const [contacts, setContacts] = useState([])
    // // create messages state
    // const [messages, setMessages] = useState([])

    // console.log('dtaaa', messages);

    // const [state] = useContext(UserContext)
    // console.log('vvvvvv', state);
    // useEffect(() => {
    //     socket = io('http://localhost:5000', {
    //         auth: {
    //             token: localStorage.getItem('token')
    //         },
    //         query: {
    //             id: state.user.id
    //         }
    //     })

    //     socket.on("new message", () => {
    //         console.log("contact", contact)
    //         socket.emit("load messages", contact?.id)
    //     })

    //     loadContacts()
    //     loadMessages()

    //     return () => {
    //         socket.disconnect()
    //     }
    // }, [messages])

    // const loadContacts = () => {
    //     socket.emit("load customer contacts")
    //     socket.on("customer contacts", (data) => {
    //         let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))

    //         dataContacts = dataContacts.map((item) => ({
    //             ...item,
    //             message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message"
    //         }))
    //         setContacts(dataContacts)
    //     })
    // }

    // const onClickContact = (data) => {
    //     setContact(data)
    //     socket.emit("load messages", data.id)
    // }

    // const loadMessages = (value) => {
    //     socket.on("messages", (data) => {
    //         if (data.length > 0) {
    //             const dataMessages = data.map((item) => ({
    //                 idSender: item.sender.id,
    //                 message: item.message,

    //             }))
    //             console.log('wkwkw', dataMessages);
    //             setMessages(dataMessages)
    //         }
    //         loadContacts()
    //         const chatMessagesElm = document.getElementById("chat-messages");
    //         chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight;
    //     })
    // }

    // const onSendMessage = (e) => {
    //     // listen only enter key event press
    //     if (e.key === 'Enter') {
    //         const data = {
    //             idRecipient: contact.id,
    //             message: e.target.value
    //         }

    //         //emit event send message
    //         socket.emit("send message", data)
    //         e.target.value = ""
    //     }
    // }
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])


    // code here
    const [state] = useContext(UserContext)
    console.log('sta', state);

    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            // code here
            query: {
                id: state.user.id
            }
        })

        // code here
        socket.on("new message", () => {
            console.log("contact : ", contact);
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        // code here
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].massage : "Click here to start message"
            }))
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit("load messages", data.id)
    }

    // code here
    const loadMessages = () => {
        socket.on("messages", (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)
            }
            loadContacts()
        })
    }

    const onSendMessage = (e) => {
        if (e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit("send message", data)
            e.target.value = ""
        }
    }
    return (
        <>

            <div style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
                <NavAdmin />
                <Container>
                    <Row style={{ marginTop: 70, marginLeft: 30, marginRight: 30 }}>
                        <Col sm={4}   >
                            <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                        </Col>
                        <Col md={8} style={{ height: '75vh', backgroundColor: '#DFDFDF' }} className="px-0">
                            <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />

                        </Col>
                    </Row>
                </Container >
            </div >
        </>
    )
}

// export default ComponentComplainAdmin;