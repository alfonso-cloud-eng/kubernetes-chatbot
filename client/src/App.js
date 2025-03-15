import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',       // Fill the entire #root (which is 100vh)
        overflow: 'hidden'
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#fff',
          flexShrink: 0       // Prevent the heading from shrinking
        }}
      >
        ChatGPT Chatbot
      </h1>
      <div style={{ flex: 1 }}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
