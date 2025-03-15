import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',      // Fills #root's 100vh
        overflow: 'hidden'   // Ensures we don't scroll the entire page, only in the chat
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#fff'
        }}
      >
        ChatGPT Chatbot
      </h1>

      {/* The chat takes the remaining space after the heading */}
      <div style={{ flex: 1 }}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
