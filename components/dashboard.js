import React from 'react'
import { ScrollView,Dimensions,Keyboard, Image,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity, ProgressViewIOSComponent} from 'react-native';
import SideMenu from 'react-native-side-menu';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import History from './history.js';
import Login from './login.js';
const Drawer=createDrawerNavigator();
var name,prop;
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
         <DrawerItem
        label={name}
        style={{alignSelf:'flex-end',}}
        labelStyle={{fontWeight:'bold',fontSize:20}}
        onPress={()=>prop.navigation.navigate("Dashboard", { uname: name })
      }
      />
      <DrawerItem
        label="History"
        onPress={()=>prop.navigation.navigate("History", { uname: name })
      }
      />
      <DrawerItem
        label="Logout"
        onPress={()=>prop.navigation.popToTop()
      }
      />
    </DrawerContentScrollView>
  );
}
const DashboardDrawer=(props)=>{
   name=props.route.params.name;
    prop=props;
   /*const CustomDrawerContent=(props) =>{
    return (
      <DrawerContentScrollView>
        <DrawerItemList  />
        <DrawerItem
          label="History"
          onPress={props.navigation.navigate("History", { uname: name })
        }
        />
        <DrawerItem
          label="Logout"
          onPress={props.navigation.popToTop()
        }
        />
      </DrawerContentScrollView>
    );
  }*/
   
  return (
    
    <Drawer.Navigator initialRouteName="Dashboard" drawerType="front" drawerContent={(props)=><CustomDrawerContent/>}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
  );
}
const Dashboard = (props) => {
   Keyboard.dismiss();
   props.navigation.openDrawer();

   return (
           <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={{ resizeMode: "stretch" }}
              source={require("./fifo.png")}
            />
            <View>
              <Text style={{ fontSize: 15 }}>Driven by Technology,</Text>
    
              <Text style={{ fontSize: 15 }}>Defined By Humanity</Text>
            </View>
          </View>
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            Welcome {name} !
          </Text>
          <TouchableOpacity
            style={styles.boxOne}
            onPress={() =>
              props.navigation.navigate("Consignee Notification", { uname: name })
            }
          >
            <Text style={styles.inside}>Consignee Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxTwo}
            onPress={() =>
              props.navigation.navigate("Confirmed Request", { uname: name })
            }
            title="Confirmed Request"
          >
            <Text style={styles.inside}>Confirmed Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxThree}
            onPress={() =>
              props.navigation.navigate("Shipper Confirmed Request", {
                uname: name
              })
            }
            title="Update the arrival at Shipper Factory"
          >
            <Text style={styles.inside}>Update Shipper Arrival</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-evenly",
        flexDirection: "column",
        padding: 10
      },
      imageContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
      },
      boxOne: {
        backgroundColor: "pink",
        borderRadius: 10,
        height: Dimensions.get("window").height / 5,
        justifyContent: "center",
        alignItems: "center"
      },
      boxTwo: {
        backgroundColor: "gold",
        borderRadius: 10,
        height: Dimensions.get("window").height / 5,
        justifyContent: "center",
        alignItems: "center"
      },
      boxThree: {
        backgroundColor: "skyblue",
        borderRadius: 10,
        height: Dimensions.get("window").height / 5,
        justifyContent: "center",
        alignItems: "center"
      },
      inside: {
        color: "white",
        fontSize: 25
      }
   });
export default DashboardDrawer;