import { Button, Container, Content, Text, Thumbnail } from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';

import ModalComponent from '../Components/main/Modal';
import UserInfoMadal from '../Components/UserInfoModal';
import WithdrawalMadal from '../Components/WithdrawalMadal';

const UserInfoScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Container style={{flex: 1}}>
            <Content style={styles.content}>
                <Thumbnail large source={require('../../Image/hello.png')}/>
                <Text>{"userName"}</Text>
                <Button block light onPress={setModalVisible(true)}>
                    <Text>정보수정 하기</Text>
                </Button>
                <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <UserInfoMadal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </ModalComponent>
                <Button block light onPress={
                    Alert.alert(
                        '회원 탈퇴',
                        '정말 탈퇴하시겠습니까?'
                    )
                }>
                    <Text>회원 탈퇴</Text>
                </Button>
                <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <WithdrawalMadal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </ModalComponent>
            </Content>
        </Container>
    )
}

export default UserInfoScreen;

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent : 'center',
        alignContent: 'center' 
    },
})
