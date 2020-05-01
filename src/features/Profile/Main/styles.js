import {StyleSheet, Dimensions} from 'react-native'

const screenSize = Dimensions.get('window');

import {scaleVertical, scale} from "../../../utils/scale";
import DimensionUtils from '../../../utils/DimensionUtils';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;
    
export const styles = StyleSheet.create({
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#F7F7F7",
        flex: 1,
        paddingTop: DimensionUtils.safeAreaTopHeight
    },
    styleBg:{
        marginTop: 0,
        width: windowWidth *1.3,
        height: (windowHeight * .5),
        justifyContent: 'center',
        position: 'absolute',
        height:100 + DimensionUtils.safeAreaTopHeight,
        backgroundColor:"#0A1F31"
    },
    image: {
        resizeMode: "cover",
        marginBottom: scale(10),
        position: 'absolute',
        top: 0
    },

    imageBg: {
        width: '100%',
        height: screenSize.width / 2.6
    },
    header: {
        height: 100 + DimensionUtils.safeAreaTopHeight,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    heading: {
        paddingTop: scaleVertical(15),
        color: "#fff",
        fontSize: 26
    },
    buttonContainer: {
      borderRadius: 23,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "#EC5E53",
      height: 50,
      flex:0.48,
      borderWidth:2,
      borderColor: "#EC5E53",
      marginTop: scaleVertical(20),
      marginBottom: scaleVertical(30)
  },
  buttonText: {
      fontSize: 15,
      color: "#fff"
  },

});
