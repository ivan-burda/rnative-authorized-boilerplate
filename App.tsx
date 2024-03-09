import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext, AuthContextProvider} from "./store/AuthContextProvider";
import {Colors} from "./constants/colors";
import {FC, useCallback, useContext, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {LoginScreen} from "./screens/LoginScreen";
import {RegisterScreen} from "./screens/RegisterScreen";
import {IconButton} from "./components/IconButton/IconButton";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "./types/types";
import {RoutingScreen} from "./screens/RoutingScreen";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {logout} from "./firestore-api/registration";


const Stack = createNativeStackNavigator();

function AuthenticationStack(){
    const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()

    return(<Stack.Navigator
        screenOptions={{
            // headerShown:false,
            headerStyle: { backgroundColor: Colors.bgPrimary },
            headerTintColor: 'fff',
            contentStyle: { backgroundColor: Colors.primary100 },
        }}>
    <Stack.Screen name="Login" component={LoginScreen}         options={( ) => ({
        title: "",
        headerRight: ({ tintColor }) => (
            <Button color={Colors.primary500} title="Register" onPress={() => navigate('Register')}/>

        ),
    })}
    />
    <Stack.Screen name="Register" component={RegisterScreen} options={( ) => ({
        title: "",
        headerLeft: ({ tintColor }) => (
            <Button color={Colors.primary500} title="Login" onPress={() => navigate('Login')}/>

        ),
    })}
    />
  </Stack.Navigator>)
}



function AuthenticatedStack() {
    return(<Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.bgPrimary },
            contentStyle: { backgroundColor: Colors.primary100 },
        }}
    >
    <Stack.Screen
        name="protectedScreen"
        component={RoutingScreen}
        options={( ) => ({
            headerShown:false,
            headerTintColor:Colors.primary500,
          title: 'Feelings',
          headerRight: ({ tintColor }) => (
              <IconButton
                  icon="power-outline"
                  size={24}
                  color={tintColor}
                  label="Logout"
                  onPress={logout}
              />
          ),
        })}

    />
  </Stack.Navigator>)
}

function Navigation(){
  const authContext = useContext(AuthContext)
  return <NavigationContainer>
    {!authContext?.isAuthenticated && <AuthenticationStack/>}
    {authContext?.isAuthenticated && <AuthenticatedStack/>}
  </NavigationContainer>
}

const Root:FC = () => {
    const [isAuthOK, setIsAuthOK] = useState(false);

    const onAuthStateChanged = (user:FirebaseAuthTypes.User|null) => {
        if(user){
            console.log('user ok');
            setIsAuthOK(true)
        }else{
            console.log('user nok');
            setIsAuthOK(false)
        }
    };

    useEffect(()=>{
        return auth().onAuthStateChanged(onAuthStateChanged);
    },[])

  const onLayoutRootView = useCallback(async()=>{
    if(isAuthOK){
      await SplashScreen.hideAsync()
    }
      if(!isAuthOK){
          return null;
      }
  },[isAuthOK])



  return(<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
    <Navigation/>
  </View>)
};

export default function App() {
  return (
   <>
   <StatusBar style="dark"/>
     <AuthContextProvider>

       <Root/>
     </AuthContextProvider>
   </>
  );
}

const styles = StyleSheet.create({
    navigationButton:{
        color: Colors.primary500
    }
})