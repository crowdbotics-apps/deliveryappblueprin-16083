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
import {connect} from 'react-redux';

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
          cart:this.props.navigation.state.params.item.order,
          total:this.props.navigation.state.params.item.total_amount,
          item:this.props.navigation.state.params.item,
          checkOutDate:"16 Nov 2017 at 7:15 PM"
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
                <View>
                    <Text style={styles.heading}>Order Details</Text>
                </View>
                <TouchableOpacity
                    style={{
                    width: 60,
                    height: 60
                }}
                    activeOpacity={1}></TouchableOpacity>

            </View>
        )
    }

    getMonthName(dt) {
      mlist = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
      ];
      return mlist[dt.getMonth()];
    };

    UNSAFE_componentWillMount() {
    }

    setTotal(cart) {
      total = 0;
      console.log("setTotal:: ", cart);
      for (i = 0; i < cart.length; i++) {
          item = cart[i];
          total +=  Number(item.price * item.quantity);
      }
      this.setState({total});
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <View style={styles.headerBg}>
                    {this.header()}

                    <Text style={styles.orderTimeText}>{this.state.checkOutDate+"\nOrder #4411c2"}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <ScrollView style={{
                        flex: 1
                    }}>
                        <View style={styles.orderListContainer}>
                        {this
                            .state
                            .cart
                            .map((order, key) => {
                                console.log(order.item.image)
                                return (this.orderItems({
                                    fullItem: order,
                                    name: order.item.name,
                                    count: 1,
                                    notes: "Extra Cheese",
                                    size: "X 2",
                                    price: order.price,
                                    image: order.item.image
                                }));
                            })}
                        </View>
                        <View style={styles.totalContainer}>
                            <Text category="h4" style={styles.totalText}>Total</Text>
                            <Text category="h4" style={styles.totalPriceText}>${this.state.total}</Text>
                        </View>

                        <View style={styles.okayContainer}>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate("OrderComplete")}
                                activeOpacity={.7}
                                style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>ORDER COMPLETE</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    onStarRatingPress(rating) {
        this.setState({starCount: rating});
    }

    orderItems(item) {
        return (
            <View style={styles.orderItemContentContainer}>
                <View style={styles.orderItemContent}>
                    <Image style={styles.orderItemImage} source={{uri:item.image}}/>
                    <View style={styles.orderItemDescription}>
                        <Text style={styles.orderItemName}>{item.name}</Text>
                        <Text style={styles.orderItemNotes}>Notes: {item.notes}</Text>
                    </View>
                    <Text style={styles.orderSizeText}>{item.size}</Text>
                    <Text style={styles.orderPriceText}>${item.price}</Text>
                </View>
                {item.lastItem == undefined && <View style={styles.orderItemSeparator}></View>}
            </View>
        )
    }
    
    dummyOrderItems(item) {
      return (
          <View style={styles.orderItemContentContainer}>
              <View style={styles.orderItemContent}>
                  <Image style={styles.orderItemImage} source={item.image}/>
                  <View style={styles.orderItemDescription}>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <Text style={styles.orderItemNotes}>Notes: {item.notes}</Text>
                  </View>
                  <Text style={styles.orderSizeText}>{item.size}</Text>
                  <Text style={styles.orderPriceText}>${item.price}</Text>
              </View>
              {item.lastItem == undefined && <View style={styles.orderItemSeparator}></View>}
          </View>
      )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({actions: {
}});

export default connect(mapStateToProps, mapDispatchToProps)(App);
