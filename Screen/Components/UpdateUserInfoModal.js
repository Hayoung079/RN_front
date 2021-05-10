import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Form, Icon, Input, Item, Label, Text, View } from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';

const UpdateUserInfoModal = ({modalVisible ,setModalVisible}) => {
    const [userName, setUserName] = useState(null);
    const [userPassword, setUserPassword] = useState(null);

    const ChangeUserInfo = () => {
        if (!userName) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (!userPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        
        let dataToSend = {user_password: userPassword, user_name: userName};
        let formBody = [];

        for(let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        // 사용자 정보 수정  API 연결
        AsyncStorage.getItem('authorization').then((value) => {
            fetch('http://192.168.2.110:3001/user/update', {
                method: 'PATCH',
                body: formBody,
                headers: {
                    'authorization' : value,
                    'Content-Type' :
                    'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 1) {
                    console.log('사용자 정보 수정 성공')
                    Alert.alert(
                        '내 정보 변경',
                        '성공적으로 변경되었습니다.',
                        [{
                            text: '확인',
                            onPress: () => {
                                setModalVisible(false)
                            }
                        }]
                    )
                }else{
                    console.log(responseJson)
                    setModalVisible(false)
                }
            })
        })      
    }


    return (
        <>
            {modalVisible ? (
                <View style={styles.modalContainer}>
                    <View style={styles.whiteBox}>
                    <View style={styles.head}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 60}}>내 정보 변경</Text>
                            <Icon
                                type="AntDesign"
                                name="closecircleo"
                                style={{fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20}}
                                onPress={() => {setModalVisible(!modalVisible)}}
                            />
                        </View>
                        <View style={styles.inputArea}>
                            <Text style={{fontSize: 18, padding: 10, alignSelf: 'center'}}>변경할 정보를 입력해 주세요.</Text>
                            <Form>
                                <View style={styles.inputBox}>
                                    <Item floatingLabel>
                                        <Label>이름</Label>
                                        <Input onChangeText={(userName) => setUserName(userName)} />
                                    </Item>
                                    <Item floatingLabel style={{marginTop: 20}}>
                                        <Label>비밀번호</Label>
                                        <Input 
                                            secureTextEntry={true}
                                            onChangeText={(userPassword) => setUserPassword(userPassword)}/>
                                    </Item>
                                </View>
                                <Button info
                                    style={styles.button}
                                    onPress={ChangeUserInfo}>
                                    <Text style={{fontSize: 15}}>수정</Text>
                                </Button>
                            </Form>
                        </View>
                    </View>
                </View>
            ) : null}
        </>
    )
}

export default UpdateUserInfoModal;

const styles = StyleSheet.create({
    modalContainer: {
        position: 'relative',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '80%',
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    whiteBox: {
        alignSelf: 'center',
        width: '100%',
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        width: '100%',
        height: 45,
        borderRadius: 10,
        backgroundColor: 'lightgray',
    },
    inputArea: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        width: '100%',
        height: '85%',
    },
    inputBox: {
        alignSelf: 'center',
        width: '90%',
        height: '40%',
    },
    button: {
        alignSelf:'center', 
        justifyContent: 'center', 
        marginTop: 60, 
        width: 110,
        backgroundColor: 'blue', 
    },
})