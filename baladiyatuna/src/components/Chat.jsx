import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
    };
    this.socket = null; // Initialize socket as null
  }

  componentDidMount() {
    // Create a WebSocket connection when the component mounts
    this.socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/john/');

    // Set up event listeners
    this.socket.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    this.socket.onmessage = this.handleMessage;

    this.socket.onclose = (event) => {
      console.log(`WebSocket connection closed with code: ${event.code}`);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  componentWillUnmount() {
    // Close the WebSocket connection when the component unmounts
    if (this.socket) {
      this.socket.close();
    }
  }

  handleMessage = (event) => {
    const message = JSON.parse(event.data);
    this.setState((prevState) => ({
      messages: [...prevState.messages, message],
    }));
  };

  handleInputChange = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  handleSendMessage = () => {
    const { newMessage } = this.state;
    this.socket.send(JSON.stringify({ message: newMessage }));
    this.setState({ newMessage: '' });
  };

  render() {
    const { messages, newMessage } = this.state;

    return (
      <div>
        <div>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message.message}</li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSendMessage}>Send</button>
      </div>
    );
  }
}

export default Chat;
