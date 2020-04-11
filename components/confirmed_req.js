import React, { Component } from 'react'
import Modal, { ModalFooter, ModalButton, ModalContent ,SlideAnimation} from 'react-native-modals';
import {  ActivityIndicator,Image,FlatList,ScrollView, Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,BackHandler} from 'react-native';
import call from 'react-native-phone-call';
export default class Confirmed_Req extends Component{
   constructor(props)
   {
       super(props);
       this.state={
         op:[],
         visible:false,
         driv:[],
         load:true,

       }
       this.acceptForm=this.acceptForm.bind(this);
   }
    acceptForm=(i)=>{
       Alert.alert(" Please enter the arrival date and time");
       this.props.navigation.navigate('Update Arrival Time and Date',{con_no:this.state.op[i].container_no,uname:this.props.route.params.uname});
    }
   
    createList=()=>{
      const {uname}=this.props.route.params;
      var name={username:uname};
    var xhr=new XMLHttpRequest;
  xhr.onreadystatechange=function()
  {
    //console.log(this.readyState);
    if(this.readyState==4&&this.status==200)
    {
      //console.log(this.responseText);
      create(this);
    
    }
    if(this.readyState==4&&this.status!=200)
    {
     Alert.alert("Network Error\nPlease check your network connection");
     stopLoading();
    }
  }
  xhr.open("POST","http://fifo-app-server.herokuapp.com/conf",true);
  xhr.setRequestHeader("Content-type","application/json");
  //console.log(name);
  xhr.send(JSON.stringify(name));
  const stopLoading=()=>
  {
    this.setState({load:false})
  }
  const create=(obj)=>{
    this.setState({op:JSON.parse(obj.responseText)})
    this.setState({load:false})
    //console.log(this.state.op);
  };
    
    
      }

 componentDidMount(){
     this.createList();
 }
 
