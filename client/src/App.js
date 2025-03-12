import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div>
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
      <Chat />
    </div>
  );
}

export default App;
