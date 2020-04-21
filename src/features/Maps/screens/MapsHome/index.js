import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import {Text, Button, List, Card, Input} from "react-native-ui-kitten";

import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import personImage from "../assets/person.png"
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

export default class MapsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                //customize where you want the maps to start
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        }
    }

    renderImage = () => {
        const screenSize = Dimensions.get('window');
        const imageSize = {
            width: screenSize.width,
            height: screenSize.height
        };
        return (<Image
            style={[styles.image, imageSize]}
            source={require('../assets/auth_bg.png')}/>);
    };

    UNSAFE_componentWillMount() {}

    UNSAFE_componentWillReceiveProps(nextProps) {}

    header() {
        return (
            <View style={styles.header}>

                <View
                    style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={styles.heading}>{"Map"}</Text>
                </View>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <ImageBackground
                    resizeMode={"contain"}
                    style={{
                    marginTop: 0,
                    width: windowWidth *1.3,
                    height: (windowHeight * .5),
                    justifyContent: 'center',
                    position: 'absolute'
                }}
                    source={headerImage}></ImageBackground>

                {this.header()}

                <View
                    style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor:'#fff'
                }}>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={this.state.region}/>

                </View>

            </View>
        );
    }
}
