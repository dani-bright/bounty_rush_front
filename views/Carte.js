import React, {Component} from 'react'
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native'
import { AuthSession } from 'expo';

class Carte extends Component {
	render() {
		return (
			<View style={styles.main_container}>

				<View style={styles.second_container}>
					<View style={styles.image}>
						<Image style={{width:100}} source={require('../assets/carte.jpg')}/>
					</View>
					<View 
						style={styles.notifContainer}>
						<Text style={styles.title_text}>Notification</Text>
					</View>
				</View>

				<View style={styles.ressources_container}>
						<View style={styles.ressources}><Text style={styles.text}>1</Text></View>
						<View style={styles.ressources}><Text style={styles.text}>2</Text></View> 
						<View style={styles.ressources}><Text style={styles.text}>3</Text></View>
						<View style={styles.ressources}><Text style={styles.text}>4</Text></View>
				</View>
				<Image
							style={styles.profile}
							source={require('../assets/carte.jpg')}
						/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		color:'#fff',
		backgroundColor: '#263238',
		flexDirection: 'column',
		position:'relative',
		flex:10
	},
	second_container: {
		backgroundColor: '#263238',
		flexDirection: 'row',
		flex:9
	},
	ressources_container: {
		flex:1,
		backgroundColor: '#263238',
		flexDirection: 'row',
	},
	notifContainer: {
		borderWidth: 1,
		borderColor: '#fff',
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
		borderWidth: 1,
		borderColor: 'red',
		position:'relative',
		overflow:'hidden'
	},
	profile: {
		width:60,
		height:60,
		position:'absolute',
		bottom: 15,
		right:30,
		borderRadius:50
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