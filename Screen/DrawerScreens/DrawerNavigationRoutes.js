// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './HomeScreen';
import CustomSidebarMenu from '../Components/CustomSidebarMenu';
import DrawerHeader from '../Components/main/DrawerHeader';
import SettingsNavigation from '../settingScreens/SettingsNavigation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// 홈 화면 stack
const homeScreenStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: '홈', 
                    headerLeft: () => (
                    <DrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};

// 설정 화면 stack
const settingScreenStack = ({navigation}) => {
    return (
        <SettingsNavigation />
    );
};


// 공지사항 화면 stack
const NotificationScreenStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName="NotificationScreen"
            screenOptions={{
            headerLeft: () => (
                <DrawerHeader navigationProps={navigation} />
            ),
            headerStyle: {
                backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            },
            }}
        >
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    title: '공지사항', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};


// drawer (사이드 메뉴바)
const DrawerNavigatorRoutes = () => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#cee1f2',
                color: '#cee1f2',
                itemStyle: {marginVertical: 5, color: 'white'},
                labelStyle: {
                color: '#d8d8d8',
                },
            }}
            screenOptions={{headerShown: false}}
            drawerContent={CustomSidebarMenu}
        >
            
            <Drawer.Screen
                name="homeScreenStack"
                options={{drawerLabel: '홈'}}
                component={homeScreenStack}
            />
            
            <Drawer.Screen
                name="NotificationScreenStack"
                options={{drawerLabel: '공지사항'}}
                component={NotificationScreenStack}
            />

            <Drawer.Screen
                name="settingScreenStack"
                options={{drawerLabel: '설정'}}
                component={settingScreenStack}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigatorRoutes;