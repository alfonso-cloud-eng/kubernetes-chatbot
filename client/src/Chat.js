import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // This ensures that on new messages, we scroll to the bottom of the container
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
        backgroundColor: '#444654',
        borderRadius: '8px',
        margin: '0 10px',
        flex: 1,             // Fill remaining vertical space after heading
        overflow: 'hidden',  // No extra scrolling on container
        position: 'relative'
      }}
    >
      {/* Messages Container (column-reverse) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {/* Render messages in normal order,
            but the container is reversed so the newest appear at bottom */}
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
        {/* A dummy ref at the top (because reversed) to keep auto-scroll logic simpler */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar pinned at bottom */}
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
            borderRadius: '25px',
            border: '1px solid #555',
            backgroundColor: '#3f3f46',
            color: '#fff',
            outline: 'none',
            fontSize: '1rem'
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
            fontSize: '1rem',
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
