import React from "react";
import * as Facebook from "expo-facebook";
import {
  View,
  Alert,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableHighlightComponent,
} from "react-native";
import * as firebase from "firebase";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Text> Register page</Text>
      </View>
    );
  }
}

export default Register;
