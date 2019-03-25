import React, {Component} from 'react'
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

class Recap extends Component {
	render() {
		return (
			<ScrollView >
				<View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#263238'}}>
					<Image
						style={{width: 100, height: 100}}
						source={this.props.selectedTeam}
					/>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
					<View 
						style={styles.main_container}>
						<Image
							style={styles.image}
							source={require('../assets/joueur.jpeg')}
						/>
						<View style={styles.content_container}>
							<View style={styles.header_container}>
								<Text style={styles.title_text}>Jean Bon</Text>
								<Text style={styles.etat}>en forme</Text>
							</View>
							<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>un expert du rush</Text>
							</View>
							<View style={styles.date_container}>
							<Text style={styles.date_text}>Pro depuis 3 ans</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
	  height: 190,
	  flexDirection: 'row',
	  borderWidth: 1,
    borderColor: '#fff',
	},
	image: {
	  width: 120,
	  height: 180,
	  margin: 5,
	  backgroundColor: 'gray'
	},
	content_container: {
	  flex: 1,
	  margin: 5
	},
	header_container: {
	  flex: 3,
	  flexDirection: 'row'
	},
	title_text: {
	  fontWeight: 'bold',
	  color:"white",
	  fontSize: 20,
	  flex: 1,
	  flexWrap: 'wrap',
	  paddingRight: 5
	},
	etat: {
	  fontWeight: 'bold',
	  fontSize: 16,
	  color: 'green'
	},
	description_container: {
	  flex: 7,
	  color:"white",
	},
	description_text: {
	  fontStyle: 'italic',
	  color: '#fff'
	},
	date_container: {
	  flex: 1
	},
	date_text: {
	  textAlign: 'right',
	  fontSize: 14,
	  color: '#666666'
	}
  })

const mapStateToProps = (state) => ({
	selectedTeam: state.team.selectedTeam
})

export default connect(mapStateToProps)(Recap)