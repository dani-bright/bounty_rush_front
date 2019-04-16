
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {getPlayerDetail} from '../API/TMDApi'



class PlayerStats extends React.Component {
  constructor(props){
      super(props);
      this.state = { 
          player: undefined,
      }
  }

  componentDidMount(){
    getPlayerDetail(this.props.navigation.state.params.playerId).then(data=>{
      this.setState({
        player:data,
      })
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate : ")
  }



  _displayPlayer() {
    const { player } = this.state
    if (player != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(player.backdrop_path)}}
          />
          <Text style={styles.title_text}>{player.name}</Text>

          <Text style={styles.description_text}>skills:{player.skills}</Text>
          <Text style={styles.default_text}>money:{player.money}</Text>
          <Text style={styles.default_text}>intel : {player.intel}</Text>
          <Text style={styles.default_text}>{player.description}</Text>


          <Text style={styles.default_text}>Companie(s) : {player.vaisseau.map(function(stat){
              return stat;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  render() {
    console.log(this.props)//devrait afficher favoritesFilm dans les props du component grace à la connexion avec le store
    return (
      <View style={styles.main_container}>
        {this._displayPlayer()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {    
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  favorite_image: {
    width: 40,
    height: 40
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

const mapStateToProps = (state) => ({
	selectedPlayer: state.player.selectedPlayer
})

export default connect(mapStateToProps)(PlayerStats)