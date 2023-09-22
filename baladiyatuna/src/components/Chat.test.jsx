// src/components/Chat.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Chat from './Chat';

test('Chat sends and receives messages', () => {
  const { getByText, getByLabelText } = render(<Chat />);

  // Simulate user typing a message and clicking the Send button
  const messageInput = getByLabelText('Message');
  const sendButton = getByText('Send');
  fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
  fireEvent.click(sendButton);

  // Verify that the message is displayed
  const messageReceived = getByText('Hello, world!');
  expect(messageReceived).toBeInTheDocument();
});
