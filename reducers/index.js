import { combineReducers } from 'redux'

const initialState = {
	selectedPlayer: {
		     "__v": 0,
		     "_id": "5cbf2bb6a87ff020c4c32bd9",
		     "actionPoints": 3,
		     "description": "Description à faire",
		     "experience": "0",
		     "fame": 0,
		     "intel": 0,
		     "item": [],
		     "missions": [],
		     "money": "1500",
		     "name": "Le Soldat",
		     "pointOfInterest":  {
		       "__v": 0,
		       "_id": "5cbf2bb5a87ff020c4c32b7f",
		       "hasShop": true,
		       "name": "CITADEL",
		       "sector":  {
		         "__v": 0,
		         "_id": "5cbf2bb3a87ff020c4c32b5d",
		         "name": "0",
		         "neighborSectors": [
		           "5cbf2bb3a87ff020c4c32b5e",
		           "5cbf2bb3a87ff020c4c32b5f",
		           "5cbf2bb3a87ff020c4c32b60",
		           "5cbf2bb3a87ff020c4c32b62",
		           "5cbf2bb3a87ff020c4c32b63",
		           "5cbf2bb3a87ff020c4c32b64",
		         ],
		       },
		       "type": "station",
		       "zone": 0,
		     },
		     "skills":  [
		       "Meilleure constitution/endurance. 4 coeurs au lieu de 3",
		       "maîtrise des armes",
		     ],
		     "socketId": "RX2ZMsF4VpPRoW6DAAAN",
		     "spaceship":  {
		       "description": "AVEC DES NEONS HEIIIIN",
		       "health": 3,
		       "name": "El Tatamobile",
		       "slots": 6,
		     },
		     "urlImage": "require(\"../assets/ant.jpg\")",
		     "zone": "0",
		   },
	diceThrowValue: 0,
	actionPoints:3
}

const player = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_PLAYER':
			return {
				...state,
				selectedPlayer: action.player
			}
			case 'THROW_DICE':
			return {
				...state,
				diceThrowValue: action.nb
			}
			case 'SET_ACTIONPOINTS':
			return {
				...state,
				actionPoints: action.nb
			}
		default:
			return state
	}
}


export default combineReducers({
	player
})