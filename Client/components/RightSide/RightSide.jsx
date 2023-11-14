import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RightSide.css';
import Home from "../../img/home.png";
import Noti from "../../image/abt.png";
import Comment from "../../img/comment.png";
// import { UilSetting } from "@iconscout/react-unicons";
import Trendcard from '../TrendCard/Trendcard';
import ShareModal from '../ShareModal/ShareModal';


const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to='../home'>
          <img src={Home} alt="" />
        </Link>
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
        {/* <UilSetting /> */}
        <Link to='../about'>
        <img src={Noti} alt="" style={{width:"30px",height:"30px"}}/>
        </Link>
       
      </div>
      <Trendcard />
      {/* <button className="button r-button" onClick={() => setModalOpened(true)} >

        Share
      </button> */}
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

    </div>
  )
}

export default RightSide