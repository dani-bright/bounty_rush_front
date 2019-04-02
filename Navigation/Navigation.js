import React from 'react'
import {StyleSheet,Image} from 'react-native'
import  {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import Carte from '../views/Carte'




const CarteNavigator = createStackNavigator({
	MainScreen: {
		screen: Carte,
		navigationOptions: {
			title:'Map',
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
// 		screen: Recap,
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