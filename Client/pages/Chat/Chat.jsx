import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css";
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../image/abt.png";
import Comment from "../../img/comment.png";
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from 'socket.io-client';

const Chat = () => {
  const { user, member } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  //sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage])



  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    })
  }, [])

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        await setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, id) => (
              chat.members.map((member, memberIndex) => (
                <div key={'m' + memberIndex} onClick={() => { setCurrentChat(chat); setCurrentMemberId(member) }}>
                  <Conversation userId={member} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                </div>))
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to='../home'>
              <img src={Home} alt="" />
            </Link>
            {/* <UilSetting /> */}
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
            <Link to='../about'>
               <img src={Noti} alt="" style={{width:"30px",height:"30px"}}/>
            </Link>            
          </div>
        </div>
        <ChatBox key={`${user._id}_${currentMemberId ? currentMemberId : member._id}`} chat={currentChat} memberId={currentMemberId ? currentMemberId : member._id} currentUser={user._id}
          setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </div>
    </div>
  )
}

export default Chat