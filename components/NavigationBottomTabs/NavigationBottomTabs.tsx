import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';

import {Colors} from "../../constants/colors";
import {IconButton} from "../IconButton/IconButton";
import {useContext} from "react";
import {AuthContext} from "../../store/AuthContextProvider";
import {Screen1} from "../../screens/Screen1";
import {Screen3} from "../../screens/Screen3";
import {Screen2} from "../../screens/Screen2";

const BottomTabs = createBottomTabNavigator();


export function NavigationBottomTabs() {
    const authContext = useContext(AuthContext);
    return (
        <BottomTabs.Navigator      screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: Colors.bgSecondary },
            headerTintColor: 'green',
            contentStyle: { backgroundColor: Colors.primary100 },
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="power-outline"
                    size={24}
                    color={tintColor}
                    label="Logout"
                    onPress={() => authContext?.logout()}
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
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="analytics-outline" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="screen2"
                component={Screen2}
                options={{
                    title: "Screen2",
                    tabBarLabel: "Screen2",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="happy-outline" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="screen3"
                component={Screen3}
                options={{
                    title: "Screen3",
                    tabBarLabel: "Screen3",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}