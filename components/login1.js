
import "react-native-gesture-handler";
import React, { Component } from "react";

//import { NavigationContainer } from '@react-navigation/native';
import {
  Alert,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isPasswordVisible: true,
      toggleText: "Show"
    };
  }

  handleToggle = () => {
    const { isPasswordVisible } = this.state;
    if (isPasswordVisible) {
      this.setState({ isPasswordVisible: false });
      this.setState({ toggleText: "Hide" });
    } else {
      this.setState({ isPasswordVisible: true });
      this.setState({ toggleText: "Show" });
    }
  };

  submitForm = async () => {
    const { username, password } = this.state;
    var auth = {
      username: username,
      password: password
    };
    await fetch("http://192.168.0.103:3000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth)
    })
      .then(response => response.text())
      .then(responseText => {
        console.log(responseText);
        if (responseText == "True") {
          Alert.alert("Login successful");
          this.props.navigation.navigate("Dashboard");
        } else {
          Alert.alert("Login unsuccessful");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  /*if (username == "hello" && password == "123") {
      Alert.alert("Login successful");
      this.props.navigation.navigate("Dashboard");
    } else {
      Alert.alert("Login unsuccessful");
    }*/

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={{ height: 40, backgroundColor: "azure", fontSize: 20 }}
          placeholder="Enter UserName"
          onChangeText={username => this.setState({ username })}
        />
        <View>
          <Text>Password</Text>
        </View>

        <TextInput
          secureTextEntry={this.state.isPasswordVisible}
          style={{ height: 40, backgroundColor: "azure", fontSize: 20 }}
          placeholder="Enter Password"
          ref={ref => (this.passwordInput = ref)}
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={this.submitForm}
        />
        <TouchableOpacity onPress={this.handleToggle}>
          <Text style={{ fontSize: 20 }}>{this.state.toggleText}</Text>
        </TouchableOpacity>
        <Button
          style={{ color: "green" }}
          onPress={this.submitForm}
          title="Login"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Login;