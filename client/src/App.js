import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    messages: []
  }

  componentDidMount(){

  }
  
  renderMessages(){
    this.state.messages.map((message, index) => <li key={index}>{message.content}</li>)
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
      );
    }
}

export default App;
