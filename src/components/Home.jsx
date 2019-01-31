/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line import/no-unresolved
import React, { Component } from "react";
import API from "../utils/API";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

class Home extends Component {
  state = {
    meetUp: [],
    dailyPoem: [],
    dbPoems: [],
  };

  componentDidMount() {
    this.loadMeetup();
    this.loadPoem();
    this.loadPoemDB();
  }

  // load meetup API
  loadMeetup = () => {
    API.getMeetUp()
      .then(res => this.setState({
        meetUp: res.data[0],
      }))
      .catch(err => console.log(err));
  };

  // Load Poem API
  loadPoem = () => {
    API.getPoems()
      .then(res => this.setState({
        dailyPoem: res.data[0],
      }))
      .catch(err => console.log(err));
  };

  // Load Poems from DB
  loadPoemDB = () => {
    API.getPoemsDB()
      .then(res => this.setState({
        dbPoems: res.data,
      }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="home-page" style={crumpledPaper}>
        <div className="main">
          <Navbar />
          <div className="container">
            <div className="main-body">
              <div className="welcome">
                <h1>Welcome To Poem Spot</h1>
              </div>
            </div>
          </div>
        </div>
        <div id="dailyPoem">
          <div className="APIS">
            <h1>Daily Poem</h1>
            <h2>{this.state.dailyPoem.title}</h2>
            <p>{this.state.dailyPoem.content}</p>
            <p>{this.state.dailyPoem.url}</p>
            {/* <p>{this.state.dailyPoem.poet.name}</p> */}
            {/* <p>{this.state.dailyPoem.poet.url}</p> */}
          </div>
        </div>
        <div id="meetUp">
          <div className="APIS">
            <h1>Meetup Group</h1>
            <h2>{this.state.meetUp.name}</h2>
            {/* <img src={this.state.meetUp.group_photo.thumb_link} alt="" /> */}
            <p>Status: {this.state.meetUp.status}</p>
            <p>Group Link: {this.state.meetUp.link}</p>
            <p>What we are about: </p>
            {this.state.meetUp.description}
            <p>Location:
              <span> {this.state.meetUp.city} </span>,
              <span> {this.state.meetUp.state}</span>
              <span>  {this.state.meetUp.country}</span>
            </p>
          </div>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58067cfb3b017c497c3ae881ed74ee5658f7c57b
        {/* Database Poems */}
        <div id="dbPoems">
          <div className="APIS">
            <h1>Latest Poems</h1>
            {!this.state.dbPoems.length ? (
              <h1 className="text-center">No Poems to Display</h1>
            ) : (
              <React.Fragment>
                {this.state.dbPoems.map(poems => (
                  <div>
                    <h2>{poems.title}</h2>
                    <p>Authors: {poems.authors}</p>
                    <p>Poem: {poems.body}</p>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
<<<<<<< HEAD
=======
      </div>
      {/* Database Poems */}
      <div id="dbPoems">
        <div className="APIS">
          <h1>Latest Poems</h1>
          {!this.state.dbPoems.length ? (
            <h1 className="text-center">No Poems to Display</h1>
          ) : (
            <React.Fragment>
              {this.state.dbPoems.map(poems => (
                <div>
                  <h2>{poems.title}</h2>
                  <p>Author: {poems.author}</p>
                  <p>Poem: {poems.body}</p>
                </div>
              ))}
            </React.Fragment>
          )}
>>>>>>> 2357520a48ff8545a5d5476482d4ed1093347aac
=======
>>>>>>> 58067cfb3b017c497c3ae881ed74ee5658f7c57b
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
