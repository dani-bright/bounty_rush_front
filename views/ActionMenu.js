import React, {Component} from 'react'
import { View, Text, Platform,Button, StyleSheet, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';
import socket from '../API/Api'
import {changeSelectedPlayer,setActionPoints} from "../actions"
import {connect} from 'react-redux'
import Fade from './fadeAnimation'


let ready = false;
let confirmed = 0;
let failed = 0;
let PlayerOn;
let WinCondition = { 'WinMoney': "1000000000", 'WinGlory': "100", "WinSkills": "10" }
let Zone = {
	"1": ['30', '60', '85', '95', '100'],
	"2": ['10', '35', '65', '90', '100'],
	"3": ['10', '20', '45', '75', '100']
}


class ActionMenu extends Component {
    constructor()
    {
        super();
        this.state = { 
            disabled: false,
            visible:true,
            WinCondition : { 'WinMoney': "1000000000", 'WinGlory': "100", "WinSkills": "10" },
            listPlayer :[],
            count :0,
            action:3,
            PlayerOn:{},
            Poi:[],
            Sectory:[]
        }
        this.animatedValue = new Animated.Value(0);
        this.socket = socket
        this.socket.on('startGame', function(players) {
            console.log("salut")
            //alert('The game will start now !');//Utiliser appear
            this.setState({listPlayer : players}, () => {
                if(this.state.count == (this.state.listPlayer.length - 1)){
                    this.setState({ PlayerOn : this.state.listPlayer[0]})
                }
                else{
                    this.setState({ PlayerOn :this.state.listPlayer[this.state.count]})
                }
                //PlayerOn = (this.state.count == (this.state.listPlayer.length - 1)) ? this.state.listPlayer[0] : this.state.listPlayer[this.state.count];
            })        
		}.bind(this));
    }

    componentDidMount() {
		console.log("old",this.props.selectedPlayer)
    }

    Verif=()=> {
		let check = 0;
		if (this.props.selectedPlayer.money > WinCondition['WinMoney']) { check++; }
		if (this.props.selectedPlayer.experience > WinCondition['WinGlory']) { check++; }
		if (this.props.selectedPlayer.experience > WinCondition['WinSkills']) { check++; }

		if (check === 3) { this.socket.emit("endGame", this.props.selectedPlayer) };
	}
    

    Goto=(poi, a) =>{
		this.socket.emit('updatePlayer', ({ id: this.props.selectedPlayer._id, PointOfinterest: this.props.selectedPlayer.pointOfInterest }),function(player){
            this.props.changePlayer(player)
            console.log("new",player)
            //Event(false);
            this.setState({action:this.state.action - a,visible:false})
            if (this.props.selectedPlayer.pointOfInterest.type === 'citadelle') {
                Verif();
                //appear list  target/cible
            }
            this.socket.emit('notification', ({ player: this.props.selectedPlayer, message: " se situe : ", complement: this.props.selectedPlayer.pointOfInterest }))
            //this.props.selectedPlayer.mission.forEach(e => { if (e.pointOfInterest._id === this.props.selectedPlayer.pointOfInterest._id) { /*appear  duel back */ } })
            this.props.setActionPoints(this.props.actionPoints-a)
        }.bind(this))
	}
    
    Move = () => {
        //console.log(this.state.listPlayer)
        this.socket.emit('FindPOIByCustomField', { sector: this.props.selectedPlayer.pointOfInterest.sector }, function(poi) {
            let ah = [];
        
            poi.forEach(function(i) {
                if (i._id != this.props.selectedPlayer.pointOfInterest._id) {
                    this.setState({Poi:[...this.state.Sectory, i]})
                }
            }.bind(this));
            
        }.bind(this));
        
        this.props.selectedPlayer.pointOfInterest.sector.neighborSectors.forEach(element => {
            this.socket.emit('findSectorById', element,function(sector){
                this.socket.emit('FindPOIByCustomField', { sector: sector }, function(Nbpoi) {
                    if(Nbpoi.length>0){
                        this.setState({Sectory: [...this.state.Sectory, Nbpoi]})
                    }
                }.bind(this))
            }.bind(this));
        })
        this.appear()     
    }
    
    Buy = () => {
		console.log("buy")
    }
    
    Explore = () => {
		console.log("explore")
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
 

	render() {
        console.log("hey",this.state.PlayerOn)
		const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [ 0, 1 ],
                outputRange: [ -59, 0 ]
            });
        let toPrint
        if(this.socket.id==this.state.PlayerOn.socketId)
        {

            if(this.props.selectedPlayer.pointOfInterest.hasShop==true){
                toPrint=<View style = {styles.viewHolder}>
                    <Button style = { styles.button } title="Déplacement" color="#841584"  onPress={()=>this.Move()}/>
                    <Button style = { styles.button } title="Acheter/trade" color="#841584"  onPress={()=>this.Buy()}/>
                </View>
            }
            if (this.props.selectedPlayer.pointOfInterest.type != null) {
                toPrint=<View style = {styles.viewHolder}>
                    <Button style = { styles.button } title="Déplacement" color="#841584"  onPress={()=>this.Move()}/>
                    <Button style = { styles.button } title="Explorer" color="#841584"  onPress={()=>this.Explore()}/>
                </View>
            }
            else{
                <View style = {styles.viewHolder}>
                    <Button style = { styles.button } title="Déplacement" color="#841584"  onPress={()=>this.Move()}/>
                </View>
            }
            
            if (this.state.action === 0) {
                this.setState = ({
                    count: count + 1
                });
            }

            
        }
        else
        {
            toPrint=<View style = {styles.viewHolder}>
                <Button style = { styles.button } title="Déplacement" color="#841584"  onPress={()=>this.Move()}/>
            </View>
        }
            
            return(
                <Fade visible={this.state.visible} style={ styles.container}>
                    <ScrollView>
                    
                    {toPrint}
                    <Animated.View style = {[styles.secondMenu, { opacity: this.animatedValue, transform: [{ translateX: animationValue }] }]}>
                        <Text style={{color:'#fff',textAlign:'center'}}>Dans to secteur</Text>
                        {
                            this.state.Poi.map((item,i)=>(
                                <View key={i}>
                                    <Text style={{color:'#fff',textAlign:'center'}}>{item.name}</Text>
                                    <Button style={styles.date_container} onPress={() => this.Explore()} title='Go' color="#841584"/>
                                </View>
                            ))
                        }	
                        <Text style={{color:'#fff',textAlign:'center'}}>Dans les secteur voisins</Text>
                        {
                            this.state.Sectory.map((pois,i)=>(
                                pois.map((poi,g)=>(
                                    <View key={i+g}>
                                        <Text style={{color:'#fff',textAlign:'center'}}>{poi.name}</Text>
                                        <Button style={styles.date_container} onPress={() => this.Goto(poi,2)} title='Go' color="#841584"/>
                                    </View>
                                ))
                            ))
                        }			
                    </Animated.View>
                </ScrollView>
                </Fade>
                
                    
                
            );
	}
}

const styles = StyleSheet.create(
    {
        container:
        {
            width: 300,
            height: 350,
            position:'absolute',
            right:0,
            flexDirection:'column',
            textAlign:'center',
            margin: 4,
            padding: 10,
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },
        secondMenu:
        {
            backgroundColor:'#000',
            flexDirection:'column',
            justifyContent:'space-between'
        },
     
        button:
        {   
            textAlign:'center',
            color: 'white',
            fontSize: 25,
            marginBottom:30
        },
        viewHolder:
        {
            marginBottom:15
        },
     
        actions:
        {
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginBottom:15
        },
     
    });

    const mapStateToProps = (state) => ({
        selectedPlayer: state.player.selectedPlayer,
        diceThrowValue: state.player.diceThrowValue,
        actionPoints: state.player.actionPoints
    })

    const mapDispatchToProps = (dispatch) => {//dispatch est dispo grace à la connexion au store et premet d'envoyer les actions
        return {
            changePlayer : (player) => dispatch(changeSelectedPlayer(player)),
            setActionPoints : (points) => dispatch(setActionPoints(points))
        }
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(ActionMenu)
