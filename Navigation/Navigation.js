import React from 'react'
import {StyleSheet,Image} from 'react-native'
import  {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import Carte from '../views/Carte'
import playerPicker from '../views/playerPicker'
import diceLauncher from '../views/diceLauncher'
import Api from '../API/Api.js'//test




const CarteNavigator = createStackNavigator({
	MainScreen: {
		screen: Api,
		navigationOptions: {
			title:'playerPicker',
			header: null,
		}
	},
	MapScreen: {
		screen: Carte,
		navigationOptions: {
			title:'Map',
			header: null,
		}
	},
	diceLauncherScreen: {
		screen: diceLauncher,
		navigationOptions: {
			title:'dice Launcher',
			header: null,
		}
	}

})

// const MovieTabNavigator = createBottomTabNavigator(
// 	{
//         teams: {
// 		screen: RootNavigator,
// 		navigationOptions: {
// 		  tabBarIcon: () => { 
// 			return <Image
// 			  source={require('../assets/team.png')}
// 			  style={styles.icon}/> 
// 		  }
// 		}
// 	  },
// 	  Prono: {
// 		screen: Prono,
// 		navigationOptions: {
// 		  tabBarIcon: () => {
// 			return <Image
// 			  source={require('../assets/prono.png')}
// 			  style={styles.icon}/>
// 		  }
// 		}
//       },
//       MyTeam: {
// 		screen: playerPicker,
// 		navigationOptions: {
// 		  tabBarIcon: () => {
// 			return <Image
// 			  source={require('../assets/heart.png')}
// 			  style={styles.icon}/>
// 		  }
// 		}
// 	  }
//   },

// 	{
// 	  tabBarOptions: {
// 		//activeBackgroundColor: '#DDDDDD', 
// 		inactiveBackgroundColor: '#FFFFFF',
// 		showLabel: true,
// 		showIcon: true 
// 	  }
// 	}
//   );

	export default createAppContainer(CarteNavigator)