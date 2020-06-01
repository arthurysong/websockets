import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    newMessage: "",
    messages: [],
    socket: null
  }

  connectToActionCable = host => {
    return (
      new Promise ((resolve, error) => {
        //create and connect
        let socket = new WebSocket(host);

        //handlers
        socket.onopen = () => {resolve(socket)};
        socket.onclose = () => {console.log('ws closed')};
        socket.onerror = errors => {error(errors)};
        socket.onmessage = event => {
          let payload = JSON.parse(event.data);
          
          if (payload.message){
            switch (payload.message.type) {
              case 'current_messages':
                  this.setState({
                    messages: payload.message.messages
                  })
                  break;
              default:
                  break;
            }
          }
        };
      })
    )
  }

  componentDidMount(){
    this.connectToActionCable(`ws://localhost:3001/cable`)
      .then(socket => {
        const subscribe_info = {
          command: 'subscribe',
          identifier: JSON.stringify({channel: "MessagesChannel"})
        }
        // console.log('hi i connected, and now Im going to subscribe')
        this.setState({
          socket: socket
        })
        socket.send(JSON.stringify(subscribe_info));
      });
  }
  
  renderMessages(){
    return (this.state.messages.map((message, index) => <li key={index}>{message.content}</li>))
  }

  submitHandler = event => {
    event.preventDefault();
    const newMessageInfo = {
      command: "message",
      identifier: JSON.stringify({channel: "MessagesChannel"}),
      data: JSON.stringify({action: "create_message", content: this.state.newMessage })
    }
    this.state.socket.send(JSON.stringify(newMessageInfo))
  }

  changeHandler = event => {
    this.setState({
      newMessage: event.target.value
    })
  }

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
