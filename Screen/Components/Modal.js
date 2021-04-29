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
                        <View style={styles.modalContainer}>
                            {children}
                        </View>
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
    modalContainer: {
        position: 'relative',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '80%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
})