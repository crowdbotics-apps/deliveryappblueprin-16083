import {StyleSheet, Dimensions} from 'react-native'

const screenSize = Dimensions.get('window');
const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

import {scaleVertical, scale} from "../../../utils/scale";
import DimensionUtils from '../../../utils/DimensionUtils';

export const styles = StyleSheet.create({
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingTop: DimensionUtils.safeAreaTopHeight
    },
    image: {
        resizeMode: "cover",
        marginBottom: scale(10),
        position: 'absolute',
        top: 0
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
    imageBg: {
        width: '100%',
        height: screenSize.width / 2.6
    },
    header: {
        height: DimensionUtils.safeAreaTopHeight+80,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal:scale(15)
    },
    heading: {
        paddingTop: scaleVertical(15),
        color: "#fff",
        fontSize: 26
    },

    contentContainer: {
        width: '100%',
        paddingBottom: scaleVertical(20),
        paddingHorizontal: scale(15),
        alignItems: 'center'
    },
    buttonContainer: {
        borderRadius: 23,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#EC5E53",
        height: 50,
        width: 276,
        marginTop: scaleVertical(20),
        marginBottom: scaleVertical(8)
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    },

    input: {
      backgroundColor: 'white',
      //marginLeft: scale(10), marginRight: scale(10),
      marginTop: scaleVertical(5),
      marginBottom: scaleVertical(5),
      //borderRadius: 12,
      borderColor: '#E5E5E5',
      color:"#0A1F31"
  },
  label: {
      fontWeight: "bold",
      paddingStart: scale(10)
  },
  text:{
      color:"#0A1F31"
  },
  fieldContainer: {
      alignItems: 'flex-start',
      width: '100%',
      marginTop: scaleVertical(8)
  },
});
