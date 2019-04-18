import io from 'socket.io-client';
const socket = io('http://565c0600.ngrok.io', {
	transports: ['websocket'],
	})
socket.connect();
export default socket;
		menu = "<ul><li>Dans ton sector</li><ul>";
		let POILocal = await socket.emit('FindPOIByCustomField', ({ sector: Player.POI.sector }));
		POILocal.foreach(e => menu += "<li onclick=Goto(" + e._id + ",1)></li>");
			let sectory = await socket.emit('FindSectorById', sector);
			menu += sectory.name + "<li><ul>";
			let POILocal = await socket.emit('FindPOIByCustomField', ({ sector: Player.POI.sector }));
			POILocal.foreach(e => menu += "<li onclick=Goto(" + e + ",2)></li>");
			Verif();
			//appear list  target/cible
		}
		while (confirmed != 3 || failed != 3) {
			/*FORMULAIRE DE CONFIRMATION DE PRISE */
			socket.emit('formulaire')//formuliare oui non pour tous
		}
		if (confirmed === 3) {
			socket.emit('notification', ({ player: PlayerOn, message: " a capturé: ", complement: target.name }))
			socket.emit('updatePlayer', { id: PlayerOn.id, captured: target })
		}
	}
	choosePlayer() {
		let select = document.getElementById('select').getElementsByTagName('select');
		socket.emit('choosePlayer', select[0].selectedOptions[0].value);
		document.getElementById('select').innerText = "You choosed : " + select[0].selectedOptions[0].text
		ready = true;
		socket.emit('notification', ({ player: PlayerOn, message: " a choisit : ", complement: select[0].selectOptions[0].value }))
	};
		let random = Math.floor(Math.random() * Math.floor(100));
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
			//Afficher l'event à l'arriere de la carte 
  

	whosTurn() {
		if (Socket.Id === PlayerOn.SocketId) {
			while (action != 0) {
				//afficher menu 
				let menu = "<li onclick='Deplacement()'>Déplacement</li>";
				if (PlayerOn.POI.hasShop) { menu += "<li>Acheter/trade</li>" }
				if (PlayerOn.POI.type != null) { menu += "<li>Explorer</li>" }








