import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import {Text, Button, List, Card, CardHeader} from "react-native-ui-kitten";

import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import personImage from "../assets/person.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import Swipeable from 'react-native-swipeable-row';
import icon from "../assets/icon.png"

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {}
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
                    <Text style={styles.heading}>{"Order History"}</Text>
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
                    width: '100%'
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                        flex: 1,
                        paddingBottom: 15
                    }}>
                      <View style={{width:'100%'}}>
                        {this.pendingItem()}
                        {this.pendingItem()}
                        
                      </View>
                    </ScrollView>
                </View>

            </View>
        );
    }


    pendingItem(){
      return(
        <View style={{marginBottom:15,borderRadius:20,overflow:'hidden',width:'100%',height:180,backgroundColor:'#fff',paddingHorizontal:18}}>
                          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#A7A8AB',borderBottomWidth:2,paddingVertical:15}}>
                            <Image style={{width:40,height:40,marginEnd:15}} source={personImage}/>
                            <View>
                              <Text style={{fontSize:16,fontWeight:'bold',color:"#3B424F"}}>John Lim <Text style={{color:"#A7A8AB",fontWeight:'500'}}>#22989</Text></Text>
                              <Text  style={{fontSize:16,color:"#0A1F31"}}>09192019280</Text>
                            </View>
                          </View>
                          <View style={{flex:1,justifyContent:'center'}}>
                          <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <Image style={{width:10,height:19,marginEnd:15}} source={icon}/> 
                            <Text  style={{fontSize:16,color:'#3B424F',width:'100%'}} numberOfLines={2}>Voyager St. 1808  Aviation Way 670  Sweetwood Drive</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                  <Image style={{width:10,height:19,marginEnd:15}} source={icon}/> 
                                  <Text style={{fontSize:16,color:'#3B424F',width:'100%'}}>Ordered: 10:00 AM 12/21/21</Text>
                                </View>
                            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                              <View style={{flex:1,marginTop:8}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                  <Image style={{width:10,height:19,marginEnd:15}} source={icon}/> 
                                  <Text  style={{fontSize:16,color:'#3B424F',width:'100%'}}>Cash on Delivery</Text>
                                </View>
                              </View>
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:115,alignItems:'center',backgroundColor:'#FFEFB3'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>$30.60</Text>
                              </View>
                            </View>
                          </View>

                        </View>
      )
    }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
