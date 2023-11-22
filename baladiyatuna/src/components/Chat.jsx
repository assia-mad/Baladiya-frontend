import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiInstance from '../../API';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [websocket, setWebsocket] = useState(null);



  const fetchCurrentUser = async () => {
    try {
      const response = await apiInstance.get('user/'); 
      return response;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/chat/1/2/');
    setWebsocket(ws);
    console.log('websockets connect succesfully !')
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

useEffect(() => {
    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('token');

    // Create the WebSocket connection with the token as a query parameter
    const ws = new WebSocket(`ws://localhost:8000/ws/notifications/?token=${token}`);

    // Make sure to close the WebSocket connection when the component unmounts
    return () => {
        ws.close();
    };
}, []);



  
  

  const sendMessage = async () => {
    if (websocket && messageInput) {
      const currentUser = await fetchCurrentUser();
  
      if (currentUser) {
        console.log(websocket,"we are gggggggggggggggggggoing to send throw this");
        websocket.send(JSON.stringify({
          content: messageInput,
          sender: currentUser.id,
        }));
  
        setMessageInput('');
      }
    }
  };
  

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;

