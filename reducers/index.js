import { combineReducers } from 'redux'
import players from '../players'

const initialState = {
	selectedPlayer: players[0],
	diceThrowValue: 0
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
		default:
			return state
	}
}


export default combineReducers({
	player
})