// Import React and Component
import React, { useState } from 'react';
import {
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    Alert 
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ModalComponent from '../Components/main/Modal';
import ShowAddressModal from '../Components/ShowAddressModal';

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] =useState(null);
    const [klaytnAddress, setklaytnAddress] = useState(null);
    
    const GetUserData = async() => {
        try {
            user_name = await AsyncStorage.getItem('user_name')
            user_klaytnAddress = await AsyncStorage.getItem('klaytnAddress')
            
            if(user_name !== null || user_klaytnAddress !== null) {
                setklaytnAddress(user_klaytnAddress); 
                setUserName(user_name);
            }
        } catch (error) {
            console.log(error)
        }
    }  
    
    GetUserData();
    console.log(`userName: ${userName}, klaytnAddress: ${klaytnAddress}`)

    const openModal = () => {
        // 로그인 토큰을 API로 보내기
        AsyncStorage.getItem('authorization').then((value) => {
            if(klaytnAddress == null) {
                Alert.alert(
                    '지갑생성',
                    '정말 지갑을 생성하시겠습니끼?',
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
                                fetch('http://192.168.2.110:3001/kas/account', {
                                    method: 'POST',
                                    headers: {
                                        'authorization' : value,
                                    },
                                })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    if(responseJson.address) {
                                        console.log('지갑 생성 : ' +responseJson.address)
                                        console.log('지갑생성 성공')
                                        // 스토리지에 저장
                                        AsyncStorage.setItem('klaytnAddress', responseJson.address)
                                        setModalVisible((prev) => !prev)
                                        Alert.alert('지갑생성', '지갑을 성공적으로 생성하였습니다.')
                                    }
                                })
                                .catch((err) => console.log(err))
                            },
                        },
                    ],
                    {cancelable: false},
                );
            }else {
                fetch('http://192.168.2.110:3001/kas/account/address', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.address) {
                        console.log('지갑 조회 : ' + responseJson.address)
                        console.log('지갑 조회 성공')
                        setModalVisible((prev) => !prev)
                    }
                })
                .catch((err) => console.log(err))
            }
        })
    };

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.flex_row}>
                <View style={styles.flex_column}>
                    <Text style={styles.headTitle}>{userName}님,{"\n"}안녕하세요.</Text>
                    <TouchableOpacity 
                        style={styles.headButton}
                        onPress={openModal}>
                        <Text style={styles.buttonText}>{klaytnAddress !== null ? '내 주소보기' : '지갑 만들기'}</Text>
                    </TouchableOpacity>
                    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                        <ShowAddressModal modalVisible={modalVisible} setModalVisible={setModalVisible} klaytnAddress={klaytnAddress}/>
                    </ModalComponent>
                </View>
                <Image 
                    source={require('../../Image/hello.png')} 
                    style={{
                        width: '50%',
                        height: 100,
                        resizeMode: 'contain',
                        marginTop: 30,
                    }}/> 
            </View>

            <View style={styles.flex_column}>
                <View style={styles.flex_row}>
                    <Text style={styles.tokenTitle}>나의 토큰</Text>
                    <TouchableOpacity style={{paddingLeft: 250}}>
                        <Text>전제보기</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.tokenItems}>
                    <Text>클레이튼 이미지</Text>
                    <Text style={{paddingLeft: 200}}>0 KLAY{"\n"}( = 0 KRW)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tokenItems}>
                    <Text>플러스 이미지</Text>
                    <Text style={{paddingLeft: 160}}>토큰을 추가하세요.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tokenButton}>
                    <Text style={styles.buttonText}>토큰 보내기</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardView}>
                <View style={styles.flex_row}>
                    <Text style={styles.tokenTitle}>최근 받은 카드</Text>
                    <TouchableOpacity style={{paddingLeft: 225}}>
                        <Text>전제보기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.flex_row}>
                    <TouchableOpacity style={styles.cardItems}>
                        <Text style={{color: 'black', alignSelf:'center', fontSize: 16}}>카드1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardItems}>
                        <Text style={{color: 'black', alignSelf:'center', fontSize: 16}}>카드2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardItems}>
                        <Text style={{color: 'black', alignSelf:'center', fontSize: 16}}>카드3</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    flex_row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
    },
    flex_column: {
        flex: 1,
        width: '100%',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignSelf: 'center'
    },
    myTokenView: {
        flex: 1,
    },
    cardView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headTitle: {
        paddingLeft: 20,
        marginTop: 50,
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
    },
    headButton: {
        height: 40,
        width: '100%',
        backgroundColor: 'blue',
        borderRadius: 30,
        marginLeft: 15, 
        marginBottom: 45,
    },
    tokenTitle: {
        paddingLeft: 15,
        marginBottom: 15,
        fontSize: 15,
        fontWeight: 'bold',
    },
    tokenItems: { 
        flexDirection:'row',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 60,
        width: '95%',
        marginTop: 5,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#e8e8e8',
    },
    tokenButton: {
        marginTop: 5,
        marginBottom: 30,
        height: 55,
        width: '95%',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    cardItems: {
        height: 150,
        width: '30%',
        marginHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#e8e8e8',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        paddingVertical: 8,
        fontSize: 16,
    },
});