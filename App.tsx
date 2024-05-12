import {StatusBar} from 'expo-status-bar';
import {Button, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useReactNavigationDevTools} from '@dev-plugins/react-navigation';
import {useNavigationContainerRef, Slot} from 'expo-router';
import {Colors} from "./constants/colors";
import {FC, useCallback, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {LoginScreen} from "./screens/LoginScreen";
import {RegisterScreen} from "./screens/RegisterScreen";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "./types/types";

import {app} from "./firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {NavigationBottomTabs} from "./components/NavigationBottomTabs/NavigationBottomTabs";

const Stack = createNativeStackNavigator();


function AuthenticationStack() {
    const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (<Stack.Navigator
        screenOptions={{
            // headerShown:false,
            headerStyle: {backgroundColor: Colors.bgPrimary},
            headerTintColor: 'fff',
            contentStyle: {backgroundColor: Colors.primary100},
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={() => ({
            title: "",
            headerRight: ({tintColor}) => (
                <Button color={Colors.primary500} title="Register" onPress={() => navigate('Register')}/>

            ),
        })}
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={() => ({
            title: "",
            headerLeft: ({tintColor}) => (
                <Button color={Colors.primary500} title="Login" onPress={() => navigate('Login')}/>
            ),
        })}
        />
    </Stack.Navigator>);
}

function AuthenticatedStack() {
    return (<Stack.Navigator
        screenOptions={{
            headerStyle: {backgroundColor: Colors.bgPrimary},
            contentStyle: {backgroundColor: Colors.primary100},
        }}
    >
        <Stack.Screen
            name="NavigationBottomTabs"
            component={NavigationBottomTabs}
            options={() => ({
                headerShown: false,
            })}
        />
    </Stack.Navigator>);
}

const Root: FC = () => {
    const auth = getAuth(app);
    const [isAuthOK, setIsAuthOK] = useState(false);

    const onLayoutRootView = useCallback(async () => {
        if (isAuthOK) {
            await SplashScreen.hideAsync();
        }
        if (!isAuthOK) {
            return null;
        }
    }, [isAuthOK]);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuthOK(true);
        } else {
            setIsAuthOK(false);
        }
    });

    return (<View style={{flex: 1}} onLayout={onLayoutRootView}>
        <NavigationContainer>
            {!isAuthOK && <AuthenticationStack/>}
            {isAuthOK && <AuthenticatedStack/>}
        </NavigationContainer>
    </View>);
};

export default function App() {
    const navigationRef = useNavigationContainerRef();
    useReactNavigationDevTools(navigationRef);
    return (
        <>
            <StatusBar style="dark"/>
            <Root/>
        </>
    );
}