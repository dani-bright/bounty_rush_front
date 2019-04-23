import io from 'socket.io-client';
const socket = io('https://76a70d90.ngrok.io', {
	transports: ['websocket'],
	})
socket.connect();
export default socket;









