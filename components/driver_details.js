import React, { Component } from 'react'
import { Dimensions,ScrollView,Platform, Picker,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image} from 'react-native';

export default class Driver_Details extends Component{
   constructor(props)
   {
       super(props);
       this.state={
           name:'',
           mob_no:'',
           truck_no:'',
           round_trip:'N',
           container_no:this.props.route.params.con_no,

       }
   }
    submitForm=()=>{
      var name_pattern=/[a-zA-Z .]+/;
      var num_pattern=/^[0-9]{10}$/;
      var truck_pattern=/^[A-Z]{2}[0-9]{2}([A-Z])?([A-Z])?[0-9]{4}$/;
      
        if(!name_pattern.test(this.state.name))
        {
            Alert.alert("Please Fill the appropriate Name");
        }else
        if(this.state.mob_no==''||!num_pattern.test(this.state.mob_no))
        {
            Alert.alert("Please Fill the Correct Mobile Number");
        }else
        if(this.state.truck_no==''||!truck_pattern.test(this.state.truck_no))
        {
            Alert.alert("Please Fill the Correct Truck Number");
        }
        else
        {
       //Alert.alert("Successfully done");
       //this.props.navigation.navigate('Dashboard');
       var xhr=new XMLHttpRequest;
       xhr.onreadystatechange=function()
       {
         //console.log(this.readyState);
         if(this.readyState==4&&this.status==200)
         {
           //console.log(this.responseText);
           console.log(this.responseText);
           if(this.responseText=='done')
           {
               navigate();
           
           }
           
         
         }
       }
       xhr.open("POST","http://192.168.0.100:3000/driver_details",true);
       xhr.setRequestHeader("Content-type","application/json");
       //console.log(name);
       xhr.send(JSON.stringify(this.state));
       const navigate=()=>{
        Alert.alert("Successfully done");
       this.props.navigation.pop();
       this.props.navigation.pop();
       this.props.navigation.navigate("Consignee Notification",{uname:this.props.route.params.uname})
       }
       }
        }
   showDetails=()=>{

   }
    render(){
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
          <View style={{ bottom: 20 }}>
            <Text style={{ fontSize: 20 }}>Driver's Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Eg:Raj"
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={{ bottom: 20 }}>
            <Text style={{ fontSize: 20 }}>Mobile Number</Text>
  
            <TextInput
              style={styles.input}
              placeholder="Eg:9876543210"
              onChangeText={mob_no => this.setState({ mob_no })}
            />
          </View>
          <View style={{ bottom: 20 }}>
            <Text style={{ fontSize: 20 }}>Truck Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Eg:TN01PP1234"
              onChangeText={truck_no => this.setState({ truck_no })}
            />
          </View>
          <View style={{ bottom: 20 }}>
            <Text style={{ fontSize: 20 }}>Round Trip</Text>
            <View
              style={{
                height: 45,
                width: 150,
                paddingLeft: 10,
                marginTop: 10,
                marginLeft: 10,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 45,
                justifyContent: "center"
              }}
            >
              <Picker
                mode="dropdown"
                selectedValue={this.state.round_trip}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ round_trip: itemValue })
                }
              >
                <Picker.Item label="Yes" value="Y" />
                <Picker.Item label="No" value="N" />
              </Picker>
            </View>
          </View>
          <View style={{ bottom: 20, alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.submitForm}
              style={{
                width: WIDTH - 60,
                height: 45,
                borderRadius: 25,
                backgroundColor: "skyblue",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
                Submit
              </Text>
            </TouchableOpacity>
            </View>
        </View>
      );
    }
  }
  const { width: WIDTH } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 10,
      flexDirection: "column",
      justifyContent: "space-evenly"
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      bottom: 20
    },
    input: {
      width: WIDTH - 60,
      height: 45,
      borderRadius: 25,
      fontSize: 20,
      backgroundColor: "rgba(0,0,0,0.1)",
      paddingLeft: 20,
      marginTop: 10,
      marginLeft: 10
    }
  });
