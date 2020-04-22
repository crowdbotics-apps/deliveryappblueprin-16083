import {createStackNavigator} from "react-navigation-stack";

import Home from "./screens/";
import ProfileEdit from "./../Profile/Edit/";

export const MenuBottomNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
          header: null // Will hide header for HomePage
      },      
    },
    ProfileEdit: {
      screen: ProfileEdit,
      navigationOptions: {
        header: null // Will hide header for HomePage
    },      
  },
}, {
    initialRouteName: "Home",
    headerMode: 'none',
});