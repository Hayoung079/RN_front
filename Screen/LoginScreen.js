// Import React and Component
import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

// AsyncStorage : 웹에서 LocalStorage 같은 거
import AsyncStorage from '@react-native-async-storage/async-storage';

// loader : 
import Loader from './Components/Loader';

const LoginScreen = ({navigation}) => {
    // 이메일, 비밀번호, 로딩, 오류메시지 상태 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const handleSubmit = () => {
        setErrortext('');
        if(!email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if(!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        setLoading(true);
        
        let userData = {
            user_email: email,
            user_password: password
        };
        
        var formBody = [];

        for( let key in userData ) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(userData[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        // node서버로 보내어 결과값 받아오기
        fetch('http://192.168.2.110:3001/user/login', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type' :
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setLoading(false);
            // console.log(responseJson);

            // 인증 토큰이 있으면
            if(responseJson.authorization) {
                // 사용자 정보 저장
                AsyncStorage.setItem('authorization', responseJson.authorization);
                AsyncStorage.setItem('user_name', '테스터');
                navigation.replace('DrawerNavigationRoutes');
            }else {
                setErrortext('로그인 실패');
                console.log('이메일과 비밀번호를 확인해주세요.');
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    };

    return (
        <View style={StyleSheet.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            />
            <View>
                <KeyboardAvoidingView enabled>
                    <View style={{alignItems: 'center'}}>
                        <Image
                            source={require('../Image/hello.png')}
                            style={{
                                width: '50%',
                                height: 100,
                                resizeMode: 'contain',
                                margin: 30,
                            }}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserEmail) => setEmail(UserEmail)}
                            placeholder="Email" 
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) => setPassword(UserPassword)}
                            placeholder="Password" 
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonTextStyle}>로그인</Text>
                    </TouchableOpacity>
                    <Text 
                        style={styles.registerTextStyle}
                        onPress={() => navigation.navigate('RegisterScreen')}>
                        처음이신가요? 회원가입하기
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

export default LoginScreen;

// CSS
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: 'gray',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});