import {createStackNavigator} from "react-navigation-stack";

import Home from "./screens/";

export const MenuBottomNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
          header: null // Will hide header for HomePage
      },      
    },
}, {
    initialRouteName: "Home",
    headerMode: 'none',
});