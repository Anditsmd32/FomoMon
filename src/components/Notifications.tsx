// src/components/Notifications.tsx

import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const notificationStyle = {
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
    color: 'white',
    backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

const Notifications: React.FC<{ notifications: NotificationProps[] }> = ({ notifications }) => {
  return (
    <div className="notifications">
      {notifications.map((note, index) => (
        <Notification key={index} message={note.message} type={note.type} />
      ))}
    </div>
  );
};

export default Notifications;
