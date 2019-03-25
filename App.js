import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
import Navigation from './Navigation/Navigation.js'

const store = createStore(rootReducer)

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Navigation/>
			</Provider>
		)
	}
}

