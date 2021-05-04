import { Button, Container, Content, Form, Icon, Input, Item, Label, Text } from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const WithdrawalModal = ({modalVisible ,setModalVisible}) => {
    const [userPassword, setUserPassword] = useState(null);

    //  사용자 비밀번호 인증하기
    const UserWithdrawal = () => {
        if (!userPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
    }

    let dataToSend = {user_password: userPassword};

    fetch('http://192.168.2.110:3001/user/auth-password', {
        method: 'POST',
        body: dataToSend,
        headers: {
            'Content-Type' :
            'application/json;charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('사용자 비밀번호 인증: ')
        console.log(responseJson)
    })

    return(
        <>
            {modalVisible ? (
            <Container style={styles.modalContainer}>
                <Content style={styles.whiteBox}>
                    <Icon
                        type="AntDesign"
                        name="closecircleo"
                        style={{fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20}}
                        onPress={() => {setModalVisible(!modalVisible)}}
                    />
                    <Form onSubmit={UserWithdrawal}>
                        <Item stackedLabel>
                            <Label>비밀번호를 입력해주세요.</Label>
                            <Input onChangeText={(userPassword) => setUserPassword(userPassword)} />
                        </Item>
                        <Button rounded>
                            <Text>확인</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
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
        marginVertical: 20,
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    whiteBox: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
})