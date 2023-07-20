import { socketHttp } from '../contexts/WebsocketContext';

export const socketRefreshNotifications = (swInfo) => {
  if (swInfo) {
    socketHttp.emit('check:ticket:notifications', { flaskUserId: swInfo.id });
    console.log('\x1b[33m%s\x1b[0m', 'emitted ticket notification update!');
  }
};

export const socketNewTicketMessage = (ticketId, msg, swInfo) => {
  // socket emits
  if (swInfo) {
    socketHttp.emit('new:ticket:message', { ticketId, message: msg, from: swInfo.id });
    console.log('\x1b[33m%s\x1b[0m', 'emitted ticket msg update!');
  }
};

export const socketNewTicketView = (ticketId, userId) => {
  // socket emits
  if (userId) {
    socketHttp.emit('new:ticket:view', { ticketId, flaskUserId: userId });
    console.log('\x1b[33m%s\x1b[0m', 'emitted ticket view update!');
  }
};

export const socketChangeTicketColor = (ticketId, userId, color) => {
  // socket emits
  if (userId) {
    socketHttp.emit('change:ticket:color', { ticketId, flaskUserId: userId, color });
    console.log('\x1b[33m%s\x1b[0m', 'emitted ticket change color!');
  }
};

export const socketJoinRoom = (ticketId, userId) => {
  if (ticketId) {
    socketHttp.emit('join:room', { ticketId, flaskUserId: userId });
    console.log('\x1b[33m%s\x1b[0m', 'joining room!');
  }
};

export const socketLeaveRoom = (ticketId, userId) => {
  if (ticketId) {
    socketHttp.emit('leave:room', { ticketId, flaskUserId: userId });
    console.log('\x1b[33m%s\x1b[0m', 'Leaving room!');
  }
};
