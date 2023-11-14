import React from 'react';
import Home from "../../img/home.png";
import Noti from "../../image/abt.png";
import Comment from "../../img/comment.png";
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="aboutpos">
      <div className="abtIcons">
        <Link to='../home'>
          <img src={Home} alt="" style={{ width: "23px" }} />
        </Link>
        <Link to="../chat" style={{ width: "18px" }}>
          <img src={Comment} alt="" />
        </Link>
        {/* <UilSetting /> */}
        <Link to='../about'>
          <img src={Noti} alt="" style={{ width: "30px", height: "30px" }} />
        </Link>
      </div>
      <div>
        <h2 style={{ paddingTop: "50px", textAlign: "center" }}>ABOUT TRIEXPRESS</h2>
        <div className="paragraph">
          <p>
            Social media websites have become an integral part of modern society, revolutionizing the way people connect, communicate, and share information online. These platforms serve as virtual communities where users can create profiles, interact with others, and exchange various forms of content, such as text, images, and videos. The abstract nature of social media websites lies in their ability to transcend geographical boundaries, enabling individuals to connect with others worldwide.
            Social media websites represent an abstract digital space where individuals can connect, share, and engage with others from diverse backgrounds. While they offer numerous benefits in terms of social connectivity and information exchange, careful consideration must be given to the challenges they pose, with efforts focused on striking a balance between freedom of expression, privacy, and responsible use.
            <br/>
            <br/>
            TriExpress is a social website specially developed for the students of Trident. This website will help to establish a secure connection between students ,seniors, class-mates.
          </p>
        </div>
      </div>

    </div>
  )
}

export default About