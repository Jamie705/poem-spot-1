/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmailChange = (event) => {
    event.preventDefault();
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange = (event) => {
    event.preventDefault();
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { password, email } = this.state;
    Axios.post("http://localhost:3001/users/login", {
      email,
      password,
    })
      .then((res) => {
        const { history } = this.props;
        if (res.status === 200) {
          history.push("/dashboard");
        }
      });
  }

  render() {
    return (
      <div className="main">
        <div className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="container">
          <div className="main-body">
            <div className="authentication">
              <h3>Login</h3>
              <input onChange={this.handleEmailChange} type="text" placeholder="Email Address" name="email" />
              <input onChange={this.handlePasswordChange} type="password" placeholder="Password" name="password" />
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
