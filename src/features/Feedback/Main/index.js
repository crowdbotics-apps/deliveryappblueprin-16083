import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    TextInput
} from "react-native";
import {Text} from "react-native-ui-kitten";

import {styles} from './styles'
import headerImage from "../assets/top_bg.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0
        }
    }

    header() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                    this
                        .props
                        .navigation
                        .goBack();
                }}>
                    <Image
                        style={{
                        width: 60,
                        height: 60
                    }}
                        source={require('../assets/back_icon.png')}/>
                </TouchableOpacity>

                <Text style={styles.heading}>Review</Text>

                <View
                    style={{
                    width: 60,
                    height: 60
                }}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <ImageBackground style={styles.headerBg} source={headerImage}>

                    {this.header()}

                    <Image
                        style={{
                        width: windowWidth,
                        height: 21,
                        position: 'absolute',
                        bottom: -10
                    }}
                        resizeMode="repeat"
                        source={require('../assets/grill.png')}/>
                </ImageBackground>
                <View style={styles.contentContainer}>
                    <Text
                        category="h4"
                        style={{
                        fontSize: 26,
                        color: "#0A1F31"
                    }}>16 Nov 2017 at 7:15 PM</Text>
                    <Text
                        category="h4"
                        style={{
                        fontSize: 26,
                        color: "#0A1F31"
                    }}>Order #4112c</Text>
                    <Text style={styles.feedbackText}>Feedback for you order</Text>
                    <View style={{
                        width: 150
                    }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={'#FFD027'}
                            emptyStarColor={'#A7A8AB'}
                            backgroundColor={'#A7A8AB'}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            halfStarEnabled={true}
                            starSize={27}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#6D7477"
                            placeholder="Write a review"/>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                        this
                            .props
                            .navigation
                            .navigate("Home")
                    }}
                        activeOpacity={.7}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>SUBMIT</Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onStarRatingPress(rating) {
        this.setState({starCount: rating});
    }
}
