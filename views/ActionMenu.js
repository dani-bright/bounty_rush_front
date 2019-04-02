import React, {Component} from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';

export default class ActionMenu extends Component {
    constructor()
    {
        super();
        this.state = { disabled: false }
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
		//this.appear();
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
        this.appear
		const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [ 0, 1 ],
                outputRange: [ -59, 0 ]
            });
         
            return(
                    <Animated.View style = {[ styles.container, { opacity: this.animatedValue, transform: [{ translateX: animationValue }] }]}>
                        <Text style = { styles.text }>A ton tour</Text>
                        <View style={styles.actions}>
                            <Text style = { styles.text }>se déplacer</Text>
                        </View>
                        <View style={styles.actions}>
                            <Text style = { styles.text }>Explorer</Text>
                        </View>
                        <View style={styles.actions}>
                            <Text style = { styles.text }>Acheter/trade</Text>
                        </View>
                    </Animated.View>
                
            );
	}
}

const styles = StyleSheet.create(
    {
        container:
        {
            width: 300,
            position:'absolute',
            right:0,
            backgroundColor: '#000',
            justifyContent: 'center',
            textAlign:'center',
            margin: 4,
            padding: 4,
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },
     
        text:
        {   
            textAlign:'center',
            color: 'white',
            fontSize: 25
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


