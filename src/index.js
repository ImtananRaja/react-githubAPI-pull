import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import "./styles.css";

const Card = props => {
  return (
    <div style={{ margin: "1em" }}>
      <img className="image" src={props.avatar_url} />
      <div className="info">
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return <div>{props.cards.map((card,index) => <Card key={index}{...card} />)}</div>;
};

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = event => {
    event.preventDefault();
    console.log("Event: Form Submit", this.state.userName);
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(resp => {
      this.props.onSubmit(resp.data);
      this.setState({ userName: '' });
      //console.log(resp);
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          ref={input => (this.userNameInput = input)}
          placeholder="Github username"
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };

  addNewCard = (cardInfo) => {
      console.log(cardInfo);
      this.setState(prevState => ({
        cards: prevState.cards.concat(cardInfo)
      })); 
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
