import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useCallback } from 'react'
import { View, Image,SafeAreaView, ImageBackground } from 'react-native'
import menuIcon from "../assets/menu.png"
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import DimensionUtils from '../../../utils/DimensionUtils';

export default class App extends React.Component {
  tabs = [
    {
      key: 'orders',
      icon: menuIcon,
      barColor: '#00000000',
      label: 'Orders',
      pressColor: '#00000000'
    },
    {
      key: 'map',
      icon: menuIcon,
      barColor: '#00000000',
      label: 'Map',
      pressColor: '#00000000',
    },
    {
      key: 'history',
      icon: menuIcon,
      barColor: '#00000000',
      label: 'History',
      pressColor: '#00000000',
    },
    {
      key: 'profile',
      icon: menuIcon,
      label: 'Profile',
      barColor: '#00000000',
      pressColor: '#00000000',
    },
  ]
 
  state = {
    activeTab: 'orders'
  }
 
  renderIcon = icon => ({ isActive }) => (
    <Image source={icon} style={{margin:0,tintColor:  isActive ? "#EC5E53" : '#0A1F31' }}/>
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={{margin:0,color: isActive ? "#EC5E53" : '#0A1F31'}}
      renderIcon={this.renderIcon(tab.icon)}
      style={{justifyContent:'center',alignItems:'center'}}
    />
  )
 
  renderView(){
    
  }

  setTab(key){
    this.setState({ activeTab: key})
  }

  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'#fff' }}>
        <View style={{ flex: 1 }}>
          {/* Your screen contents depending on current tab. */}
        </View>
        <ImageBackground style={{width:'100%',paddingHorizontal:15,height:90 + DimensionUtils.safeAreaBottomHeight,justifyContent:'flex-end'}}>
          <BottomNavigation
            activeTab={this.state.activeTab}
            onTabPress={newTab => this.setState({ activeTab: newTab.key })}
            renderTab={this.renderTab}
            style={{height:80,justifyContent:'center',backgroundColor:'transparent'}}
            tabs={this.tabs}
          />
        </ImageBackground>
      </View>
    )
  }
}