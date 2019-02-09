import React, { Component } from "react";
import API from "../utils/API";
import NavbarDash from "../components/NavbarDash";
import Footer from "../components/Footer";
import IconDance from "../components/IconDance";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

const pageTitle = {
  fontSize: "40px",
};

const initialState = {
  title: "",
  titleError: "",
  author: "",
  authorError: "",
  body: "",
  bodyError: "",
};


class Dashboard extends Component {
  state = initialState;

  constructor(props) {
    super(props);
    this.state = {
      dbPoems: [],
      myPoems: [],
      title: "",
      author: "",
      body: "",
      userProfile: [],
      name: "",
      email: "",
    };
  }

  // When the component mounts, load allpoems will load
  componentDidMount() {
    this.loadAllPoems();
    this.loadUserInfo();
  }

  // Get user info and save
  loadUserInfo = () => {
    API.getUserData()
      .then(res => this.setState({
        userProfile: res.data,
        name: res.data.name,
        email: res.data.email,
      }))
      .catch(err => console.log(err));
    console.log(this.state.userProfile);
  };

  // Load Poems from DB
  loadPoemDB = () => {
    API.getPoemsDB()
      .then(res => this.setState({
        dbPoems: res.data,
        title: "",
        author: "",
        body: "",
      }))
      .catch(err => console.log(err));
  };

  // Load Poems from DB by user id/session user
  loadMyPoems = () => {
    API.getMyPoems()
      .then(res => this.setState({
        myPoems: res.data,
        title: "",
        author: "",
        body: "",
      }))
      .catch(err => console.log(err));
  };

  // Load all poems
  loadAllPoems = () => {
    this.loadPoemDB();
    this.loadMyPoems();
  };

  // Delete poems
  deletePoems = (id) => {
    API.deletePoem(id)
      // eslint-disable-next-line no-unused-vars
      .then(res => this.loadAllPoems())
      .catch(err => console.log(err));
  };

  // Input on change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Submit saves data then loads poems
  handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);

      // clear form
      this.setState(initialState);

      const {
        title,
        author,
        body,
      } = this.state;
      if (title && author && body) {
        API.savePoem({
          title,
          author,
          body,
        })
          .then(res => this.loadAllPoems())
          .catch(err => console.log(err));
      }
    }
  };

  validate = () => {
    let titleError = "";
    let authorError = "";
    let bodyError = "";

    if (!this.state.title) {
      titleError = "Must enter a title";
    }

    if (!this.state.author) {
      authorError = "Must enter an author";
    }

    if (this.state.body.length > 1000) {
      bodyError = "Character limit is 1000";
    }

    if (titleError || bodyError || authorError) {
      this.setState({
        titleError, bodyError, authorError,
      });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div id="dashboard-page" style={crumpledPaper}>
        <NavbarDash />
        <div style={pageTitle}>
          <span>Dashboard</span>
        </div>
        <h2 value={this.state.email}>
          <span>Hi </span>
          {this.state.name}
          <span> ,</span>
          <span>To start writting fill out the poem form.</span>
        </h2>

        <div className="pwrapper">
          <div className="poem-wrapper">
            <h3>Post your poems below</h3>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="title">
                <h6>Poem Title:</h6>
                <input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Title (required)"
                  name="title"
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.titleError}
                </div>
              </div>
              <div className="author">
                <h6>Poem Author:</h6>
                <input
                  onChange={this.handleInputChange}
                  value={this.state.author}
                  type="text"
                  placeholder="Author (required)"
                  name="author"
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.authorError}
                </div>
              </div>
              <div className="poem">
                <h6>Poem:</h6>
                <textarea
                  value={this.state.body}
                  onChange={this.handleInputChange}
                  rows="8"
                  placeholder="Enter Poem here"
                  name="body"
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.bodyError}
                </div>
              </div>
              <div className="postPoem">
                <button
                  onClick={this.handleFormSubmit}
                  type="submit"
                >
                  <span>Submit Poem</span>
                  <IconDance><span role="img" aria-label="write">✍</span></IconDance>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Database Poems */}
        <div className="container" display="flex" flex-direction="row">
          <div id="dbPoems" className="col-md-6 s7">
            <div className="APIS">
              <h1>All Poems</h1>
              {!this.state.dbPoems.length ? (
                <h1 className="text-center">No Poems to Display</h1>
              ) : (
                <React.Fragment>
                  {this.state.dbPoems.map(poems => (
                    <div>
                      <h2>{poems.title}</h2>
                      <p>Author: </p>
                      {poems.author}
                      <p>Poem: </p>
                      {poems.body}
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
          <div id="myPoems" className="col-md-6 s7">
            <div className="APIS">
              <h1>My Poems</h1>
              {!this.state.myPoems.length ? (
                <h1 className="text-center">No Poems to Display. Start writting!</h1>
              ) : (
                <React.Fragment>
                  {this.state.myPoems.map(mypoems => (
                    <div
                      value={mypoems._id}
                      className="mb-5"
                    >
                      <h2>{mypoems.title}</h2>
                      <p>Author: </p>
                      {mypoems.author}
                      <p>Poem: </p>
                      {mypoems.body}
                      <br />
                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => this.deletePoems(mypoems._id)}
                        type="submit"
                      >
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    //   </div>
    );
  }
}

export default Dashboard;
