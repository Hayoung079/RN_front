// Import React and Component
import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Loader from './Components/main/Loader';

const RegisterScreen = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const nameInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (!userEmail) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!userPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
      //Show Loader
        setLoading(true);
        var dataToSend = {
            user_name: userName,
            user_email: userEmail,
            user_password: userPassword,
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        // 서버로 보내어 결과값 받아오기
        fetch('http://192.168.219.100:3001/user/create',  {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setLoading(false);

            if(responseJson.user_email) {
                setIsRegistraionSuccess(true);
                console.log('회원가입 성공');
            }else {
                setErrortext(responseJson.error);
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    };

    if(isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../Image/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    회원가입 성공 환영합니다!
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.buttonTextStyle}>로그인하기</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{flex: 1, backgroundColor: '#307ecc'}}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
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
                <KeyboardAvoidingView enabled>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                        underlineColorAndroid="#f000"
                        placeholder="이메일"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            passwordInputRef.current && passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                        underlineColorAndroid="#f000"
                        placeholder="비밀번호"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={ () =>
                            nameInputRef.current && nameInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="이름"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={ Keyboard.dismiss }
                            blurOnSubmit={false}
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
                    onPress={handleSubmitButton}>
                    <Text style={styles.buttonTextStyle}>회원가입</Text>
                </TouchableOpacity>
                <Text 
                        style={styles.loginTextStyle}
                        onPress={() => props.navigation.navigate('LoginScreen')}>
                        이미 계정이 있나요? 로그인하기
                </Text>
                </KeyboardAvoidingView>
            </ScrollView> 
        </View>
    );  
};

export default RegisterScreen;

// CSS
const styles = StyleSheet.create({
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
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    loginTextStyle: {
        color: 'white',
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
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});