 changeState=(i)=>{
  var j=-2;
     //this.setState({visible:true});
     var date=new Date(this.state.op[i].delivery_date);
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
         //console.log(del_date);
         const addZero=(i)=>{
              {
                 if (i < 10) {
                   i = "0" + i;
                 }
                 return i;
               }
               
         }
         var date1=new Date(this.state.op[i].dop);
         var year1 = date1.getFullYear();
        var month1 = date1.getMonth()+1;
       var dt1 = date1.getDate();
       var hrs1=addZero(date1.getHours());
       var mins1=addZero(date1.getMinutes());

      if (dt1 < 10) {
         dt1 = '0' + dt1;
         }
         if (month1 < 10) {
         month1 = '0' + month1;
         }
         var dop=+dt1+"-"+month1+"-"+year1;
              var time=hrs1+":"+mins1;
         //console.log(this.state.op[i].dop);
           var con_no={container_no:this.state.op[i].container_no};
         var xhr=new XMLHttpRequest;
       
       xhr.onreadystatechange=function()
       {
         //console.log(this.readyState);
         if(this.readyState==4&&this.status==200)
         {
           //console.log(this.responseText);
           createDriver(this);
         }
         if(this.readyState==4&&this.status!=200)
         {
          Alert.alert("Network Error\nPlease check your network connection");
          stopLoading();
         }
       }
       xhr.open("POST","http://fifo-app-server.herokuapp.com/driv",true);
       xhr.setRequestHeader("Content-type","application/json");
       //console.log(name);
     
       xhr.send(JSON.stringify(con_no));
       const stopLoading=()=>
       {
        this.setState({load:false})
       }
       const createDriver=(xml)=>
       {
         //console.log(xml.responseText);
         this.setState({driv:JSON.parse(xml.responseText)});
         createContent();
        // console.log(this.state.driv);
       }
       
       
       const createContent =()=>{
        
       // console.log(this.state.driv);
        this.mob_no=this.state.driv[0].mobile_number;
     this.content=<View key={j}><Text style={{fontSize:20}}>Consignee Name:{this.state.op[i].conginee_name}</Text>
       <Text style={{fontSize:20}}>Container No:{this.state.op[i].container_no}</Text>
       <Text style={{fontSize:20}}>Container Type:{this.state.op[i].container_type}</Text>
       <Text style={{fontSize:20}}>Container Size:{this.state.op[i].container_size}</Text>
       <Text style={{fontSize:20}}>Date of Pickup:{dop}</Text>
       <Text style={{fontSize:20}}>Time of Pickup:{time}</Text>
       <Text style={{fontSize:20}}>Port Name:{this.state.op[i].port_name}</Text>
       <Text style={{fontSize:20}}>Delivery Date:{del_date}</Text>
       <Text style={{fontSize:20}}>Driver Name:{this.state.driv[0].driver_name}</Text>
       <Text style={{fontSize:20}}>Mobile Number:{this.state.driv[0].mobile_number}</Text>
 
       </View>
     ;
         j--;
         this.setState({visible:true});
         const onBackPress = () => {
          if (this.state.visible) {
            this.setState({visible:false});
            return true;
          } else {
            return false;
          }
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
         
       }  
}
callDriver=()=>
{ 
  const args = {
  number: this.mob_no, 
  prompt:true,
}
 
call(args).catch(console.error)

}

 render(){
     var output=[];
      for(let i=0;i<this.state.op.length;i++)
      {
         const addZero=(i)=>{
                   {
                      if (i < 10) {
                        i = "0" + i;
                      }
                      return i;
                    }
                    
              }
              var date1=new Date(this.state.op[i].dop);
              var year1 = date1.getFullYear();
             var month1 = date1.getMonth()+1;
            var dt1 = date1.getDate();
            var hrs1=addZero(date1.getHours());
            var mins1=addZero(date1.getMinutes());

           if (dt1 < 10) {
              dt1 = '0' + dt1;
              }
              if (month1 < 10) {
              month1 = '0' + month1;
              }
              var dop=+dt1+"-"+month1+"-"+year1;
              var time=hrs1+":"+mins1;
             // console.log(dop+time);
             // console.log(this.state.op[i].dop);
             //console.log(this.state.op[i].delivery_date);  
         output.push(   <View
          style={{
            flexDirection: "row",
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 5,
            marginTop: 5,
          }}
          key={i}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={{ fontSize: 16 }}>
              {"Container No.   : "}
              {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type : "}
              {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size  : "}
              {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Date of Pickup  : "}
              {dop}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Time of Pickup : "}
              {time}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              marginLeft: "auto",
              backgroundColor: "lightgrey",
              borderRadius: 10,
              alignItems: "center",
              margin: 5,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => this.changeState(i)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                View Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => this.acceptForm(i)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Select
              </Text>
            </TouchableOpacity>
          </View>
             <Modal
     modalAnimation={new SlideAnimation({slideFrom:'bottom',})}
 visible={this.state.visible}
 onRequestClose={() => {this.setState({visible:false})}}
 footer={
   <ModalFooter>
     <ModalButton
       text="Close"
       onPress={() => {this.setState({visible:false})}}
     />
      <ModalButton
       text="Call"
       onPress={()=>this.callDriver()}
     />
   </ModalFooter>
 }
>
 <ModalContent>
             {this.content}
                   
                       </ModalContent>
                       </Modal>
                       </View>);
                       }
                        if(this.state.op.length==0)
                        {
                            output.push(<View key={-1}><Text>No  Confirmed Request Available</Text></View>);
                        }
                      
    
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {output}
          <ActivityIndicator  size="large" color="skyblue" animating={this.state.load} hidesWhenStopped={true} style={{alignSelf:"center"}}/>
        </ScrollView>
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
  btn1: {
    backgroundColor: "rgba(237, 31, 36,0.95)",
    borderRadius: 25,
    width: 100,
    height: 38,
    justifyContent: "center",
  },
  btn2: {
    backgroundColor: "rgba(39, 59, 145,1)",
    borderRadius: 25,
    width: 100,
    height: 38,
    justifyContent: "center",
  },
});