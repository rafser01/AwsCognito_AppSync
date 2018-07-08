import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Amplify, { Auth } from "aws-amplify/dist/aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);
export default class App extends React.Component {
  state = {
    authCode: ""
  };
  onChangeText(authCode) {
    this.setState({
      authCode
    });
  }
  signUp() {
    Auth.signUp({
      username: "rakin",
      password: "12345678",
      attributes: {
        phone_number: "+15555555555",
        email: "r.afser01@gmail.com"
      }
    })
      .then(res => {
        console.log("successful signup: ", res);
      })
      .catch(err => {
        console.log("error signing up: ", err);
      });
  }
  confirmUser() {
    // 4
    const { authCode } = this.state;
    Auth.confirmSignUp("rakin", authCode)
      .then(res => {
        console.log("successful confirmation: ", res);
      })
      .catch(err => {
        console.log("error confirming user: ", err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Up" onPress={this.signUp.bind(this)} />
        <TextInput
          placeholder="Input Code"
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <Button title="Confirm User" onPress={this.confirmUser.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#ededed",
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  }
});
