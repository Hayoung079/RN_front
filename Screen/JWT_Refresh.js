import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_RERESH = async () => {
    const JWT_EXPIRY_TIME = 1000 * 60 * 30 // 30분
    
    const GetAuthorization = () => {
        return AsyncStorage.getItem('authorization').then((value) => {
            if(value !== null) {
                // 서버로 보내어 결과값 받아오기
                fetch('http://192.168.2.110:3001/user/auth', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                        'Content-Type' : 'application/json;charset=UTF-8',
                    },
                })
                .catch((err) => console.log(err))
            }
        })
    }

    const SlientRefresh = () => {
        GetAuthorization()
            .then((response) => {
                response.json()
                LoginSuccess(response)
            })
            .then((responseJson) => {
                console.log("refresh-auth : "+ responseJson.authorization);
                AsyncStorage.mergeItem('authorization', responseJson.authorization);
            })
            .catch((err) => console.log(err))
    }
    
    const LoginSuccess = (response) => {
        if(response.status === 200) {
            setTimeout(SlientRefresh, JWT_EXPIRY_TIME)
        }
    }

    SlientRefresh()
}

export default JWT_RERESH;