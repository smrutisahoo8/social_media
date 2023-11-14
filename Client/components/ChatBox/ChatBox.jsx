import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../api/UserRequest';
import { addMessage, getMessages } from '../../api/MessageRequest';
import "./ChatBox.css";
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';

const ChatBox = ({ chat, memberId, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();

    useEffect(() => {
        const chatId = chat ? `${chat._id}_${memberId}` : null;
        if (receiveMessage !== null && receiveMessage.chatId === chatId) {
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage])

    //fetching data for header of chat box
    useEffect(() => {
        // const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(memberId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    //fetching data for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const chatId = `${chat._id}_${memberId}`;
                const { data } = await getMessages(chatId);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat) { 
            fetchMessages(); 
        }
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: `${chat._id}_${memberId}`
        }

        //send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId });
    }

    //Always scroll to the last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="ChatBox-container">
            {chat ? (
                <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <img src={userData?.profilePicture
                                    ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                                    : process.env.REACT_APP_PUBLIC_FOLDER + 'use.jpg'} alt=""
                                    className="followerImage"
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <div className="name" style={{ fontSize: "1rem" }}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                    </div>

                    {/* Chatbox Messages */}
                    <div className="chat-body">
                        {messages.map((message) => (
                            <>
                                <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            </>
                        ))}
                    </div>
                    {/* Chat-sender */}
                    <div className="chat-sender">
                        <div>+</div>
                        <InputEmoji
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <div className="send-button button" onClick={handleSend}>
                            Send
                        </div>
                    </div>
                </>
            ) : (
                <span className="chatbox-empty-message">
                    Tap on a chat to start Conversation...
                </span>
            )}

        </div>
    )
}

export default ChatBox