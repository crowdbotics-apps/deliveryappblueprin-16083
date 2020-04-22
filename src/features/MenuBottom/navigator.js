import {createStackNavigator} from "react-navigation-stack";

import Home from "./screens/";
import ProfileEdit from "./../Profile/Edit/";
import ContactUs from "./../ContactUs/Main";
import OrderComplete from "./../OrderComplete/Main";
import OrderDetails from "./../OrderDetails/Main";
import Feedback from "./../Feedback/Main";

export const MenuBottomNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    ProfileEdit: {
        screen: ProfileEdit,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    OrderComplete: {
        screen: OrderComplete,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    OrderDetails: {
        screen: OrderDetails,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    }
}, {
    initialRouteName: "Home",
    headerMode: 'none'
});