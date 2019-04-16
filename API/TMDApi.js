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

const socket = io();

let listPlayer;
let ready = false;
let count = 0;
let action = 3;
let confirmed = 0;
let failed = 0;
let PlayerOn;
let WinCondition = { 'WinMoney': "1000000000", 'WinGlory': "100", "WinSkills": "10" }
let WinMoney = 1000000000;

let Zone = {
	"1": ['30', '60', '85', '95', '100'],
	"2": ['10', '35', '65', '90', '100'],
	"3": ['10', '20', '45', '75', '100']
}

//NOMBRE DE JOUEURS 
socket.on('updateNumberOfPlayers', (numberOfPlayers) => {
	document.getElementById('players').innerText = numberOfPlayers;
});


//LISTE DES PERSONNAGES
socket.on('SelectPlayers', (players) => {
	if (!ready) {
		let select = "Select one bitchiz<br><select>";
		players.content.forEach((player) => {
			select += "<option value='" + player._id + "'>" + player.name + "</option>"
		});
		select += "</select><button onclick='choosePlayer()'>Ok</button>";
		document.getElementById('select').innerHTML = select;
	}
});

//LANCEMENT DE LA PARTIE
socket.on('startGame', (players) => {
	alert('The game will start now !');//Utiliser appear
	listPlayer = players.sort();
	action = 3;
	PlayerOn = (i == (listPLayer.length - 1)) ? listPlayer[0] : listPlayer[i];


});



//EN ATTENTE DES JOUEURS
socket.on('wait', (players) => {
	if (ready) {
		alert('Nous attendons encore ' + players + ' joueurs');//Utiliser appear
	}

});

//NOTIFICATIONS
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



//FIN DE PARTIE
socket.on('endGame', (players) => {
	if (socket.id === players.SocketId) {
		alert('tu as gagné');//afficher banderole win + classement
	}
	else {
		alert('tu as perdu');//afficher banderole loose + classement 
	}
});




//TROUVER LES MISSIONS/CIBLES PAR ELEMENT PERSONNALISE
const findMissionsByCustomField = () => {
	socket.emit('findMissionsByCustomField', { level: parseInt(document.getElementById('mission').value) }, (response) => {
		console.log(response);
	});
};

//TROUVER LES ITEMS PAR ELEMENT PERSONNALISE
const findItemsByCustomField = () => {
	socket.emit('findItemsByCustomField', { level: parseInt(document.getElementById('item').value) }, (response) => {
		console.log(response);
	});
};

//TROUVER LES JOUEURS PAR LEUR ID
const findPlayerById = () => {
	socket.emit('findPlayerById', document.getElementById('player').value, (response) => {
		console.log(response);
	});
};

//TROUVER LES JOUEURS PAR ELMENT PERSONNALISE
const findPlayersByCustomField = () => {
	socket.emit('findPlayerByCustomField', { socketId: document.getElementById('socketId').value }, (response) => {
		console.log(response);
	})
};

//TROUVER TOUS LES JOUEURS
const findAllPlayers = () => {
	socket.emit('findAllPlayers', (response) => {
		console.log(response);
	})
};


//MODIFIER UN JOUEUR
const updatePlayer = () => {
	socket.emit('updatePlayer', {
		id: document.getElementById('playerid').value,
		money: parseInt(document.getElementById('money').value),
		experience: parseInt(document.getElementById('exp').value),

	}, (response) => {
		console.log(response);
	})
}

//FONCTION ACTION DE DEPLACEMENT
const Deplacement = async () => {
	menu = "<ul><li>Dans ton sector</li><ul>";
	let POILocal = await socket.emit('FindPOIByCustomField', ({ sector: Player.POI.sector }));

	POILocal.foreach(e => menu += "<li onclick=Goto(" + e._id + ",1)></li>");

	menu += "</ul><li>"

	let NeighbourSector = Player.PoI.Sector.neighboursector;

	NeighbourSector.forEach(async function (sector) {
		var sectory = await socket.emit('FindSectorById', sector);
		menu += sectory.name + "<li><ul>";
		let POILocal = await socket.emit('FindPOIByCustomField', ({ sector: Player.POI.sector }));
		POILocal.foreach(e => menu += "<li onclick=Goto(" + e + ",2)></li>");

	});

}

//FONCTION LIEE A DEPLACEMENT FINALISE LE DEPLACEMENT / UPDATE LA POI DU JOUEUR
const Goto = async (poi, a) => {
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
const captured = (target) => {
	while (confirmed != 3 || failed != 3) {
		/*FORMULAIRE DE CONFIRMATION DE PRISE */
		socket.emit('formulaire')//formuliare oui non pour tous
	}

	if (confirmed === 3) {
		socket.emit('notification', ({ player: PlayerOn, message: " a capturé: ", complement: target.name }))
		socket.emit('updatePlayer', { id: PlayerOn.id, captured: target })
	}
}

const Confirmed = () => { confirmed++; }
const Failed = () => { failed++; }


//FONCTION CHOIX DE JOUEUR
const choosePlayer = () => {
	let select = document.getElementById('select').getElementsByTagName('select');
	socket.emit('choosePlayer', select[0].selectedOptions[0].value);
	document.getElementById('select').innerText = "You choosed : " + select[0].selectedOptions[0].text
	ready = true;
	socket.emit('notification', ({ player: PlayerOn, message: " a choisit : ", complement: select[0].selectOptions[0].value }))
};

//FONCTION ACTION ACHETER
const acheter = () => {

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



//FONCTION ACTION EXPLORER
const Explorer = () => {

	Event(true);
}

//FONCTION VERIFICATION DES CONDITIONS DE VICTOIRE
const Verif = () => {
	var check = 0;
	if (PlayerOn.money > WinCondition['WinMoney']) { check++; }
	if (notoriete > WinCondition['WinGlory']) { check++; }
	if (PlayerOn.experience > WinCondition['WinSkills']) { check++; }

	if (check === 3) { io.sockets.emit("endGame", PlayerOn) };
}

const Event = async (is) => {
	var EventGlobal = await socket.emit('FindEventByCustom', ({ activeZone: null }));
	if (is) {
		var EventExploration = await socket.emit('FindEventByCustom', ({ isExploration: true }));
		EventGlobal.concat(EventExploration);
		EventGlobal.random();
		//Afficher l'event à l'arriere de la carte 

		foreach effect
	}
	else {
		var EventNotExploration = await socket.emit('FindEventByCustom', ({ isExploration: false }));
		EventGlobal.concat(EventNotExploration);
		EventGlobal.random();
		//Afficher l'event à l'arrière de la carte
	}

}
/*  ########################## GESTION DE LA PARTIE ################################  */


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






