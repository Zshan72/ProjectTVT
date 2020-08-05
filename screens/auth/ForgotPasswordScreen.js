import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Dimensions,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  onBackToLoginPress = () => {
    {
      this.props.navigation.navigate("Login");
    }
  };
  render() {
    return (
      <Block flex middle>
        <StatusBar visible />
        <Block flex>
          <Block flex={0.15} middle>
            <Text color="#8898AA" size={15}>
              Enter your registered email address
            </Text>
          </Block>
          <Block flex>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >
              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
              <Block middle>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Reset Password"
                    color="primary"
                    onPress={this.onResetPasswordPress}
                    style={styles.createButton}
                  >
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      SEND EMAIL
                    </Text>
                  </Button>
                  <Button
                    title="Back to Login..."
                    color="primary"
                    onPress={this.onBackToLoginPress}
                    style={styles.createButton}
                  >
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      GO TO LOGIN
                    </Text>
                  </Button>
                </View>
              </Block>
            </KeyboardAvoidingView>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
