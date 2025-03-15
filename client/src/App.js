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
          fontSize: '1.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#fff',
          flexShrink: 0
        }}
      >
        ChatGPT Chatbot
      </h1>
      <p
        style={{
          textAlign: 'center',
          color: '#ffffff',
          marginBottom: '1rem',
          fontSize: '0.7rem'
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
