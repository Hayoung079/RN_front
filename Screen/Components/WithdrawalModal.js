import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Form, Icon, Input, Item, Label, Text, View } from 'native-base';
import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';

const WithdrawalModal = ({modalVisible ,setModalVisible}) => {
    const [userPassword, setUserPassword] = useState(null);
    const [errortext, setErrortext] = useState(null);
    const navigation = useNavigation();

    //  사용자 비밀번호 인증하기
    const UserWithdrawal = () => {
        if (!userPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        let dataToSend = {user_password: userPassword};
        let formBody = [];

        for(let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        
        AsyncStorage.getItem('authorization').then((value) => {
            fetch('http://192.168.2.110:3001/user/auth-password', {
                method: 'POST',
                body: formBody,
                headers: {
                    'authorization' : value,
                    'Content-Type' :
                    'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === true) {
                    console.log('사용자 비밀번호 인증 성공')
                    // 회원 탈퇴 로직 성공시
                    Alert.alert(
                        '회원 탈퇴',
                        '성공적으로 탈퇴되었습니다.',
                        [{
                            text: '확인',
                            onPress: () => {
                                // AsyncStorage.clear();
                                navigation.navigate('HomeScreen');
                            }
                        }]
                    )
                    setErrortext(null)
                    setModalVisible(false)
                } else {
                    setErrortext('회원 탈퇴에 실패했습니다. \n 비밀번호를 확인해주세요.')
                } 
            })
        })
    }

    return(
        <>
            {modalVisible ? (
                <View style={styles.modalContainer}>
                    <View style={styles.whiteBox}>
                        <View style={styles.head}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 60}}>회원 탈퇴</Text>
                            <Icon
                                type="AntDesign"
                                name="closecircleo"
                                style={{fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20}}
                                onPress={() => {setModalVisible(!modalVisible)}}
                            />
                        </View>
                        <View style={styles.inputArea}>
                            <Form>
                                <Item floatingLabel style={styles.inputBox}>
                                    <Label>비밀번호를 입력해주세요.</Label>
                                    <Input
                                        secureTextEntry={true}
                                        onChangeText={(userPassword) => setUserPassword(userPassword)} />
                                </Item>
                                {errortext != '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        {errortext}
                                    </Text>
                                ) : null}
                                <Button info style={styles.button}  onPress={UserWithdrawal} >
                                    <Text style={{fontSize: 15}}>확인</Text>
                                </Button>
                            </Form>
                        </View>
                    </View>
                </View>
            ): null}
        </>
    )
}

export default WithdrawalModal;

const styles = StyleSheet.create({
    modalContainer: {
        position: 'relative',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    whiteBox: {
        width: '100%',
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        height: 45,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightgray',
    },
    inputArea: {
        paddingHorizontal: 10,
        width: '100%',
        height: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: '90%',
        height: '40%',
        alignSelf: 'center',
    },
    button: {
        alignSelf:'center', 
        justifyContent: 'center', 
        marginTop: 20, 
        width: 110,
        backgroundColor: 'blue', 
    },
    errorTextStyle: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})