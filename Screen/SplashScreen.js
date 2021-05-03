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

import JWT_RERESH from './JWT_Refresh'

const SplashScreen = ({navigation}) => {
    // ActivityIndicator animation 상태
    const [animating, setAnimating] = useState(true);
    

    useEffect(() => {
        // 로딩 3초
        setTimeout(() => {
            setAnimating(false);  

            JWT_RERESH().then(()=>{
                // 스토리지에 저장된 JWT토큰을 API에 보내어 사용자 인증
                AsyncStorage.getItem('authorization').then((value) => {
                    console.log('storage-auth : ' + value)
                    navigation.replace(
                        value === null ? 'Auth' : 'DrawerNavigationRoutes'
                    )
                })  
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