import player from "../reducers/player";
const io = require('socket.io-client');


export const socket = io('https://b5d8d801.ngrok.io', {
	transports: ['websocket'],
})

// socket.on('connect', () => {
			// 	console.log("socket connected");
			// 	this.setState({ isConnected: true });
			// })

			// socket.on('connect_error', (err) => {
			// 	console.log(err)
			// })

			// socket.on('disconnect', () => {
			// 	console.log("Disconnected Socket!")
			// })

export function getPlayer(){
   
}

export function getImage () {
    return name
  }

// Récupération du détail d'un film
export function getPlayerDetail(id) {
    return players[id]
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }