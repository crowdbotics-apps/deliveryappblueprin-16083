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
import {connect} from 'react-redux';
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';

import {styles} from './styles'
import personImage from "../assets/profile.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,

            first_name: null,
            last_name: null,
            email: null,
            address: null,
            phone: null,
            total: 0
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

              <Text style={styles.heading}>Update Profile</Text>

              <TouchableOpacity
                  style={{
                  width: 60,
                  height: 60
              }}
                  activeOpacity={0.8}></TouchableOpacity>

          </View>
      )
  }

    render() {
        const {first_name, last_name, phone, address, email} = this.state;
        return (
            <View style={styles.itemsContainer}>

                <View
                    resizeMode={"contain"}
                    style={styles.styleBg}></View>

                {this.header()}

                <View
                    style={{
                    flex: 1,
                    width: '100%'
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                        flex: 1,
                        paddingBottom: 15
                    }}>

                        <View
                            style={{
                            width: '100%',
                            alignItems: 'center',
                            marginVertical: 10
                        }}>

                            <ImageBackground
                                style={{
                                width: 168,
                                height: 168,
                                borderRadius:100,
                                overflow:'hidden'
                            }}
                                source={personImage}>
                                  <TouchableOpacity activeOpacity={.6} style={{width:'100%',flex:1,backgroundColor:"#00000050",alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{fontSize:16,marginBottom:15,color:"#fff"}}>Change</Text>
                                  </TouchableOpacity>
                                </ImageBackground>
                        </View>

                        <View
                            style={{
                            backgroundColor: "#fff",
                            width: "100%",
                            padding: 35,
                            paddingVertical: 15
                        }}>

                            <View
                                style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View
                                    style={[
                                    styles.fieldContainer, {
                                        flex: .48
                                    }
                                ]}>
                                    <Text style={styles.label}>First Name</Text>
                                    <Input
                                        value={first_name}
                                        placeholder="John"
                                        size="small"
                                        onChangeText={(first_name) => {
                                        this.setState({first_name})
                                    }}
                                        style={styles.input}
                                        textStyle={styles.text}
                                        autoCapitalize="words"/>
                                </View>
                                <View
                                    style={[
                                    styles.fieldContainer, {
                                        flex: .48
                                    }
                                ]}>
                                    <Text style={styles.label}>Last Name</Text>
                                    <Input
                                        value={last_name}
                                        placeholder="Retrick"
                                        size="small"
                                        onChangeText={(last_name) => {
                                        this.setState({last_name})
                                    }}
                                        style={styles.input}
                                        textStyle={styles.text}
                                        autoCapitalize="words"/>
                                </View>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Phone</Text>
                                <Input
                                    value={phone}
                                    placeholder="0956 683 XXXX"
                                    keyboardType="phone-pad"
                                    size="small"
                                    onChangeText={(phone) => {
                                    this.setState({phone})
                                }}
                                    style={styles.input}
                                    textStyle={styles.text}
                                    autoCapitalize="none"/>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Email</Text>
                                <Input
                                    value={email}
                                    placeholder="john@gmail.cm"
                                    size="small"
                                    keyboardType="email-address"
                                    onChangeText={(email) => {
                                    this.setState({email})
                                }}
                                    style={styles.input}
                                    textStyle={styles.text}
                                    autoCapitalize="none"/>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Address</Text>
                                <Input
                                    value={address}
                                    placeholder="Your detailed address for delivery"
                                    size="small"
                                    numberOfLines={3}
                                    onChangeText={(address) => {
                                    this.setState({address})
                                }}
                                    style={styles.input}
                                    textStyle={styles.text}
                                    autoCapitalize="none"/>
                            </View>
                        </View>

                        <View style={styles.contentContainer}>

                            <TouchableOpacity
                                onPress={() => {
                            }}
                                activeOpacity={.7}
                                style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>UPDATE</Text>

                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </View>
        );
    }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
