// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, padding: 16}}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 16,
                        }}>
                        홈화면 입니다.
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    안녕
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    footer
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;