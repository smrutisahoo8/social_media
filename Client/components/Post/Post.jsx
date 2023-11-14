import React, { useEffect, useRef, useState } from 'react';
import './Post.css';
import Comment from '../../image/cmt.png';
// import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, likePost } from '../../api/PostRequest';
import { setPostComments } from '../../actions/postAction';


const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [commentsCount, setCommentsCount] = useState(data.comments ? data.comments.length : 0);

  const [showComment, setShowComment] = useState(false);
  const comment = useRef('');

  const toggleComment = () => { setShowComment(!showComment) };

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  }

  const handleComment = (e) => {
    e.preventDefault();
    const newComment = {
      postId: data._id,
      user: user.firstname + ' ' + user.lastname,
      comment: comment.current.value
    }
    addComment(newComment)
      .then(() => {
        dispatch(setPostComments(newComment));
        setCommentsCount(commentsCount + 1);
        comment.current.value = "";

      })
      .catch((e) => {
        console.error("Comment failed")
      });

  }

  return (
    <div className="Post">
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>

      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" style={{ width: "30px", paddingTop: "3.5px", cursor: "pointer" }}
          onClick={handleLike} />
        <img src={Comment} alt="" style={{ width: "32px" }}
          onClick={toggleComment}
        />
        {/* <img src={Share} alt="" /> */}
      </div>

      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>
      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{commentsCount} commented</span>


      <div >
        {data.comments ? data.comments.map((item, id) => (
          <div key={id} style={{ fontSize: "12px", marginBottom: "5px" }}>
            <b style={{ marginRight: "5px" }}>{item.userName}</b>
            <span>{item.comment}</span>
          </div>
        )): null}
      </div>

      {showComment ?
        <div className="cmmt" style={{ display: "flex" }}>
          <input
            style={{
              borderRadius: "30px", width: "270px", height: "30px", padding: "2px 12px", backgroundColor: "var(--inputColor)", border: "none", fontSize: "16px"
            }}
            type="text"
            name="comment"
            placeholder="Add a comment..."
            ref={comment}
          />
          <button className="button ps-button" style={{ width: "80px", marginLeft: "30px" }}
            onClick={handleComment}
          // disabled={!comment.current.value}  // to do 
          >
            Send
          </button>
        </div> : null}
    </div>
  )
}

export default Post