// Import React and Component
import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image
} from 'react-native';

// AsyncStorage : 웹에서 LocalStorage 같은 거
import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_Refresh = () => {
    const JWT_EXPIRY_TIME = 1000 * 60 * 30 // 30분 
    
    const SlientRefresh = () => {
        setTimeout(() => {
            AsyncStorage.getItem('authorization').then((value) => {
                if(value !== null) {
                    // 서버로 보내어 결과값 받아오기
                    fetch('http://192.168.219.107:3001/user/auth', {
                        method: 'GET',
                        headers: {
                            'authorization' : value,
                            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
                        },
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log("refresh-auth : "+ responseJson.authorization);
                        AsyncStorage.setItem('authorization', responseJson.authorization);
                    })
                    .catch((err) => console.log(err))
                }
            })
        }, JWT_EXPIRY_TIME);
    }

    SlientRefresh();
}

const SplashScreen = ({navigation}) => {
    // ActivityIndicator animation 상태
    const [animating, setAnimating] = useState(true);
    
    useEffect(() => {
        // 로딩 3초
        setTimeout(() => {
            setAnimating(false);  

            JWT_Refresh()
            
            AsyncStorage.getItem('authorization').then((value) => {
                console.log('Splash-storage-auth : ' + value)
                navigation.replace(
                    value === null ? 'Auth' : 'DrawerNavigationRoutes'
                )
            })  
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../Image/hello.png')}
                style={{width: '90%', resizeMode: 'contain', margin: 30}}
            />
            <ActivityIndicator
                animating={animating}
                color='#fffff'
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

// CSS
const styles = StyleSheet.create({
    container: {
        flex : 1, // 전체를 차지
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});