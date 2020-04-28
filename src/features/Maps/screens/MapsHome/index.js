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

import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import personImage from "../assets/person.png"
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

const GOOGLE_API_KEY = 'AIzaSyAFez4Yx5xX3aZoMuVghkMGlF7a6hTozMk';
import Geolocation from '@react-native-community/geolocation';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;

class MapsScreen extends Component {

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
                    backgroundColor: '#fff'
                }}>

                    <MapView
                        ref={ref => {
                        this.map = ref;
                    }}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        provider="google"
                        showsUserLocation={true}
                        showsUser={true}
                        showsMyLocationButton={false}
                        loadingEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={false}
                        scrollEnabled={true}
                        showsBuildings={true}
                        showsIndoors={true}
                        showsIndoorLevelPicker={true}
                        showsTraffic={false}
                        showsScale={true}
                        zoomEnabled={true}
                        mapType={"standard"}
                        onMapReady={() => this.moveToCurrentRegion()}
                        initialRegion={this.state.region}>
                        <MapView.Marker
                            key={1}
                            ref={ref => {
                            this.patientMarker = ref;
                            if (this.patientMarker) {
                                this
                                    .patientMarker
                                    .showCallout();
                            }
                        }}
                            title={'Your Location'}
                            pinColor={'red'}
                            coordinate={this.state.region}></MapView.Marker>
                        {this.props.orders.length > 0 && <MapViewDirections
                            origin={this.state.currentPosition}
                            strokeWidth={3}
                            optimizeWaypoints={true}
                            strokeColor="hotpink"
                            destination={{
                            latitude: Number(this.props.orders[0].location_latitude),
                            longitude: Number(this.props.orders[0].location_longitude),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                            apikey={GOOGLE_API_KEY}/>
                        }
                    </MapView>

                </View>

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
                    onPress={() => this.moveToCurrentRegion()}
                    underlayColor='transparent'>
                    <View style={[styles.menuCircle]}>

                        <Icon name={"crosshairs"} size={30} color={"#808080"}/>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    async moveToCurrentRegion() {
        this.setState({searchName: null});
        await Geolocation.getCurrentPosition((geoLocation) => {
            this.setState({
                currentPosition: {
                    latitude: geoLocation.coords.latitude,
                    longitude: geoLocation.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });

            this
                .map
                .animateToRegion({
                    latitude: geoLocation.coords.latitude,
                    longitude: geoLocation.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }, 2000);
        });
    }
}

const mapStateToProps = state => ({orders: state.Orders.orders, user: state.EmailAuth.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapsScreen);
