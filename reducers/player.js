import players from '../players'

const initialState = {
	selectedPlayer: players[0].url
}

const player = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_PLAYER':
			return {
				...state,
				selectedPlayer: action.url
			}
		default:
			return state
	}
}

export default player