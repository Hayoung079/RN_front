import React, { useState } from 'react';
import {View, Modal, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ShowAddress = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Modal style={styles.modalView}>
            <View style={styles.modalTitle}>
                <Text>내 주소</Text>
                <Icon.Button
                    name="closecircleo"
                    backgroundColor="#e8e8e8"
                    onPress={() => setModalVisible(!modalVisible)}/>
            </View>
            <Image 
                style={styles.QR} 
                source={require("../../Images/QR.png")}/>
            <TouchableOpacity style={styles.addressButton}>
                <Text style={styles.buttonText}>주소|복사</Text>
            </TouchableOpacity>
            <View style={styles.notice}>
                <Text style={{color: 'red'}}>- 주의사항1</Text>
                <Text style={{color: 'lightgray'}}>- 주의사항2</Text>
                <TouchableOpacity style={styles.noticeButton}>
                    <Text>안내버튼</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ShowAddress;

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        width: '70%',
        height: '80%',
    },
    modalTitle: {
        fontSize: 12,
        fontWeight: 'blod'
    },
    QR: {
        width: '70%',
        height: 150,
        resizeMode: 'contain',
        marginTop: 30,
    }, 
    addressButton: {
        height: 40,
        width: '100%',
        backgroundColor: 'blue',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        paddingVertical: 8,
        fontSize: 16,
    },
    notice: {
        alignSelf: 'left',
        fontSize: 10,
    },
    noticeButton: {
        height: 20,
        width: '30%',
        backgroundColor: 'blue',
        borderRadius: 30,
    },
})