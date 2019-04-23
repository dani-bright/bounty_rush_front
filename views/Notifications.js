import React, {Component} from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';
import socket from '../API/Api'
export default class Notifications extends Component{
    constructor()
    {
        super();
 
        this.state = { valueArray: [], disabled: false,text:"" }
 
        this.index = 0;
        this.socket = socket
 
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount(){
        this.socket.on('notification', (data) => {
			// if (data.player.SocketId === this.socket.Id) {
			// 	let text = "<b>Vous</b> " + data.message + " " + data.complement.name;
			// 	toggleNotification(text);
			// }
			// else {
			// 	let text = data.player.name + " " + data.message + " " + data.complement.name;
			// 	toggleNotification(text);
            // }
            this.toggleNotification();
            this.setState({text:data.data.player.name + " " + data.data.message + " " + data.data.complement.name});
		});
    }
 
    toggleNotification = () =>
    {
        this.animatedValue.setValue(0);
 
        let newlyAddedValue = { index: this.index }
    
        this.setState({ disabled: true, valueArray: [ ...this.state.valueArray, newlyAddedValue ] }, () =>
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
                this.index = this.index + 1;
                this.setState({ disabled: false });
            }); 
        });    
    }
 

	render() {
		const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [ 0, 1 ],
                outputRange: [ -59, 0 ]
            });
         
            let newArray = this.state.valueArray.map(( item, key ) =>
            {
                if(( key ) == this.index)
                {
                    return(
                        <Animated.View key = { key } style = {[ styles.viewHolder, { opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
                            <Text style = { styles.text }>{ this.state.text }</Text>
                        </Animated.View>
                    );
                }
                else
                {
                    return(
                        <View key = { key } style = { styles.viewHolder }>
                            <Text style = { styles.text }>{ this.state.text }</Text>
                        </View>
                    );
                }
            });
         
            return(
                <View style = { styles.container }>
                    <ScrollView>
                        <View style = {{ flex: 1, padding: 4 }}>
                        {
                            newArray
                        }
                        </View>
                    </ScrollView>
                </View>
            );
	}
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },
     
        viewHolder:
        {
            height: 55,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4
        },
     
        text:
        {
            color: 'white',
            fontSize: 15
        },
     
        btn:
        {
            position: 'absolute',
            right: 25,
            bottom: 25,
            borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 15
        },
     
        btnImage:
        {
            resizeMode: 'contain',
            width: '100%',
            tintColor: 'white'
        }
    });


