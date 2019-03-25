import teams from '../teams'

const initialState = {
	selectedTeam: teams[0].url
}

const team = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_TEAM':
			return {
				...state,
				selectedTeam: action.url
			}
		default:
			return state
	}
}

export default team