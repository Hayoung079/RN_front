import { Icon } from 'native-base';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ShowAddressModal = ({modalVisible ,setModalVisible, klaytnAddress}) => { 

    const copyToClipboard = () => {
        Clipboard.setString(klaytnAddress);
        console.log('클립보드 저장')
    }

    return (
        <>
            {modalVisible ? (
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
                    <TouchableOpacity style={styles.addressButton} onPress={() => copyToClipboard()}>
                        <Text style={styles.buttonText}>{klaytnAddress}</Text>
                        <Icon type="Feather" name="clipboard" />
                    </TouchableOpacity>
                    <View style={styles.notice}>
                        <Text style={{color: 'red'}}>- 주의사항1</Text>
                        <Text style={{color: 'gray'}}>- 주의사항2</Text>
                        <TouchableOpacity style={styles.noticeButton}>
                            <Text style={styles.buttonText}>안내버튼</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
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
        marginVertical: 20,
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    whiteBox: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    QR: {
        alignSelf: 'center',
        width: '70%',
        height: '30%',
        resizeMode: 'contain',
    }, 
    addressButton: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center',
        width: '90%',
        height: '13%',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        padding: 8,
        fontSize: 15,
    },
    notice: {
        alignSelf: 'center',
        width: '90%',
        fontSize: 10,
        marginTop: 20,
    },
    noticeButton: {
        width: '30%',
        backgroundColor: 'blue',
        borderRadius: 10,
        marginTop: 10,
    },
})