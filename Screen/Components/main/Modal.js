import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';

const ModalComponent = ({ modalVisible, setModalVisible ,children }) => {
    return(
        <>
        {modalVisible ? (
            <Modal 
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.container}>
                    <View style={styles.blankView}>
                            {children}
                    </View>
                </View>
            </Modal>
        ): null}
        </>
    );
}

export default ModalComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blankView: {
        position: 'relative',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        opacity: 0.8,
    },  
})