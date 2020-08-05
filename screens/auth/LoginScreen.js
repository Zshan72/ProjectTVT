import React from "react";
// import {} from "react-native-elements";

import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import * as firebase from "firebase";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  Dimensions,
  Keyboard,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.navigation.navigate("Main");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  onCreateAccountPress = () => {
    {
      this.props.navigation.navigate("Signup");
    }
  };

  onForgotPasswordPress = () => {
    {
      this.props.navigation.navigate("ForgotPassword");
    }
  };

  render() {
    return (
      <Block flex middle>
        <KeyboardAvoidingView behavior="position" enabled>
          <Block style={styles.emailPassContainer}>
            <Input
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
              borderless
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="ic_mail_24px"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block style={styles.emailPassContainer}>
            <Input
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              borderless
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="padlock-unlocked"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block middle>
            <View style={styles.buttonContainer}>
              <Button
                title="Create account..."
                color="primary"
                onPress={this.onCreateAccountPress}
                style={styles.createButton}
              >
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  CREATE ACCOUNT
                </Text>
              </Button>
              <Button
                title="Login"
                color="primary"
                onPress={this.onLoginPress}
                style={styles.createButton}
              >
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  LOGIN
                </Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Forgot Password..."
                color="primary"
                onPress={this.onForgotPasswordPress}
                style={styles.createButton}
              >
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  FORGOT PASSWORD
                </Text>
              </Button>
            </View>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  emailPassContainer: {
    width: width * 0.8,
    marginBottom: 15,
  },

  registerContainer: {
    flexDirection: "row",
    width: width * 0.95,
    height: height * 0.88,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 15,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.4,
    margin: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});
