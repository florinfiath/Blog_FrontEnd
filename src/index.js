import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-quill/dist/quill.snow.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Home from "./components/home";
import AddPost from "./components/posts/addPost";
import ShowPosts from "./components/posts/showPosts";
import PostDetails from "./components/posts/postDetails";
import EditPost from "./components/posts/editPost";
import ShowUser from "./components/users/showUser";
import UserDetails from "./components/users/userDetails";
import UserRegister from "./components/users/registerUser";
import Login from "./components/users/login";
import axios from "axios";

const App = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  

  useEffect(() => {
    sendGetRequest();
  }, []);
  useEffect(() => {
    sendUserGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      const postsdata = await axios.get(
        "https://florinsblog.herokuapp.com/post"
      );
      setPost(postsdata.data);
    } catch (err) {
      console.error(err);
    }
  };
  const sendUserGetRequest = async () => {
    try {
      const response = await axios.get(
        "https://florinsblog.herokuapp.com/users"
      );
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <Router>
      <Home/>
      <Switch>
        <Route exact path="/">
          <ShowPosts show={post} />
        </Route>
        <Route path="/addPost">
          <AddPost sendGetRequest={sendGetRequest} />
        </Route>
        <Route
          path="/postDetails/:id"
          render={(props) => {
            let onepost = post.find(
              (post) => post._id === props.match.params.id
            );
            if (onepost) {
              return (
                <PostDetails
                  showPostDetails={onepost}
                  sendGetRequest={sendGetRequest}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        ></Route>
        <Route exact path="/">
          <ShowUser show={user} />
        </Route>
        <Route
          path="/userDetails/:id"
          render={(props) => {
            let oneuser = user.find(
              (user) => user.id === props.match.params.id
            );
            if (oneuser) {
              return (
                <UserDetails
                  showUserDetails={oneuser}
                  sendUserGetRequest={sendUserGetRequest}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        ></Route>
        <Route path="/editPost/:id">
          {post && <EditPost edit={post} sendGetRequest={sendGetRequest} />}
        </Route>
        <Route path="/registerUser">
          <UserRegister user={user} sendUserGetRequest={sendUserGetRequest} />
        </Route>
        <Route path="/login">
          <Login user={user} sendUserGetRequest={sendUserGetRequest} />
        </Route>
      </Switch>
      {/* <p>Thanks for visiting, goodbye {localStorage.getItem("user")}</p> */}
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
