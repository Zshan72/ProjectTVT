import { Notifications } from 'expo';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import LoginScreen from './../screens/auth/LoginScreen';
import SignupScreen from './../screens/auth/SignupScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import Onboarding from '../screens/Onboarding';


const Stack = createStackNavigator();

function RootStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Onboard" component={Onboarding} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default class RootNavigation extends React.Component {
    componentDidMount() {
        this._notificationSubscription = this._registerForPushNotifications();
    }
    componentWillUnmount() {
        this._notificationSubscription && this._notificationSubscription.remove();
    }
    render() {
        return (
            <RootStackNavigator />
        );
    }
    _registerForPushNotifications() {
        registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = ({ origin, data }) => {
        console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
    };
}

