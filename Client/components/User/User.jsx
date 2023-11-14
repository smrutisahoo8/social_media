import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, setMemeber, unfollowUser } from '../../actions/userAction';
import Comment from "../../img/comment.png";
import { Link } from 'react-router-dom';
import { createChat, deleteChat } from '../../api/ChatRequest';


const User = ({ person }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const setMemberInState = () => {
        dispatch(setMemeber(person));
    }

    const handleFollow = () => {
        following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        following ?
            deleteChat({ senderId: user._id, receiverId: person._id }) :
            createChat({ senderId: user._id, receiverId: person._id });

        setFollowing((prev) => !prev);
    }

    return (
        <div className="follower">
            <div>
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "use.jpg"} alt="" className='followerImage' />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <div>
                <Link to="/chat">
                    {following ? <img src={Comment} alt="" style={{ width: "20px", marginTop: "4px" }} onClick={setMemberInState}/> : null}
                </Link>
            </div>
            <button className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>)
}

export default User