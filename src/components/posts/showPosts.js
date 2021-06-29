import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap"


const ShowPosts = (props) => {
 

 return (
    <Container>
      <div className="post-container pacifico-font pt-3">
        <div className="btn-container mx-auto">
          {props.show.map((post, index) => (
            <Link to={`/postDetails/${post._id}`}>
              <p key={index}>{post.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>

   
  );
};
     
 
 



export default ShowPosts;
