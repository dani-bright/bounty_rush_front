import React, {Component} from 'react'
import {Platform, View, Text, Image, StyleSheet} from 'react-native'
import Notifications from './Notifications';
import ActionMenu from './ActionMenu';

class Carte extends Component {
	render() {
		return (
			<View style={styles.main_container}>

				<View style={styles.second_container}>
					<View style={styles.image}>
						<Image style={{width:100}} source={require('../assets/carte.jpg')}/>
					</View>
					<View style={styles.notifContainer}>
						<Notifications/>
					</View>
				</View>

				<View style={styles.ressources_container}>
						<View style={styles.ressources}><Text style={styles.text}>1</Text></View>
						<View style={styles.ressources}><Text style={styles.text}>2</Text></View> 
						<View style={styles.ressources}><Text style={styles.text}>3</Text></View>
						<View style={styles.ressources}><Text style={styles.text}>4</Text></View>
				</View>
				<Image style={styles.profile} source={require('../assets/ant.jpg')}/>
				<ActionMenu/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		color:'#fff',
		backgroundColor: '#4454a6',
		flexDirection: 'column',
		position:'relative',
		flex:10
	},
	second_container: {
		backgroundColor: '#4454a6',
		flexDirection: 'row',
		flex:9
	},
	ressources_container: {
		flex:1,
		backgroundColor: '#141414',
		flexDirection: 'row',
	},
	notifContainer: {
		flex:1,
		textAlign:'center'
	},
	ressources: {
		borderWidth: 1,
		borderColor: '#fff',
		width:149,
	},
	image: {
		flex:3,
		padding:30,
		position:'relative',
		overflow:'hidden'
	},
	profile: {
		width:60,
		height:60,
		position:'absolute',
		bottom: 15,
		right:30,
		borderRadius:(Platform.OS == 'ios') ? 50 : 50
	},
	title_text: {
	  fontWeight: 'bold',
	  color:"white",
	  fontSize: 20,
	},
	text: {
	  color:"white",
	  fontSize: 11,
	}
  })


export default Carte