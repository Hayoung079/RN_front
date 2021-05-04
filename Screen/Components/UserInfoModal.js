import { Button, Container, Content, Form, Icon, Input, Item, Label, Text } from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const UserInfoModal = ({modalVisible ,setModalVisible}) => {
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
        console.log(formBody)

        // 사용자 정보 수정  API 연결
        fetch('http://192.168.2.110:3001/user/update', {
            method: 'PATCH',
            body: formBody,
            headers: {
                'Content-Type' :
                'application/json;charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('사용자 정보 업데이트: ')
            console.log(responseJson)
        })
    }

    return (
        <>
            {modalVisible ? (
                <Container style={styles.modalContainer}>
                    <Content style={styles.whiteBox}>
                        <Icon
                            type="AntDesign"
                            name="closecircleo"
                            // style={styles.Xbutton}
                            onPress={() => {setModalVisible(!modalVisible)}}
                        />
                        <Form onSubmit={ChangeUserInfo}>
                            <Item floatingLabel>
                                <Label>이름</Label>
                                <Input onChangeText={(userName) => setUserName(userName)} />
                            </Item>
                            <Item floatingLabel last>
                                <Label>비밀번호</Label>
                                <Input onChangeText={(userPassword) => setUserPassword(userPassword)}/>
                            </Item>
                            <Button info>
                                <Text>수정</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            ) : null}
        </>
    )
}

export default UserInfoModal;

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