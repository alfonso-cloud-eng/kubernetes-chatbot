import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',    // Fill #root (which is 100vh)
        overflow: 'hidden'
      }}
    >
      <h1
        style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          textAlign: 'center',
          color: '#fff',
          flexShrink: 0,
          marginBottom: '-0.5em'
        }}
      >
        ChatGPT Chatbot
      </h1>
      <p
        style={{
          textAlign: 'center',
          color: '#a2a2a2',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}
      >
        by alfonso.cloud.eng@gmail.com<br/>Hosted on Google Kubernetes Engine
      </p>

      {/* Container that Chat occupies */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
