import React, { Component } from 'react'
import { Platform, View, Text } from 'react-native'
const io = require('socket.io-client');
const socket = io('https://9cda9fca.ngrok.io', {
	transports: ['websocket'],
})
let listPlayer;
let ready = false;
let count = 0;
let action = 3;
let confirmed = 0;
let failed = 0;
let PlayerOn;
let WinCondition = { 'WinMoney': "1000000000", 'WinGlory': "100", "WinSkills": "10" }
let Zone = {
	"1": ['30', '60', '85', '95', '100'],
	"2": ['10', '35', '65', '90', '100'],
	"3": ['10', '20', '45', '75', '100']
}

class Api extends Component {
	componentDidMount() {
		console.log("hey")
		socket.on('connect', () => {
			console.log("socket connected");
			this.setState({ isConnected: true });
		})
	}


	hey() {
		console.log("hey")
	}

	AllPlayer() {
		//LISTE DES PERSONNAGES
		var allPlayers = null;
		socket.on('SelectPlayers', (players) => {
			if (!ready) {
				console.log(players)
			}
			console.log(players)
		});
		return allPlayers
	}



	// socket.on('connect_error', (err) => {
	// 	console.log(err)
	// })

	// socket.on('disconnect', () => {
	// 	console.log("Disconnected Socket!")
	// })





	// //NOMBRE DE JOUEURS 
	NumberPlayers() {
		socket.on('updateNumberOfPlayers', (numberOfPlayers) => {
			document.getElementById('players').innerText = numberOfPlayers;
		});
	}


	//LANCEMENT DE LA PARTIE
	StartGame() {
		socket.on('startGame', (players) => {

			alert('The game will start now !');//Utiliser appear

			listPlayer = players.sort();
			action = 3;
			PlayerOn = (i == (listPLayer.length - 1)) ? listPlayer[0] : listPlayer[i];
		});
	}



	// //EN ATTENTE DES JOUEURS
	WaitPlayer() {

		socket.on('wait', (players) => {
			if (ready) {
				alert('Nous attendons encore ' + players + ' joueurs');//Utiliser appear
			}

		});
	}

	// //NOTIFICATIONS
	Notifications() {
		socket.on('notification', (data) => {
			if (data.player.SocketId === Socket.Id) {
				let text = "<b>Vous</b> " + data.message + " " + data.complement.name;
				togglenotifications(text);
			}
			else {
				let text = data.player.name + " " + data.message + " " + data.complement.name;
				togglenotifications(text);
			}
		});
	}


	// //FIN DE PARTIE
	EndGame() {
		socket.on('endGame', (players) => {
			if (socket.id === players.SocketId) {
				alert('tu as gagné');//afficher banderole win + classement
			}
			else {
				alert('tu as perdu');//afficher banderole loose + classement 
			}
		})
	};



	// //FONCTION ACTION DE DEPLACEMENT

	async Deplacement() {
		menu = "<ul><li>Dans ton sector</li><ul>";
		let POILocal = await socket.emit('FindPOIByCustomField', ({ sector: Player.POI.sector }));
		POILocal.foreach(e => menu += "<li onclick=Goto(" + e._id + ",1)></li>");

		menu += "</ul><li>"

		let NeighbourSector = Player.PoI.Sector.neighboursector;

		NeighbourSector.forEach(async function (sector) {
			let sectory = await socket.emit('FindSectorById', sector);
			menu += sectory.name + "<li><ul>";
			let POILocal = await socket.emit('FindPOIByCustomField', ({ sector: Player.POI.sector }));
			POILocal.foreach(e => menu += "<li onclick=Goto(" + e + ",2)></li>");

		});

	}

	//FONCTION LIEE A DEPLACEMENT FINALISE LE DEPLACEMENT / UPDATE LA POI DU JOUEUR
	async Goto(poi, a) {
		socket.emit('updatePlayer', ({ id: Player._id, PointOfinterest: poi }))
		Event(false);
		action = action - a;
		if (PlayerOn.POI.type === 'citadelle') {
			Verif();
			//appear list  target/cible
		}

		socket.emit('notification', ({ player: PlayerOn, message: " se situe : ", complement: poi }))
		PlayerOn.mission.forEach(e => { if (e.pointOfInterest._id === PlayerOn.pointOfInterest._id) { /*appear  duel back */ } })
	}

