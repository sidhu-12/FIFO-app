import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login.js'
import DashBoardDrawer from './components/dashboard.js'
import Driver_Details from './components/driver_details.js'
import Consign_Notif from './components/consign_notif.js'
import Confirmed_Req from './components/confirmed_req.js'
import Arrived from './components/arrived.js'
import Shipper_Req from './components/shipper_req.js'
import Arrival1 from './components/arrival1.js'
import History from './components/history.js'
import Home from './components/Home.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();
export default class  App extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={DashBoardDrawer} />
        <Stack.Screen name="Update Driver Details" component={Driver_Details}/>
        <Stack.Screen name="Consignee Notification" component={Consign_Notif}/>
        <Stack.Screen name="Confirmed Request" component={Confirmed_Req}/>
        <Stack.Screen name="Update Arrival Time and Date" component={Arrived}/>
        <Stack.Screen name="Shipper Confirmed Request" component={Shipper_Req}/>
        <Stack.Screen name="Update Shipper Arrival" component={Arrival1}/>
        <Stack.Screen name="History" component={History}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
  }