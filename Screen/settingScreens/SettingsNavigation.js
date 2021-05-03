import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

// 스크린
import SettingsScreen from '../DrawerScreens/SettingsScreen';
import UserInfoScreen from './UserInfoScreen'
import DrawerHeader from '../Components/main/DrawerHeader';

const Stack = createStackNavigator();

const SettingsNavigation = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="SettingsScreen">
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: '설정', 
                    headerLeft: () => (
                    <DrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
            <Stack.Screen
                name="UserInfoScreen"
                component={UserInfoScreen}
                options={{
                    title: '내 정보 설정', 
                    headerLeft: () => (
                    <DrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigation;