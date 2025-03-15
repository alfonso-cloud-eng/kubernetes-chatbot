import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageContainerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
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
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
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
        height: '100%',            // Fixed height container
        backgroundColor: '#444654',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Scrollable messages area */}
      <div
        ref={messageContainerRef}
        style={{
          flex: 1,               // Fill available space above the input bar
          overflowY: 'auto',     // Scrollable if messages exceed container
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Messages start at the bottom
          padding: '16px'
        }}
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>
      {/* Pinned input bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #3f3f46',
          padding: '10px',
          backgroundColor: '#343541',
          flexShrink: 0         // Keep input bar fixed
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          style={{
            flex: 1,
            marginRight: '10px',
            padding: '14px',
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
            padding: '14px 22px',
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
