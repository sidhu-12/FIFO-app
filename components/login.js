import 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions,ImageBackground,Keyboard,Platform,Alert,StyleSheet,StatusBar, Button,Text,TextInput, View ,TouchableOpacity,Image,KeyboardAvoidingView,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import {createStackNavigator, Assets} from '@react-navigation/stack';

//import { createDrawerNavigator } from '@react-navigation/drawer';


 class Login extends Component {  
  constructor(props) { 
    super(props);  
    this.state = { 
        username:'', 
        password: '',  
        isPasswordVisible: true,  
        toggleText: 'Show', 
        keyboardOffset:0, 
        load:false,
    }; 
  }

    handleToggle = () => {  
      const { isPasswordVisible } = this.state;  
      if (isPasswordVisible) {  
          this.setState({ isPasswordVisible: false });  
          this.setState({ toggleText: 'Hide' });  
      } else {  
          this.setState({ isPasswordVisible: true });  
          this.setState({ toggleText: 'Show' });  
      }  
  };  
  submitForm =()=>{ 
    Keyboard.dismiss();
    this.setState({load:true})
    const {username,password}=this.state;
    if(this.state.username==''||this.state.password=='')
    {
      Alert.alert("Please enter the username or password");
      this.setState({load:false})
    }else
    {
    var auth = {
      username: username,
      password: password
    };
    var xhr=new XMLHttpRequest;
    xhr.onreadystatechange=function()
    {
      console.log(this.readyState);
      if(this.readyState==4&&this.status==200)
      {
        console.log(this.responseText);
        validate(this);
      }
      if(this.readyState==4&&this.status!=200)
      {
       Alert.alert("Network Error\nPlease check your network connection");
       stopLoading();
      }
    }
    xhr.open("POST","http://fifo-app-server.herokuapp.com/auth",true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(auth));
    const stopLoading=()=>
    {
      this.setState({load:false});
    }
    const validate=(xml)=>
    {
      if(xml.responseText=="True")
        {
          Alert.alert("Login successful");
          this.setState({load:false});
          this.props.navigation.navigate('Dashboard',{name:this.state.username});
          
        }
        else{
          this.setState({load:false});
          Alert.alert("Login unsuccessful Please try again");
        }
    }
  }
}
  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
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
        <KeyboardAvoidingView  behavior="padding"
      keyboardVerticalOffset={100} style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter UserName"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={username => this.setState({ username })}
          />

          <TextInput
            secureTextEntry={this.state.isPasswordVisible}
            style={styles.input}
            placeholder="Enter Password"
            ref={ref => (this.passwordInput = ref)}
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={password => this.setState({ password })}          />

          <TouchableOpacity onPress={this.handleToggle}>
            <Text style={{ fontSize: 15 }}>{this.state.toggleText}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.submitForm} style={styles.btnLogin}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Login
            </Text>
           </TouchableOpacity>
           <ActivityIndicator  size="large" color="skyblue" animating={this.state.load} hidesWhenStopped={true} />
          
        </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
const { width: WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  input: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingLeft: 45,
    marginTop: 15
  },
  btnLogin: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    backgroundColor: "skyblue",
    justifyContent: "center",
    marginTop: 40
  },
  loginContainer: {
    marginTop: 30,
    alignItems: "center"
  }
});
 export default Login;