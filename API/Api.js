import io from 'socket.io-client';
const socket = io('http://565c0600.ngrok.io', {
	transports: ['websocket'],
	})
socket.connect();
export default socket;
  









