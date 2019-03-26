import React from 'react'
import Carte from './views/Carte'
import { ScreenOrientation } from 'expo';
  
export default class App extends React.Component {
	componentWillMount() {	 

	}
	 
	  componentDidMount() {
		ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

	  }
	 
	  componentWillUnmount() {

	  }
  
	render() {
		return (

			<Carte>

			</Carte>

			
			// <Provider store={store}>
			// 	<Navigation/>
			// </Provider>
		)
	}
}