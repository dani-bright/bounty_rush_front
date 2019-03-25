import React, {Component} from 'react'
import {View, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import teams from '../teams'
import {changeSelectedTeam} from "../actions"

class TeamSwiper extends Component {

	state = {
		scrollViewHeight: 0
	}

	render() {
		return (
			<View style={styles.container} onLayout={(event) => this.setState({scrollViewHeight: event.nativeEvent.layout.height})}>
				<ScrollView horizontal={true}>
					{
						teams.map((item, i) => (
							<TouchableOpacity key={i} onPress={() => this.props.changeTeam(item.url)}>
								<Image
									style={{height: this.state.scrollViewHeight-10, width: this.state.scrollViewHeight-10, marginLeft: 5, marginRight: 5}}
									source={item.url}
								/>
							</TouchableOpacity>
						))
					}
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		selectedTeam: state.team.selectedTeam
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeTeam : (url) => dispatch(changeSelectedTeam(url))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSwiper)

const styles = StyleSheet.create({
	container: {
		height: "20%",
		paddingTop: 5,
		paddingBottom: 5
	}
})