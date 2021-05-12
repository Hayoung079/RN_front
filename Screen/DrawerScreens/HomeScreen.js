// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '../Components/main/Modal';
import ShowAddressModal from '../Components/ShowAddressModal';
import { Icon } from 'native-base';

const HomeScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] =useState('');
    const [LoginUserID, setLoginUserID] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    
    const GetReady = async() => {
        await AsyncStorage.getItem('authorization').then((value) => {
            if(value !== null) {
                fetch('http://192.168.2.110:3001/user/profile', {
                    method: 'GET',
                    headers: {
                        'authorization' : value,
                        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    setLoginUserID(responseJson.ID);
                    setUserName(responseJson.user_name);
                })
                .catch((err) => console.log(err))
            }
        })

        await AsyncStorage.getItem('klaytn').then((value) =>{
            if(value !== null) {
                const klaytnStorage = JSON.parse(value);
                console.log(`klaytnStorage : ${JSON.stringify(klaytnStorage)}`)
    
                for(const [key, value] of Object.entries(klaytnStorage)) {
                    const StoredKlaytnID = value.klaytnID;
                    const StoredKlaytnAddress = value.klaytnAddress;
                    
                    if(LoginUserID === StoredKlaytnID) {
                        setWalletAddress(StoredKlaytnAddress)
                        console.log(`월렛 주소 등록 성공`)
                        break;
                    }
                }
            }
        })
    }; 
    GetReady()

    const setKlaytn = async(currentKlaytn) => {
        await AsyncStorage.getItem('klaytn').then((value) => {
            if(value !== null) {
                const klaytnStorage = JSON.parse(value);
                const arrayPlus = [...klaytnStorage, currentKlaytn]
                AsyncStorage.setItem('klaytn', JSON.stringify(arrayPlus));
            }else{
                const klaytnStorage = [];
                const arrayPlus = [...klaytnStorage, currentKlaytn]
                AsyncStorage.setItem('klaytn', JSON.stringify(arrayPlus));
            }
        })
    }; 

    const openModal = async() => {
        await AsyncStorage.getItem('authorization').then((value) => {
            if(walletAddress === null) {
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
                            onPress: () => createKlaytn(value),
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
                        console.log('지갑 조회 성공')
                        setModalVisible((prev) => !prev)
                    }
                })
                .catch((err) => console.log(err))
            }
        })
    };

    const createKlaytn = (value) => {
        fetch('http://192.168.2.110:3001/kas/account', {
            method: 'POST',
            headers: {
                'authorization' : value,
            },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.address) {
                    console.log('지갑생성 성공 ==>' + responseJson.address)
                    
                    const currentKlaytn = {
                        klaytnID: responseJson.user_id,
                        klaytnAddress: responseJson.address
                    }  
                    setKlaytn(currentKlaytn);
                    setModalVisible((prev) => !prev)
                    Alert.alert('지갑생성', '지갑을 성공적으로 생성하였습니다.')
                }
            })
            .catch((err) => console.log(err))
    };

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.flex_row}>
                <View style={styles.flex_column}>
                    <Text style={styles.headTitle}>
                        {userName !== null ? (`${userName}님,${"\n"}안녕하세요.`): "안녕하세요."}
                    </Text>
                    <TouchableOpacity 
                        style={styles.modalButton}
                        onPress={openModal}>
                        <Text style={styles.buttonText}>{walletAddress !== null ? '내 주소보기' : '지갑 만들기'}</Text>
                    </TouchableOpacity>
                    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                        <ShowAddressModal modalVisible={modalVisible} setModalVisible={setModalVisible} walletAddress={walletAddress}/>
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
                    <Image source={require("../../Image/klaytn.png")} style={styles.tokenImage}></Image>
                    <Text style={{paddingLeft: 200}}>0 KLAY{"\n"}( = 0 KRW)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tokenItems}>
                    <Icon type='AntDesign' name='pluscircleo' style={styles.tokenImage} />
                    <Text style={{paddingLeft: 160, marginVertical: 5}}>토큰을 추가하세요.</Text>
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
    modalButton: {
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
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        height: 60,
        width: '95%',
        marginTop: 5,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#e8e8e8',
    },
    tokenImage: {
        width: 30, 
        height: 30, 
        marginVertical: 5, 
        marginLeft: 20
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