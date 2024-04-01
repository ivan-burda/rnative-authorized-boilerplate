import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';

import {Colors} from "../../constants/colors";
import {IconButton} from "../IconButton/IconButton";
import {Screen1} from "../../screens/Screen1";
import {Settings} from "../../screens/Settings/Settings";
import {Screen2} from "../../screens/Screen2";

import {logout} from "../../firestore-api/auth/logout";

const BottomTabs = createBottomTabNavigator();

export const NavigationBottomTabs = () => (
    <BottomTabs.Navigator screenOptions={({route}) => ({
        headerStyle: {backgroundColor: Colors.bgPrimary},
        tabBarStyle: {backgroundColor: Colors.bgPrimary},
        headerTintColor: 'green',
        tabBarActiveTintColor: Colors.primary500,
        tabBarInactiveTintColor: 'gray',
        headerRight: ({tintColor}) => (
            <IconButton
                icon="power-outline"
                size={24}
                color={tintColor}
                label="Logout"
                onPress={logout}
            />
        ),
    })}
    >
        <BottomTabs.Screen
            name="screen1"
            component={Screen1}
            options={{
                title: "Screen1",
                tabBarLabel: "Screen1",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="analytics-outline" size={size} color={color}/>
                ),
            }}
        />
        <BottomTabs.Screen
            name="screen2"
            component={Screen2}
            options={{
                title: "Screen2",
                tabBarLabel: "Screen2",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="happy-outline" size={size} color={color}/>
                ),
            }}
        />
        <BottomTabs.Screen
            name="settings"
            component={Settings}
            options={{
                title: "Settings",
                tabBarLabel: "Settings",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="settings-outline" size={size} color={color}/>
                ),
            }}
        />
    </BottomTabs.Navigator>
);