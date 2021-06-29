import React from 'react';
import { Link } from "react-router-dom";
//import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
const axios = require("axios");

const PostDetails = (props) => {
   
    const foundPost = props.showPostDetails;

    const deletePostOnClick = async (id) => {
      try {
        axios
          .delete(`http://localhost:3001/post/${id}`, {
            data: { id: id },
          })
          .then((response) => props.sendGetRequest(response.data));
      } catch (error) {
        console.log(error);
      }
      console.log(id);
    };
   
    return (
      <section className="post-section">
        {foundPost ? (
          <div className="card-body">
            <h1 className="card-title">{foundPost.title}</h1>
            <p
              dangerouslySetInnerHTML={{ __html: foundPost.content }}
              className="card-text"
            ></p>
            <Link className="p-5" to={`/editPost/${foundPost._id}`}>
              <button className="btn btn-primary mt-5 postButton">Edit</button>
            </Link>
            <button
              onClick={() => {
                deletePostOnClick(foundPost._id);
              }}
               className="btn btn-primary mt-5 postButton"
            >
              Delete
            </button>
          </div>
        ) : null}
      </section>
    );
};

export default PostDetails;