import 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions,ImageBackground,Keyboard,Platform,Alert,StyleSheet,StatusBar, Button,Text,TextInput, View ,TouchableOpacity,Image,KeyboardAvoidingView} from 'react-native';
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
  componentWillUnmount=()=>{
    if(Platform.OS=='ios')
    {
        Keyboard.dismiss();
    }
  }
  submitForm =()=>{ 
    const {username,password}=this.state;
    if(this.state.username==''||this.state.password=='')
    {
      Alert.alert("Please enter the username or password");
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
    }
    xhr.open("POST","http://fifo-app-server.herokuapp.com/auth",true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(auth));
    const validate=(xml)=>
    {
      if(xml.responseText=="True")
        {
          Alert.alert("Login successful");
          this.props.navigation.navigate('Dashboard',{name:this.state.username});
          
        }
        else{
          Alert.alert("Login unsuccessful Please try again");
        }
    }
  }
}
  render() {
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
        <KeyboardAvoidingView style={styles.loginContainer}>
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
          
        </KeyboardAvoidingView>
      </View>
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
    marginTop: 100,
    alignItems: "center"
  }
});
   /* return(
 
      <View style={styles.container}>
      <View style={{flex:1,flexDirection:'column',alignItems:'flex-start'}}>
      <Image style={{resizeMode:'contain'}}source={require('./fifo.png')}/>
      <Text style={{fontSize:16}}>Driven by Technology,Defined by Humanity</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "padding"} style={styles.container1}>
      <View style={{flexDirection:'row'}}>
     
       <View style={{alignItems:'flex-start',justifyContent:'flex-start'}}>
      <Text style={{marginLeft:'auto',fontSize:22}}>Username:
      </Text>
      </View>
      <View style={{alignItems:'flex-end'}}>
      <TextInput  
                    style={{height: 30, fontSize: 20,width:300,borderColor: "#000000",
                    borderBottomWidth: 1,}}  
                    placeholder="Enter UserName"  
                    onChangeText={username => this.setState({username})}
                   
                />
                </View>
                </View>
                
                <View style={{flexDirection:'row',marginLeft:'auto'}}>
                  <Text style={{marginLeft:'auto',fontSize:22}}>Password:</Text>
            

      <TextInput  secureTextEntry={this.state.isPasswordVisible}
                    style={{height: 30,borderColor: "#000000",
                    borderBottomWidth: 1, fontSize: 20,width:300}}  
                    placeholder="Enter Password" 
                    ref={ref => (this.passwordInput = ref)} 
                    onChangeText={password => this.setState({password})}
                    onSubmitEditing={this.submitForm} 
                />
                </View>
                
                <View>
                 <TouchableOpacity onPress={this.handleToggle}>  
                 <Text  style={{fontSize: 20}}>{this.state.toggleText}</Text>  
                 </TouchableOpacity>
                 </View>
      <Button  
                        onPress={this.submitForm}  
                        style={{padding:50,width:70}}
                        title="Login"  
                    />  
    
     </KeyboardAvoidingView>
     </View>

  );

    }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});*/
 export default Login;