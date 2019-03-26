import React, {Component} from 'react'
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native'
import { AuthSession } from 'expo';

class Carte extends Component {
	render() {
		return (
			<ScrollView >
				<View style={styles.main_container}>
				<Image
							style={styles.image}
							source={require('../assets/carte.jpg')}
						/>
					<View 
						style={styles.notifContainer}>
						<Text style={styles.title_text}>Notification</Text>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		backgroundColor: '#263238',
		flexDirection: 'row',
		flex:4
	},
	notifContainer: {
	  borderWidth: 1,
		borderColor: '#fff',
		flex:1,
		textAlign:'center'
	},
	image: {
		flex:3
	},
	title_text: {
	  fontWeight: 'bold',
	  color:"white",
	  fontSize: 20,
	}
  })


export default Carte