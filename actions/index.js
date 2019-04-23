export const changeSelectedPlayer = player => ({
	type: 'CHANGE_PLAYER',
	player
})

export const diceLaunchValue = nb => ({
	type: 'THROW_DICE',
	nb
})

export const setActionPoints = nb => ({
	type: 'SET_ACTIONPOINTS',
	nb
})