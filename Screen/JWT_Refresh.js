import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_RERESH = async () => {
    const JWT_EXPIRY_TIME = 1000 * 60 * 30 // 30분
    
    const Refresh = () => {
        AsyncStorage.getItem('authorization').then((value) => {
            fetch('http://192.168.2.110:3001/user/auth', {
                method: 'GET',
                headers: {
                    'authorization' : value,
                },
            })
            .then(LoginSuccess)
            .catch((err) => console.log(err))     
        })
    }
    
    const LoginSuccess = (response) => {
        if(response === 200) {
            setTimeout(Refresh, JWT_EXPIRY_TIME)
        }
    }

    Refresh()

}

export default JWT_RERESH;