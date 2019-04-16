import React, {Component} from 'react'
import {connect} from 'react-redux'
import {diceLaunchValue} from "../actions"
import {ScrollView,TouchableOpacity,Button, View, Text, Image, StyleSheet} from 'react-native'



class diceLauncher extends Component {
	constructor(props) {
        super(props);
        this.state = {
          min: 1,
          max: 12,
          number: 1
        }
      }
    
      componentDidMount() {
       this.setState({ number: this.generateNumber(this.state.min, this.state.max)})
      }
      
      minChange = (event) => {
        this.setState({ min: event.target.value})
      }
      
      maxChange = (event) => {
        this.setState({ max: event.target.value})
      }
      
      generateNumber = (min, max) => {
        return Math.floor(Math.random()*(max-min+1)+min)
      }
      
      getInputs = () => {
        if(this.state.min > this.state.max ){
          const minTemp = this.state.min
          const maxTemp = this.state.max
          this.setState(
          { 
            min: maxTemp,
            max: minTemp
          }, () =>
            this.setState({
              number: this.generateNumber(this.state.min, this.state.max)  
            })
          );
        } else {
          this.setState({
            number: this.generateNumber(this.state.min, this.state.max)  
          })
        }
        this.props.getLaunchValue(this.state.number)
        setTimeout(() => {
            this.props.navigation.navigate('MapScreen')
        }, 600);
        //console.log(this.props.diceThrowValue)
      }
 
	render() {
		return (
			<View style={styles.main_cointainer}>
				{/* <Text style={styles.text}>{this.state.number}</Text> */}
				<Button style={styles.date_container} onPress={() =>  this.getInputs() } title="Lancer" color="#841584"/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
	main_cointainer:{
		backgroundColor: '#263238',
		flex:2,
		flexDirection:'column'
	},
	text:{   
        textAlign:'center',
		color: 'white',
        fontSize: 65,
        marginBottom:20
	},	
  })

const mapStateToProps = (state) => ({
	diceThrowValue: state.player.diceThrowValue
})

const mapDispatchToProps = (dispatch) => {//dispatch est dispo grace à la connexion au store et premet d'envoyer les actions
	return {
		getLaunchValue : (nb) => dispatch(diceLaunchValue(nb))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(diceLauncher)