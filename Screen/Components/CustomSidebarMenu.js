// Import React and Component
import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = (props) => {
    const [userName, setUserName] = useState('');

    const GetUserName = () => {
        AsyncStorage.getItem('authorization').then((value) => {
            if(value !== null) {
                // 서버로 보내어 결과값 받아오기
                fetch('http://192.168.2.110:3001/user/profile', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    setUserName(responseJson.user_name);
                })
                .catch((err) => console.log(err))
            }
        })
    }

    GetUserName()

    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Text style={{fontSize: 25, color: '#307ecc'}}>
                        {userName.charAt(0)}
                    </Text>
                </View>
                <Text style={stylesSidebar.profileHeaderText}>
                    {userName}
                </Text>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                label={() => 
                    <Text style={{color: '#d8d8d8'}}>
                        로그아웃
                    </Text>
                }
                onPress={() => {
                    props.navigation.toggleDrawer();
                    Alert.alert(
                        '로그아웃',
                        '정말 로그아웃 하시겠습니까?',
                        [
                            {
                                text: '취소',
                                onPress: () => {
                                    return null;
                                },
                            },
                            {
                                text: '확인',
                                onPress: () => {
                                    AsyncStorage.clear();
                                    props.navigation.replace('Auth');
                                },
                            },
                        ],
                        {cancelable: false},
                    );
                }}
            />
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomSidebarMenu;

// CSS
const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#307ecc',
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#307ecc',
        padding: 15,
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
    },
});