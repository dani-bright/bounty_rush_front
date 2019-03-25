import React from 'react'
import {StyleSheet,Image} from 'react-native'
import  {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import TeamPicker from '../views/TeamPicker'
import Prono from '../views/prono'
import Recap from '../views/recap'



const RootNavigator = createStackNavigator({
	MainScreen: {
		screen: TeamPicker,
		navigationOptions: {
			header: null
		}
	},
	PronoScreen: {
		screen: Prono,
		navigationOptions: {
			header: null
		}
	},
	RecapScreen: {
		screen: Recap,
		navigationOptions: {
			header: null
		}
	}
})

const MovieTabNavigator = createBottomTabNavigator(
	{
        teams: {
		screen: RootNavigator,
		navigationOptions: {
		  tabBarIcon: () => { 
			return <Image
			  source={require('../assets/team.png')}
			  style={styles.icon}/> 
		  }
		}
	  },
	  Prono: {
		screen: Prono,
		navigationOptions: {
		  tabBarIcon: () => {
			return <Image
			  source={require('../assets/prono.png')}
			  style={styles.icon}/>
		  }
		}
      },
      MyTeam: {
		screen: Recap,
		navigationOptions: {
		  tabBarIcon: () => {
			return <Image
			  source={require('../assets/heart.png')}
			  style={styles.icon}/>
		  }
		}
	  }
    },

	{
	  tabBarOptions: {
		//activeBackgroundColor: '#DDDDDD', 
		inactiveBackgroundColor: '#FFFFFF',
		showLabel: true,
		showIcon: true 
	  }
	}
  );
  const NavigationContainer = createAppContainer(MovieTabNavigator);
  
  const styles = StyleSheet.create({
	icon: {
	  width: 30,
	  height: 30
	}
  })

  export default NavigationContainer