	//FONCTION CAPTURE
	Captured(target) {
		while (confirmed != 3 || failed != 3) {
			/*FORMULAIRE DE CONFIRMATION DE PRISE */
			socket.emit('formulaire')//formuliare oui non pour tous
		}

		if (confirmed === 3) {
			socket.emit('notification', ({ player: PlayerOn, message: " a capturé: ", complement: target.name }))
			socket.emit('updatePlayer', { id: PlayerOn.id, captured: target })
		}
	}

	Confirmed() { confirmed++; }
	Failed() { failed++; }


	// FONCTION CHOIX DE JOUEUR
	choosePlayer() {
		let select = document.getElementById('select').getElementsByTagName('select');
		socket.emit('choosePlayer', select[0].selectedOptions[0].value);
		document.getElementById('select').innerText = "You choosed : " + select[0].selectedOptions[0].text
		ready = true;
		socket.emit('notification', ({ player: PlayerOn, message: " a choisit : ", complement: select[0].selectOptions[0].value }))
	};

	// FONCTION ACTION ACHETER
	acheter() {

		let random = Math.floor(Math.random() * Math.floor(100));

		if (random <= Zone[PlayerOn.pointOfInterest.zone][0]) {
			//afficher 1
		}
		else if (random > Zone[PlayerOn.pointOfInterest.zone][0] && random <= Zone[PlayerOn.pointOfInterest.zone][1]) {
			//afficher 2
		}
		else if (random > Zone[PlayerOn.pointOfInterest.zone][1] && random <= Zone[PlayerOn.pointOfInterest.zone][2]) {
			//afficher 3
		}
		else if (random > Zone[PlayerOn.pointOfInterest.zone][2] && random <= Zone[PlayerOn.pointOfInterest.zone][3]) {
			//afficher 4
		}
		else if (random > Zone[PlayerOn.pointOfInterest.zone][3] && random <= Zone[PlayerOn.pointOfInterest.zone][4]) {
			//afficher 5
		}
	}



	// FONCTION ACTION EXPLORER
	Explorer() {

		Event(true);
	}

	//FONCTION VERIFICATION DES CONDITIONS DE VICTOIRE
	Verif() {
		let check = 0;
		if (PlayerOn.money > WinCondition['WinMoney']) { check++; }
		if (notoriete > WinCondition['WinGlory']) { check++; }
		if (PlayerOn.experience > WinCondition['WinSkills']) { check++; }

		if (check === 3) { io.sockets.emit("endGame", PlayerOn) };
	}

	//FONCTION EVENT
	async Event(is) {
		var EventGlobal = await socket.emit('FindEventByCustom', ({ activeZone: null }));
		if (is) {
			var EventExploration = await socket.emit('FindEventByCustom', ({ isExploration: true }));
			EventGlobal.concat(EventExploration);
			EventGlobal.random();
			//Afficher l'event à l'arriere de la carte 

		}
		else {
			var EventNotExploration = await socket.emit('FindEventByCustom', ({ isExploration: false }));
			EventGlobal.concat(EventNotExploration);
			EventGlobal.random();
			//Afficher l'event à l'arrière de la carte
		}

	}
	/*  ########################## GESTION DE LA PARTIE ################################  */

	whosTurn() {
		if (Socket.Id === PlayerOn.SocketId) {
			while (action != 0) {
				//afficher menu 
				let menu = "<li onclick='Deplacement()'>Déplacement</li>";
				if (PlayerOn.POI.hasShop) { menu += "<li>Acheter/trade</li>" }
				if (PlayerOn.POI.type != null) { menu += "<li>Explorer</li>" }

			}
			if (action === 0) {
				count++;
			}
		}
	}

	render() {
		return (
			<View><Text>kjefzh</Text></View>
		)
	}
}
const A = new Api();
export default A;







