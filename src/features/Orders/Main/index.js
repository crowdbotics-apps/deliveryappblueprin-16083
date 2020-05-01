import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    RefreshControl
} from "react-native";
import {Text, Button, List, Card, CardHeader} from "react-native-ui-kitten";

import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import personImage from "../assets/person.png"
import icon from "../assets/icon.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import Swipeable from 'react-native-swipeable-row';
import * as reduxActions from '../redux/actions';
import Geolocation from '@react-native-community/geolocation';
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
          refreshing:false
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

    UNSAFE_componentWillMount() {
      
      this.getCurrentPosition()
      console.log("UNSAFE_componentWillMount:: ",this.props.user)
    }

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
                        refreshControl={
                          <RefreshControl refreshing={this.state.refreshing} onRefresh={()=>{this.getCurrentPosition()}} />
                        }
                        showsVerticalScrollIndicator={false}
                        style={{
                        flex: 1,
                        paddingBottom: 15
                    }}>
                      <Text style={[styles.heading,{paddingHorizontal:25,marginVertical:10}]}>{"In Progress"}</Text>
                      <View style={{width:'100%'}}>
                        {
                          this.props.orders.map((item) => {
                            if(item.status == 'processing'){
                            return(this.inProgressItem(item))
                            }
                          })
                        }
                        
                      </View>
                      
                      <Text style={[styles.heading,{paddingHorizontal:25,marginVertical:10,color:"#0A1F31"}]}>{"Ready To Pick"}</Text>
                      <View style={{width:'100%'}}>
                        {
                          this.props.orders.map((item) => {
                            if(item.status == 'ready_to_pick'){
                            return(this.pendingItem({
                              id: item.id,
                              first_name: item.first_name,
                              phone: item.phone,
                              address: item.address,
                              total_amount: item.total_amount
                            }))
                            }
                          })
                        }
                        
                      </View>

                      <Text style={[styles.heading,{paddingHorizontal:25,marginVertical:10,color:"#0A1F31"}]}>{"Pending"}</Text>
                      <View style={{width:'100%'}}>
                        {
                          this.props.orders.map((item) => {
                            if(item.status == 'pending'){
                            return(this.pendingItem({
                              id: item.id,
                              first_name: item.first_name,
                              phone: item.phone,
                              address: item.address,
                              total_amount: item.total_amount
                            }))
                            }
                          })
                        }
                        
                      </View>
                    </ScrollView>
                </View>

            </View>
        );
    }

    inProgressItem(item){
      return(
        <View style={{marginBottom:15,borderRadius:20,overflow:'hidden',width:'100%',height:290,backgroundColor:'#fff',justifyContent:'space-between'}}>
                          <View style={{flexDirection:'row',height:60,justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#A7A8AB',borderBottomWidth:2,paddingHorizontal:18,paddingVertical:15}}>
                            <Image style={{width:40,height:40,marginEnd:15}} source={personImage}/>
                            <View>
                              <Text style={{fontSize:16,fontWeight:'bold',color:"#3B424F"}}>{item.first_name} <Text style={{color:"#A7A8AB",fontWeight:'500'}}>#{item.id}</Text></Text>
                              <Text  style={{fontSize:16,color:"#0A1F31"}}>{item.phone}</Text>
                            </View>
                          </View>

                          <View style={{flex:1,height:180,paddingHorizontal:18,justifyContent:'center'}}>
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <Image style={{width:10,height:19,marginEnd:15}} source={icon}/> 
                            <Text  style={{fontSize:16,color:'#3B424F',width:'100%'}} numberOfLines={2}>{item.address}</Text>
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
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:115,alignItems:'center',backgroundColor:'#FFD027'}}>
                                  <Text style={{fontSize:20,fontWeight:'bold'}}>${item.total_amount}</Text>
                              </View>
                            </View>
                          </View>
                          
                        <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',width:'100%',flex:1,paddingHorizontal:18,borderTopColor:'#A7A8AB',borderTopWidth:2}}>
                          
                          <TouchableOpacity
                          onPress={()=>this.props.navigation.navigate("OrderDetails",{ item })}
                          activeOpacity={.7}
                          style={[styles.buttonContainer,{backgroundColor:'#fff'}]}>
                          <Text style={[styles.buttonText,{color:"#EC5E53"}]}>VIEW DETAILS</Text>

                          </TouchableOpacity>
                        
                          <TouchableOpacity
                          onPress={()=>this.props.navigation.navigate("OrderComplete",{ item})}
                          activeOpacity={.7}
                          style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>ORDER COMPLETE</Text>

                          </TouchableOpacity>
                        </View>

                        </View>
      )
    }

    inProgressItemDummy(){
      return(
        <View style={{marginBottom:15,borderRadius:20,overflow:'hidden',width:'100%',height:290,backgroundColor:'#fff',justifyContent:'space-between'}}>
                          <View style={{flexDirection:'row',height:60,justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#A7A8AB',borderBottomWidth:2,paddingHorizontal:18,paddingVertical:15}}>
                            <Image style={{width:40,height:40,marginEnd:15}} source={personImage}/>
                            <View>
                              <Text style={{fontSize:16,fontWeight:'bold',color:"#3B424F"}}>John Lim <Text style={{color:"#A7A8AB",fontWeight:'500'}}>#22989</Text></Text>
                              <Text  style={{fontSize:16,color:"#0A1F31"}}>09192019280</Text>
                            </View>
                          </View>

                          <View style={{flex:1,height:180,paddingHorizontal:18,justifyContent:'center'}}>
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
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:115,alignItems:'center',backgroundColor:'#FFD027'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>$30.60</Text>
                              </View>
                            </View>
                          </View>
                          
                        <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',width:'100%',flex:1,paddingHorizontal:18,borderTopColor:'#A7A8AB',borderTopWidth:2}}>
                          
                          <TouchableOpacity
                          onPress={()=>this.props.navigation.navigate("OrderDetails")}
                          activeOpacity={.7}
                          style={[styles.buttonContainer,{backgroundColor:'#fff'}]}>
                          <Text style={[styles.buttonText,{color:"#EC5E53"}]}>VIEW DETAILS</Text>

                          </TouchableOpacity>
                        
                          <TouchableOpacity
                          onPress={()=>this.props.navigation.navigate("OrderComplete")}
                          activeOpacity={.7}
                          style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>ORDER COMPLETE</Text>

                          </TouchableOpacity>
                        </View>

                        </View>
      )
    }

    pendingItem(item){
      return(
        <View style={{marginBottom:15,borderRadius:20,overflow:'hidden',width:'100%',height:180,backgroundColor:'#fff',paddingHorizontal:18}}>
                          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#A7A8AB',borderBottomWidth:2,paddingVertical:15}}>
                            <Image style={{width:40,height:40,marginEnd:15}} source={personImage}/>
                            <View>
                              <Text style={{fontSize:16,fontWeight:'bold',color:"#3B424F"}}>{item.first_name} <Text style={{color:"#A7A8AB",fontWeight:'500'}}>#{item.id}</Text></Text>
                              <Text  style={{fontSize:16,color:"#0A1F31"}}>{item.phone}</Text>
                            </View>
                          </View>
                          <View style={{flex:1,justifyContent:'center'}}>
                          <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <Image style={{width:10,height:19,marginEnd:15}} source={icon}/> 
                            <Text  style={{fontSize:16,color:'#3B424F',width:'100%'}} numberOfLines={2}>{item.address}</Text>
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
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:115,alignItems:'center',backgroundColor:'#FFD027'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>${item.total_amount}</Text>
                              </View>
                            </View>
                          </View>

                        </View>
      )
    }

    pendingItemDmmy(){
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
                              <View style={{justifyContent:'center',borderRadius:5,overflow:'hidden',height:40,width:115,alignItems:'center',backgroundColor:'#FFD027'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>$30.60</Text>
                              </View>
                            </View>
                          </View>

                        </View>
      )
    }

    async getCurrentPosition(){
      await Geolocation
      .getCurrentPosition((geoLocation) => {
          console.log("getCurrentPosition:: ",geoLocation);
          this.setState({currentLat: geoLocation.coords.latitude, currentLong: geoLocation.coords.longitude, hideLocationBtn: true});
          this.props.actions.loadOrder(geoLocation.coords.latitude,geoLocation.coords.longitude,this.props.user.driver_profile.id)
      });
    }

}

const mapStateToProps = state => ({orders: state.Orders.orders, user: state.EmailAuth.user});

const mapDispatchToProps = dispatch => ({
    actions: {
        loadOrder: (location_latitude,location_longitude,driver_id) => {
            dispatch(reduxActions.loadOrder(location_latitude,location_longitude,driver_id));
        },
        
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
