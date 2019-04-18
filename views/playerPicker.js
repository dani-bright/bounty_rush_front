import React, {Component} from 'react'
import {ScrollView,Animated,TouchableOpacity,Button, View, Text, Image, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {changeSelectedPlayer} from "../actions"
import players from '../players'
import A from '../API/Api'
import PlayerStats from './playerStats'


class playerPicker extends Component {
	constructor()
	{
			super();
			this.state = { disabled: false}
			this.animatedValue = new Animated.Value(0);
			this.Api= A;
			this.Players= this.Api.AllPlayer();
			
	}

	componentDidMount() {
	}
 
	appear = () =>
	{
			this.animatedValue.setValue(0);
			 
			this.setState({ disabled: true}, () =>
			{
					Animated.timing(
							this.animatedValue,
							{
									toValue: 1,
									duration: 500,
									useNativeDriver: true
							}
					).start(() =>
					{
							this.setState({ disabled: false });
					}); 
			});    
	}
	toNextScreen = () => {
		this.props.navigation.navigate('diceLauncherScreen')
	}

	showStatsForPlayer = (player) => {
		this.props.changePlayer(player)
		this.appear()
	}
	
	render() {
		this.Api.AllPlayer()
		console.log(this.Api.AllPlayer())
		
		const animationValue = this.animatedValue.interpolate(
			{
					inputRange: [ 0, 1 ],
					outputRange: [ -59, 0 ]
			});
		return (
			<View style={styles.main_cointainer}>
				<View style={styles.players_main_cointainer}>
					<ScrollView style={styles.player_container} >	
						{
								players.map((item, i) => (
									<View key={i}
										style={styles.player}>
										<TouchableOpacity onPress={()=>this.showStatsForPlayer(item)}>
											<Image
												style={styles.image}
												source={item.url}
											/>
										</TouchableOpacity>
										<View style={styles.content_container}>
											<View style={styles.header_container}>
												<Text style={styles.title_text}>{item.name}</Text>
											</View>
											<View style={styles.description_container}>
											<Text style={styles.description_text}>{item.description}</Text>
											{/* <Button style={styles.date_container} onPress={() => this.props.changePlayer(item.url)} title="chose" color="#841584"/> */}
											</View>
										</View>
									</View>

								))
							}
					</ScrollView>
					<Animated.View style = {[ styles.stats, { opacity: this.animatedValue, transform: [{ translateX: animationValue }] }]}>
						<PlayerStats/>
          </Animated.View>
				</View>
				<Button style={styles.date_container} onPress={() => this.toNextScreen()} title="ok" color="#841584"/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
	main_cointainer:{
		backgroundColor: '#263238',
		flex:5,
		flexDirection:'column'
	},
	text:{   
    textAlign:'center',
		color: 'white',
    fontSize: 15
	},
	spaceShipStats:{
		flexDirection:'row'
	},
	players_main_cointainer:{
		flexDirection:'row',
		flex:2
	},
	player_container: {
		flex:2
	},
	stats: {
		textAlign:'center',
		alignItems:'center',
		backgroundColor:"#000",
		flex:2
	},
	player: {
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
		color: '#666666',
		width:200,
		flex:3
	}
  })

const mapStateToProps = (state) => ({
	selectedPlayer: state.player.selectedPlayer
})

const mapDispatchToProps = (dispatch) => {//dispatch est dispo grace à la connexion au store et premet d'envoyer les actions
	return {
		changePlayer : (player) => dispatch(changeSelectedPlayer(player))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(playerPicker)