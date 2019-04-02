import React from 'react'
import { ScreenOrientation } from 'expo'
import { StatusBar, View, Text } from 'react-native'
import Navigation  from './Navigation/Navigation'
 
export default class App extends React.Component {

	componentWillMount() {

	}
	 
	  componentDidMount() {
		ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
		StatusBar.setHidden(true);
	  }
	 
	  componentWillUnmount() {

	  }
  
	render() {
		return (
			<View><Text>Salut</Text></View>
		)
	}
}