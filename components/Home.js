import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Carousel from "./Carousel";
import { dummyData } from "./Data";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Assets } from "@react-navigation/stack";
const Stack = createStackNavigator();

class Home extends Component {
  constructor(props) {
    super(props);
  }
  submitForm = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{ resizeMode: "stretch" }}
            source={require("./fifo.png")}
          />
          <View>
            <Text style={{ fontSize: 15 }}>
              Driven by <Text style={{ color: "#00c0e2" }}>Technology</Text> ,
              Defined By <Text style={{ color: "#00c0e2" }}>Humanity</Text>
            </Text>
          </View>
        </View>
        <Carousel data={dummyData} />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={this.submitForm} style={styles.btnLogin}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Login
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
    backgroundColor: "white"
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  btnLogin: {
    width: 150,
    height: 45,
    borderRadius: 40,
    backgroundColor: "#4f81bc",
    justifyContent: "center",
    marginTop: 40,
    borderColor: "#395d8a",
    borderWidth: 3,
  }
});

export default Home;
