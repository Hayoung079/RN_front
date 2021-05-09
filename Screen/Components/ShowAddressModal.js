import { Icon, Toast, Root } from 'native-base';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ShowAddressModal = ({modalVisible ,setModalVisible, walletAddress}) => { 

    const copyToClipboard = () => {
        Clipboard.setString(klaytnAddress);
        console.log('클립보드 저장')
        Toast.show({
            text: '클립보드에 저장되었습니다.',
            duration: 1500,
            type: 'success'
        })
    }

    return (
        <>
            {modalVisible ? (
            <Root>
                <View style={styles.modalContainer}>
                    <View style={styles.whiteBox}>
                        <View style={styles.head}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 80}}>내 주소</Text>
                            <Icon
                                type="AntDesign"
                                name="closecircleo"
                                style={{fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20}}
                                onPress={() => {setModalVisible(!modalVisible)}}
                            />
                        </View>
                        <Image 
                            style={styles.QR} 
                            source={require("../../Image/hello.png")}/>
                        <TouchableOpacity style={styles.addressButton} onPress={() => copyToClipboard() }>
                            <View style={{justifyContent: 'center', alignSelf: 'center', flexDirection: 'row'}}>
                                <Text style={styles.buttonText}>{walletAddress}</Text>
                                <Icon type="Feather" name="clipboard"  style={{color: '#fff', marginVertical: 13, fontSize: 23, marginLeft: 10}} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.notice}>
                            <Text style={{color: 'red'}}>- 주의사항1</Text>
                            <Text style={{color: 'gray'}}>- 주의사항2</Text>
                        </View>
                    </View>
                </View>
            </Root>
            ): null}
        </>
    )
}

export default ShowAddressModal;

const styles = StyleSheet.create({
    modalContainer: {
        position: 'relative',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 150,
        width: '80%',
        height: 400,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    whiteBox: {
        alignSelf: 'center',
        width: '100%',
        height: 400,
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
    QR: {
        alignSelf: 'center',
        width: '70%',
        height: '30%',
        resizeMode: 'contain',
    }, 
    addressButton: {
        marginTop: 10,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    buttonText: {
        width: '80%',
        textAlign: 'center',
        color: 'white',
        paddingVertical: 8,
        fontSize: 15,
    },
    notice: {
        alignSelf: 'center',
        width: '90%',
        fontSize: 10,
        marginTop: 20,
    },
})