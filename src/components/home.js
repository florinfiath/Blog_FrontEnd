import { React } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Login from "../components/users/login";

const Home = () => {
  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark img-fluid max-width: 100% height: auto nav-container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse navbar-nav"
          id="navbarNavAltMarkup"
        >
          <div className="floatright">
            <li className="nav-item nav-link active">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
            </li>
            <li class="nav-item nav-link">
              <Link to="/AddPost" className="nav-item nav-link active">
                New Post
              </Link>
            </li>
            <li>
              <Login />
            </li>
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Home;
