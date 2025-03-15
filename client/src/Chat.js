import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input.trim() }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.content }
        ]);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#444654', // ChatGPT-like darker panel
        borderRadius: '8px',
        flex: 1,                // Takes remaining vertical space
        overflow: 'hidden',     // Hide overflow except for the scrollable area
        position: 'relative'
      }}
    >
      {/* Messages Container */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          // On mobile, we want a bit more “app” feeling
          // so we adjust spacing if needed. This is optional.
        }}
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>

      {/* Input Bar (fixed at bottom in this container) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #3f3f46',
          padding: '10px',
          backgroundColor: '#343541'
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          style={{
            flex: 1,
            marginRight: '10px',
            padding: '12px',
            borderRadius: '25px',        // More bubble-like
            border: '1px solid #555',
            backgroundColor: '#3f3f46',
            color: '#fff',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '12px 20px',
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#19c37d',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'background-color 0.2s ease-in-out'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
