import React from "react";
import { Link } from "react-router-dom";

const ShowUser = (props) => {
  return (
   
        <div className="maincolumn">
          <div className="card">
            <h3>User Details</h3>
          </div>
          <div className="card">
            {props.show.map((user, index) => (
              <Link to={`/showUser/${user.id}`}>
                <p key={index}>{user.title}</p>
              </Link>
            ))}
          </div>
        </div>

  );
};

export default ShowUser;
