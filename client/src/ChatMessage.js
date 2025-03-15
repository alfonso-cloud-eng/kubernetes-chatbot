import React from 'react';

function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  // ChatGPT uses slightly different shades for user vs. assistant
  const messageStyle = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    margin: '8px 0',
    padding: '12px',
    borderRadius: '8px',
    maxWidth: '75%',
    color: '#fff',
    backgroundColor: isUser ? '#3f3f46' : '#444654',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.4',
    fontSize: '0.95rem',
    // Fade-in animation
    animation: 'fadeIn 0.4s ease-in-out'
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start'
      }}
    >
      <div style={messageStyle}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          {role.toUpperCase()}
        </div>
        {content}
      </div>
    </div>
  );
}

export default ChatMessage;
