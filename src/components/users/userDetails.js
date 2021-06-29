import React from "react";
import { Link, useParams } from "react-router-dom";
const axios = require("axios");


const UserDetails = (props) => {
   
    const foundUser = props.showUserDetails;

    const deleteUserOnClick = async (id) => {
      try {
        axios
          .delete(`http://localhost:3001/user/${id}`, {
            data: { id: id },
          })
          .then((response) => props.sendUserGetRequest(response.data));
      } catch (error) {
        console.log(error);
      }
      console.log(id);
    };
   
    return (
      <section className="user-section">
        {foundUser ? (
          <div className="card-body">
            <h1 className="card-title">{foundUser.name}</h1>
            <p
              dangerouslySetInnerHTML={{ __html: foundUser.content }}
              className="card-text"
            ></p>
            <Link className="p-5" to={`/editUser/${foundUser.id}`}>
              <button className="btn btn-primary mt-5 userButton">Edit</button>
            </Link>
            <button
              onClick={() => {
                deleteUserOnClick(foundUser.id);
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

export default UserDetails;