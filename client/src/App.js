import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',    // Fill #root's height
        overflow: 'hidden'
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '0.25rem',
          color: '#fff',
          flexShrink: 0
        }}
      >
        ChatGPT Chatbot
      </h1>
      <p
        style={{
          textAlign: 'center',
          color: '#fff',
          marginBottom: '1rem',
          fontSize: '1rem'
        }}
      >
        by alfonso.cloud.eng@gmail.com Hosted on Google Kubernetes Engine
      </p>
      <div style={{ flex: 1 }}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
