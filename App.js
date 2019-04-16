import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
import { ScreenOrientation } from 'expo'
import { StatusBar } from 'react-native'
import Navigation  from './Navigation/Navigation'
const store = createStore(rootReducer)

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
console.ignoredYellowBox = ['Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'];


export default class App extends React.Component {
	constructor(props) {
		super(props);
		state = {
			isConnected: false,
			data: null,
		};

	}

	componentWillMount() {

	}
	 
	  componentDidMount() {
			ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
			StatusBar.setHidden(true);
			// const socket = io('https://b5d8d801.ngrok.io', {
			// 	transports: ['websocket'],
			// })

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

	  }
	 
	  componentWillUnmount() {

	  }
  
	render() {
		return (
			<Provider store={store}>
				<Navigation/>
			</Provider>
		)
	}
}