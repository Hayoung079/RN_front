import { Button, Container, Content, Text, Thumbnail } from 'native-base';
import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';

import ModalComponent from '../Components/main/Modal';
import UserInfoModal from '../Components/UserInfoModal';
import WithdrawalModal from '../Components/WithdrawalMadal';

const UserInfoScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Container style={styles.container}>
            <Content style={styles.content}>
                <Thumbnail 
                    large 
                    source={require('../../Image/hello.png')} 
                    style={styles.thumbnail} 
                />
                <Text style={styles.userName}>{"userName"}</Text>
                <Button 
                    block light
                    style={styles.button}
                    onPress={() => setModalVisible((prev) => !prev)}
                >
                    <Text style={styles.buttonText}>정보수정 하기</Text>
                </Button>
                <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <UserInfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </ModalComponent>
                <Button 
                    block light
                    style={styles.button}
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
                    <WithdrawalModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
    thumbnail: {
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
    },
    userName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        
    },
    buttonText: {
        fontSize: 13,
    },
})
