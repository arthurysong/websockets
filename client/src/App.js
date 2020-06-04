import React from 'react';
import './App.css';
import Cable from 'actioncable';

class App extends React.Component {
  state = {
    newMessage: "",
    messages: []
  }

  handleData = data => {
    switch (data.type) {
      case 'current_messages':
        this.setState({
          messages: data.messages
        })
        break;
      case 'new_message':
        this.setState(prevState => ({
          messages: [...prevState.messages, data.message]
        }))
        break;
      default:
        break;
    }
  }

  componentDidMount(){
    this.cable = Cable.createConsumer(`ws://localhost:3001/cable`);
    this.subscription = this.cable.subscriptions.create({
      channel: "MessagesChannel",
    }, {
      connected: () => {console.log('WS connected')},
      disconnected: () => {console.log('WS disconnected')},
      received: data => {
        console.log(data);
        this.handleData(data);
      },
      createMessage: function(data){
        this.perform("create_message", { content: data });
      }
    })
  }
  
  componentWillUnmount(){
    this.cable.subscriptions.remove(this.subscription);
  }
  

  submitHandler = event =>  {
    event.preventDefault();
    this.subscription.createMessage(this.state.newMessage);
  }

  changeHandler = event => {
    this.setState({
      newMessage: event.target.value
    })
  }

  renderMessages = () => (this.state.messages.map((message, index) => <li key={index}>{message.content}</li>));

  render() {
    return (
      <div className="App">
        Messages Board:
        <ul>
          {this.renderMessages()}
        </ul>

        <form onSubmit={this.submitHandler}>
          <input type="text" onChange={this.changeHandler} value={this.state.newMessage} name="newMessage"/>
          <input type="submit" value="Post"/>
        </form>
      </div>
      );
    }
}

export default App;
