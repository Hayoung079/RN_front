import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Container, Content, Text, Thumbnail } from 'native-base';
import React, {useState, useRef} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import ModalComponent from '../Components/main/Modal';
import UpdateUserInfoModal from '../Components/UpdateUserInfoModal';
import WithdrawalModal from '../Components/WithdrawalModal';

const UserInfoScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [clickedButton, setClikedButton] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userImg, setImageSource] = useState(null);
    const updateButton = useRef();
    const withdrawalButton = useRef();

    const GetUserInfo = () => {
        AsyncStorage.getItem('authorization').then((value) => {
            if(value !== null) {
                // 서버로 보내어 결과값 받아오기
                fetch('http://192.168.2.110:3001/user/profile', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    setUserEmail(responseJson.user_email);
                    setUserName(responseJson.user_name);
                })
                .catch((err) => console.log(err))
            }
        })
    }

    GetUserInfo()

    const pickImg = () => {
        const options = {
            title: '프로필 설정',
            mediaType: 'photo',
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              setImageSource(response.uri); // 저는 여기서 uri 값을 저장 시킵니다 !
            }
        });
    }
    
    return (
        <Container style={styles.container}>
            <Content style={styles.content}>
                {userImg ? (
                    <TouchableOpacity onPress={()=>pickImg()}>
                        <Thumbnail 
                            large 
                            source={{uri: userImg}} 
                            style={{alignSelf: 'center',}} 
                        />
                    </TouchableOpacity>
                )
                : (
                    <TouchableOpacity onPress={()=>pickImg()}>
                        <Thumbnail 
                            large 
                            source={require("../../Image/hello.png")} 
                            style={{alignSelf: 'center',}} 
                        />
                    </TouchableOpacity>
                )}
                <Text style={styles.userInfo}>{`이메일 : ${userEmail}`}</Text>
                <Text style={styles.userInfo}>{`이름 : ${userName}`}</Text>
                <Button 
                    block light
                    style={styles.button}
                    name={"updateBtn"}
                    ref={updateButton}
                    onPress={() => {
                        setClikedButton(updateButton.current.props.name)
                        setModalVisible((prev) => !prev)
                    }}
                >
                    <Text style={styles.buttonText}>정보수정 하기</Text>
                </Button>
                <Button 
                    block light
                    style={styles.button}
                    name={"withdrawalBtn"}
                    ref={withdrawalButton }
                    onPress={()=>{
                        Alert.alert(
                            '회원 탈퇴',
                            '정말 탈퇴하시겠습니까?',
                            [
                                {
                                    text: '취소',
                                    onPress: () => {
                                        return null;
                                    },
                                },
                                {
                                    text: '확인',
                                    onPress: () => {
                                        setClikedButton(withdrawalButton.current.props.name)
                                        setModalVisible((prev) => !prev)
                                    }
                                }
                            ]
                        )
                    }}
                >
                    <Text style={styles.buttonText}>회원 탈퇴</Text>
                </Button>
                <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    {clickedButton === 'updateBtn' ? 
                        (<UpdateUserInfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />): 
                        (<WithdrawalModal modalVisible={modalVisible} setModalVisible={setModalVisible} />)}
                </ModalComponent>
            </Content>
        </Container>
    )
}

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        margin: 20,
    },
    userInfo: {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'blue'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
})
