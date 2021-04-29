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

const SplashScreen = ({navigation}) => {
    // ActivityIndicator animation 상태
    const [animating, setAnimating] = useState(true);
    

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            
            AsyncStorage.getItem('authorization').then((value) => {
                
                // 서버로 보내어 결과값 받아오기
                // 회사 : 192.168.2.110
                // 집: 172.22.192.1
                fetch('http://192.168.2.110:3001/user/auth', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                    },
                })
                .then(() => {
                    console.log('사용자 인증 성공 - 자동로그인')
                    navigation.replace(
                        value === null ? 'Auth' : 'DrawerNavigationRoutes'
                    )
                })
                .catch((err) => console.log(err))        
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