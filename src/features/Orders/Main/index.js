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
                    <Text style={styles.heading}>{"For Delivery"}</Text>
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
                      <Text style={[styles.heading,{paddingHorizontal:25,marginVertical:10}]}>{"In Progress"}</Text>
                      <View style={{width:'100%'}}>
                        {this.inProgressItem()}
                        
                      </View>
                      <Text style={[styles.heading,{paddingHorizontal:25,marginVertical:10,color:"#0A1F31"}]}>{"Pending"}</Text>
                      <View style={{width:'100%'}}>
                        {this.pendingItem()}
                        
                      </View>
                    </ScrollView>
                </View>

            </View>
        );
    }

    inProgressItem(){
      return(
        <View style={{marginBottom:15,borderRadius:20,overflow:'hidden',width:'100%',height:290,backgroundColor:'#fff'}}>
                          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#A7A8AB',borderBottomWidth:2,paddingHorizontal:18,paddingVertical:15}}>
                            <Image style={{width:40,height:40,marginEnd:15}} source={personImage}/>
                            <View>
                              <Text style={{fontSize:16,fontWeight:'bold',color:"#3B424F"}}>John Lim <Text style={{color:"#A7A8AB",fontWeight:'500'}}>#22989</Text></Text>
                              <Text  style={{fontSize:16,color:"#0A1F31"}}>09192019280</Text>
                            </View>
                          </View>
                          <View style={{flex:1,paddingHorizontal:18,justifyContent:'center'}}>
                            <Text numberOfLines={2}>Voyager St. 1808  Aviation Way 670  Sweetwood Drive</Text>
                            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                              <View style={{flex:1,marginTop:8}}>
                                <Text>Odered: 10:00 AM 12/21/21</Text>
                                <Text>Cash on Delivery</Text>
                              </View>
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:126,alignItems:'center',backgroundColor:'#FFD027'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>$30.60</Text>
                              </View>
                            </View>
                          </View>
                          
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',flex:1,paddingHorizontal:18,borderTopColor:'#A7A8AB',borderTopWidth:2}}>
                          
                          <TouchableOpacity
                          activeOpacity={.7}
                          style={[styles.buttonContainer,{backgroundColor:'#fff'}]}>
                          <Text style={[styles.buttonText,{color:"#EC5E53"}]}>VIEW DETAILS</Text>

                          </TouchableOpacity>
                        
                          <TouchableOpacity
                          activeOpacity={.7}
                          style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>ORDER COMPLETE</Text>

                          </TouchableOpacity>
                        </View>

                        </View>
      )
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
                            <Text numberOfLines={2}>Voyager St. 1808  Aviation Way 670  Sweetwood Drive</Text>
                            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                              <View style={{flex:1,marginTop:8}}>
                                <Text>Odered: 10:00 AM 12/21/21</Text>
                                <Text>Cash on Delivery</Text>
                              </View>
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:126,alignItems:'center',backgroundColor:'#FFD027'}}>
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
