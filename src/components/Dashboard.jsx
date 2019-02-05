import React, { Component } from "react";
// import Axios from "axios";
import API from "../utils/API";
import NavbarDash from "./NavbarDash";
import Footer from "./Footer";
import Button from "./Button";
import IconDance from "./IconDance";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbPoems: [],
      title: "",
      author: "",
      body: "",
    };
  }

  // When the component mounts, load allpoems will load
  componentDidMount() {
    this.loadPoemDB();
  }

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

  // input on change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Submit saves data then loads poems
  handleFormSubmit = (event) => {
    event.preventDefault();
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
        // eslint-disable-next-line no-unused-vars
        .then(res => this.loadPoemDB())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div style={crumpledPaper}>
        <NavbarDash />
        <div margin-bottom="0">
          <h3 style={{ fontSize: "5em" }}>Dashboard</h3>
        </div>
        <div className="container" display="flex" flex-direction="row">
          <div className="row">
            <div className="col-md-5">
              <form className="form-group main-body">
                <div className="authentication">
                  <p>Poem Title :</p>
                  <input
                    className="form-control"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                    type="text"
                  />
                  <p>Poem Author :</p>
                  <input
                    className="form-control"
                    value={this.state.authors}
                    onChange={this.handleInputChange}
                    name="author"
                    placeholder="Author (required)"
                    type="text"
                  />
                  <p>Poem :</p>
                  <textarea
                    className="form-control"
                    value={this.state.body}
                    onChange={this.handleInputChange}
                    name="body"
                    placeholder="Body (required)"
                  />
                  <Button
                    disabled={!(this.state.author && this.state.title && this.state.body)}
                    onClick={this.handleFormSubmit}
                    type="submit"
                  >
                    <span>Submit Poem</span>
                    <IconDance><span role="img" aria-label="write">✍</span></IconDance>
                  </Button>
                </div>
              </form>
            </div>
            {/* Database Poems */}
            <div id="dbPoems" className="col-md-7 col-lg-7 s7">
              <div className="APIS">
                <h1>My Poems</h1>
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
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
