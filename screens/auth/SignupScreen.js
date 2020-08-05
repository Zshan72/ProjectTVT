import React from "react";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
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
import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert(error.message);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.navigation.navigate("Main");
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

  loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("613033995993332");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture,type(large)`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "612365875975-hld2gpa0j245re259f71f5d7eegrih1p.apps.googleusercontent.com",
        iosClientId:
          "612365875975-87ip0mlgm5llv96s61itbearf1cao989.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      }).then(this.props.navigation.navigate("Home"));

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <Block flex middle>
        <StatusBar visible />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={15}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button
                    style={{ ...styles.socialButtons, marginRight: 50 }}
                    onPress={this.loginWithFacebook}
                  >
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={15}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}> FACEBOOK </Text>
                    </Block>
                  </Button>
                  <Button
                    style={styles.socialButtons}
                    onPress={this.signInWithGoogleAsync}
                  >
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={15}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.15} middle>
                  <Text color="#8898AA" size={15}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
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
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                    <Block width={width * 0.8}>
                      <Input
                        value={this.state.passwordConfirm}
                        onChangeText={(text) => {
                          this.setState({ passwordConfirm: text });
                        }}
                        borderless
                        secureTextEntry={true}
                        placeholder="Confirm Password"
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
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3,
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the.... "
                      />
                      <TouchableOpacity style={{ width: 100 }}>
                        <Text
                          style={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 15,
                          }}
                        >
                          {" "}
                          Privacy Policy
                        </Text>
                      </TouchableOpacity>
                    </Block>
                    <Block middle>
                      <View style={styles.buttonContainer}>
                        <Button
                          color="primary"
                          onPress={this.onSignupPress}
                          style={styles.createButton}
                        >
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            CREATE ACCOUNT
                          </Text>
                        </Button>
                        <Button
                          color="primary"
                          onPress={this.onBackToLoginPress}
                          style={styles.createButton}
                        >
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            BACK TO LOGIN
                          </Text>
                        </Button>
                      </View>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.95,
    height: height * 0.88,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
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
