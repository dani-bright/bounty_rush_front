import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import TeamSwiper from '../components/TeamSwiper'

let screenWidth = Dimensions.get('window').width * 0.5

class TeamPicker extends Component {

	toNextScreen = () => {
		this.props.navigation.navigate('RecapScreen')
	}

	render() {

		return (
			<View>
				<View style={styles.firstContainer}>
					<Text style={styles.chooseTeamText}>Choisis ton équipe</Text>
					<Image
						style={{width: screenWidth, height: screenWidth}}
						source={this.props.selectedTeam}
					/>
					<TouchableOpacity onPress={this.toNextScreen}>
						<Image
							style={{width: 70, height: 70}}
							source={require('../assets/arrow-right.png')}
						/>
					</TouchableOpacity>
				</View>
				<TeamSwiper/>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		selectedTeam: state.team.selectedTeam
	}
}

const styles = StyleSheet.create({
	firstContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "80%",
	},
	chooseTeamText: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 15
	}
})

export default connect(mapStateToProps)(TeamPicker)