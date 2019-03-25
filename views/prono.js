import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import teams from '../teams'

class Prono extends Component {

	state = {
		pronoSelected: false
	}

	setProno = () => {
		this.setState({pronoSelected: true})
	}

	toNextScreen = () => {
		this.props.navigation.navigate('RecapScreen')
	}

	render() {
		return (
			<View>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={this.setProno}
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							width: 150,
							height: 150,
							backgroundColor: 'transparent',
							borderRadius: 150,
						}}
					>
						<Image
							style={{width: 140, height: 140}}
							source={teams[0].url}
						/>
					</TouchableOpacity>
					<Text style={{fontSize: 40, fontWeight: 'bold'}}>VS</Text>
					<TouchableOpacity
						onPress={this.setProno}
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							width: 150,
							height: 150,
							backgroundColor: 'transparent',
							borderRadius: 150,
						}}
					>
						<Image
							style={{width: 140, height: 140}}
							source={teams[1].url}
						/>
					</TouchableOpacity>
				</View>
				{
					this.state.pronoSelected ? (
						<View style={styles.pronoOverlay}>
							<Text style={{fontSize: 40, color: 'white', fontWeight: 'bold', marginBottom: 10}}>
								Pronos!
							</Text>
							<View style={styles.pronoBar}>
								<View style={styles.pronoBarItem1}>
									<Text style={{color: 'white', fontSize: 30}}>65%</Text>
								</View>
								<View style={styles.pronoBarItem2}>
									<Text style={{color: 'white', fontSize: 30}}>35%</Text>
								</View>
							</View>
							{/* <TouchableOpacity onPress={this.toNextScreen}>
								<Image
									style={{width: 70, height: 70, marginTop: 10}}
									source={require('../assets/arrow-right.png')}
								/>
							</TouchableOpacity> */}
						</View>
					) : null
				}
			</View>
		)
	}
}

export default connect()(Prono)

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	pronoOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pronoBar: {
		height: '7%',
		width: '80%',
		borderRadius: 4,
		display: 'flex',
		flexDirection: 'row'
	},
	pronoBarItem1: {
		height: '100%',
		width: '65%',
		backgroundColor: '#247245',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pronoBarItem2: {
		height: '100%',
		width: '35%',
		backgroundColor: 'red',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

