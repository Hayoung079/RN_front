import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ShowAddressModal = ({modalVisible ,setModalVisible}) => { 
    return (
        <>
            {modalVisible ? (
                <View style={styles.whiteBox}>
                    <View style={styles.head}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 80}}>내 주소</Text>
                    <Icon
                        name="closecircleo"
                        style={{fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20}}
                        onPress={() => {setModalVisible(!modalVisible)}}
                    />
                </View>
                <Image 
                    style={styles.QR} 
                    source={require("../../Image/hello.png")}/>
                <TouchableOpacity style={styles.addressButton}>
                    <Text style={styles.buttonText}>주소|복사</Text>
                </TouchableOpacity>
                <View style={styles.notice}>
                    <Text style={{color: 'red'}}>- 주의사항1</Text>
                    <Text style={{color: 'gray'}}>- 주의사항2</Text>
                    <TouchableOpacity style={styles.noticeButton}>
                        <Text style={styles.buttonText}>안내버튼</Text>
                    </TouchableOpacity>
                </View>
                </View>
            ): null}
        </>
    )
}

export default ShowAddressModal;

const styles = StyleSheet.create({
    whiteBox: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    head: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-end'
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
        height: 40,
        width: '90%',
        backgroundColor: 'blue',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        paddingVertical: 8,
        fontSize: 15,
    },
    notice: {
        alignSelf: 'center',
        // backgroundColor: 'gray',
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