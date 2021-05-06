import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_Refresh = async () => {
    const JWT_EXPIRY_TIME = 1000 * 60 * 30 // 30분 
    
    const SlientRefresh = () => {
        return AsyncStorage.getItem('authorization').then((value) => {
            if(value !== null) {
                // 서버로 보내어 결과값 받아오기
                fetch('http://192.168.2.110:3001/user/auth', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("refresh-auth : "+ responseJson.authorization);
                    AsyncStorage.mergeItem('authorization', responseJson.authorization);
                })
                .catch((err) => console.log(err))
            }
        })
    }
    
    const LoginSuccess = () => {
        setTimeout(SlientRefresh, JWT_EXPIRY_TIME)
    }

    LoginSuccess()
}

export default JWT_Refresh;