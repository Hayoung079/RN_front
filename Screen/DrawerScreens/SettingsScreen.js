// Import React and Component
import React from 'react';
import {View, Text, StyleSheets} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    return (    
        <View>
            <View>
                <Text>개인 설정</Text>
            </View>
            <View>
                <Text>비밀번호 변경</Text>
            </View>
            <View>
                <Text>지갑 만들기</Text>
            </View>
            <View>
                <Text>지갑 연결</Text>
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({

})