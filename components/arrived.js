import React, { Component } from 'react'
import {   Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Button,
  Image,StyleSheet, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
class Arrived extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
     actualDate:'',
     actualTime:'',
      show:false,
      mode:'date',
      display:'default',
    };
    this.actualDate=new Date();
    this.actualTime=new Date();
   // this.onChange=this.onChange.bind(this);
  }
  
     onChange= async (event, selectedDate) => {
       this.setState({show:false});
       if(selectedDate!=undefined&&this.state.mode=='date')
       {
          this.setState({chosenDate:selectedDate})
          var date=new Date(this.state.chosenDate);
          year = date.getFullYear();
          month = date.getMonth()+1;
               dt = date.getDate();
   
              if (dt < 10) {
                 dt = '0' + dt;
                 }
                 if (month < 10) {
                 month = '0' + month;
                 }
              var del_date=dt+"-"+month+"-"+year;
              this.actualDate=year+"-"+month+"-"+dt;
              this.setState({actualDate:del_date});
          console.log(del_date);
          }
          else if(selectedDate!=undefined&&this.state.mode=='time')
          {
            this.setState({chosenDate:selectedDate})
            const addZero=(i)=>{
              {
                 if (i < 10) {
                   i = "0" + i;
                 }
                 return i;
               }
               
         }
         var date1=new Date(this.state.chosenDate);
       var hrs1=addZero(date1.getHours());
       var mins1=addZero(date1.getMinutes());
         var dop=hrs1+":"+mins1;
          this.actualTime=dop+":00";
         this.setState({actualTime:dop});
         console.log(dop);
          }
          //this.setState({show:false});
      
    };
    updateTime=()=>{
      if(this.actualDate==''||this.actualTime=='')
      {
        Alert.alert("Please enter the time or date");
      }
      else{
      var con={con_no:this.props.route.params.con_no,actualDate:this.actualDate,actualTime:this.actualTime};
      console.log(con);
      var xhr=new XMLHttpRequest;
       xhr.onreadystatechange=function()
       {
         console.log(this.readyState);
         if(this.readyState==4&&this.status==200)
         {
           console.log(this.responseText);
           if(this.responseText=='done')
           {
               navigate();
           
           }
           
         
         }
       }
       xhr.open("POST","http://fifo-app-server.herokuapp.com/date",true);
       xhr.setRequestHeader("Content-type","application/json");
       xhr.send(JSON.stringify(con));
       const navigate=()=>{
         Alert.alert("Successfully updated");
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.navigate("Dashboard",{uname:this.props.route.params.uname});
       }
      }


    }
    showMode=(currentMode)=>
    {
      this.setState({show:true});
      this.setState({mode:currentMode});
    }
    showDatepicker = () => {
      this.showMode('date');
      this.setState({display:'default'});
    
      
    };
  
     showTimepicker = () => {
      this.showMode('time');
      this.setState({display:''});
    };
  render(){
    return (
      
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ resizeMode: "stretch" }}
          source={require("./fifo.png")}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 15 }}>
            Driven by <Text style={{ color: "#00c0e2" }}>Technology</Text> ,
          </Text>
          <Text style={{ fontSize: 15 }}>
            Defined By <Text style={{ color: "#00c0e2" }}>Humanity</Text>
          </Text>
        </View>
      </View>
      <View style={styles.container1}>
        <View style={styles.blueBox}>
          <TouchableOpacity onPress={this.showDatepicker} style={styles.btn}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              Set Arrival Date
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              color: "rgba(39, 59, 145,1)",
            }}
          >
            {this.state.actualDate}
          </Text>
        </View>
        <View style={styles.blueBox}>
          <TouchableOpacity onPress={this.showTimepicker} style={styles.btn}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              Set Arrival Time
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              color: "rgba(39, 59, 145,1)",
            }}
          >
            {this.state.actualTime}
          </Text>
          {this.state.show && (
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              minimumDate={new Date()}
              mode={this.state.mode}
              is24Hour={true}
              display={this.state.display}
              onChange={this.onChange}
              neutralButtonLabel="ok"
            />
          )}
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.updateTime}
          style={{
            width: 150,
            borderRadius: 40,
            backgroundColor: "#4f81bc",
            height: 45,
            justifyContent: "center",
            bottom: 50,
            borderColor: "#395d8a",
            borderWidth: 3,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "white",
              textAlign: "center",
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "white",
  flexDirection: "column",
  padding: 5,
},
imageContainer: {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: 5,
},
container1: {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-around",
  backgroundColor: "skyblue",
  borderRadius: 25,
  marginTop: 20,
  padding: 20,
  marginBottom: 100,
},
btn: {
  width: 200,
  borderRadius: 40,
  backgroundColor: "rgba(237, 31, 36,0.9)",
  height: 45,
  justifyContent: "center",
},
blueBox: {
  flex: 1,
  borderRadius: 25,
  backgroundColor: "white",
  justifyContent: "space-evenly",
  marginTop: 10,
  marginBottom: 10,
  alignItems: "center",
},
});
export default Arrived;