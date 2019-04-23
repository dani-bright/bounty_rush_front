import React, {Component} from 'react'
import {ImageBackground,Platform,TouchableOpacity, View,Button, Text, Image, StyleSheet} from 'react-native'
import Notifications from './Notifications'
import {connect} from 'react-redux'
import Fade from './fadeAnimation'
import ActionMenu from './ActionMenu'
import FlipCard from 'react-native-flip-card'
import PlayerStats from './playerStats'
import socket from '../API/Api'

let listPlayer;
let ready = false;
let count = 0;
let action = 3;
let confirmed = 0;
let failed = 0;
let PlayerOn;
let WinCondition = { 'WinMoney': "1000000000", 'WinGlory': "100", "WinSkills": "10" }
let Zone = {
	"1": ['30', '60', '85', '95', '100'],
	"2": ['10', '35', '65', '90', '100'],
	"3": ['10', '20', '45', '75', '100']
}


class Carte extends Component {
	constructor (props) {
		super(props)
		this.state = {
		  flip: false,
		  action:3,
		  disabled:false,
			visible: false,
		}
		this.socket = socket
	}
	componentDidMount(){
		
	}

	  printText(isFlipEnd){
		  if(isFlipEnd){
			console.log('isFlipEnd', isFlipEnd)	
		  }
	  }

	  appear = () =>
	  {
		  if(!this.state.disabled){ 
			this.setState({ disabled: true, visible:true})
		  }
		  else{
			this.setState({ disabled: false, visible:false})
		  }
			    
	  }

	render() {
		console.log(this.socket.id);

		console.log("la valeur du lancé est de "+this.props.diceThrowValue)
		const Images = {
			"Le chasseur": require('../assets/ant.jpg'),
			"Le Pilote": require('../assets/diego.jpg'),
			"Le Soldat": require('../assets/david.jpg')
	};
		return (
			<ImageBackground source={require('../assets/background.jpg')} style={styles.main_container}>
				<View style={styles.second_container}>
					<FlipCard
						flip={this.state.flip}
						friction={6}
						perspective={1000}
						flipHorizontal={true}
						flipVertical={false}
						clickable={true}
						style={styles.card}
						alignHeight={true}
						// alignWidth={true}
						onFlipEnd={(isFlipEnd)=>{this.printText(isFlipEnd)}}
					>
						<View style={styles.image}>
							<Image style={{width:500}} source={require('../assets/carte.jpg')}/>
						</View>
						<View style={styles.backface}>
							<Text style={{color:'#fff'}}>The Back</Text>
						</View>
					</FlipCard>
					<View style={styles.notifContainer}>
						<Notifications/>
					</View>
				</View>

				<View style={styles.ressources_container}>
						<View style={styles.ressources}><Text style={styles.text}>intel : {this.props.selectedPlayer.intel}</Text></View>
						<View style={styles.ressources}><Text style={styles.text}>money : {this.props.selectedPlayer.money}</Text></View> 
						<View style={styles.ressources}><Text style={styles.text}>level : {this.props.selectedPlayer.fame}</Text></View>
						<View style={styles.ressources}><Text style={styles.text}>action : {this.props.actionPoints}</Text></View>
				</View>
				<Fade visible={this.state.visible} style={styles.stats}>
					<PlayerStats/>
				</Fade>

				<TouchableOpacity style={{position:'absolute',bottom: 15,right:30,}} onPress={()=>this.appear()}>
					<Image style={styles.profile} source={Images[this.props.selectedPlayer.name]}/>
				</TouchableOpacity>
				<ActionMenu/>
				{/* <Button title="kzfn" onPress={()=>this.props.navigation.navigate('ActionMenu')}/> */}
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		color:'#fff',
		flexDirection: 'column',
		position:'relative',
		flex:10
	},
	second_container: {
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
	backface: {
		flex:3,
		backgroundColor:"#000",
	},
	stats: {
		position:'absolute',
		textAlign:'center',
		alignItems:'center',
		backgroundColor:"#000",
		flex:2,
		bottom: 80,
		right:5,
	},
	profile: {
		width:60,
		height:60,
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

  const mapStateToProps = (state) => ({
	selectedPlayer: state.player.selectedPlayer,
	diceThrowValue: state.player.diceThrowValue,
	actionPoints: state.player.actionPoints
})

export default connect(mapStateToProps)(Carte)