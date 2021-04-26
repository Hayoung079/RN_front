// Import React and Component
import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    AsyncStorage.getItem('user_name').then((value) => {
        
    });

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.headView}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={styles.headTitle}>{"user_name"}님,{"\n"}안녕하세요.</Text>
                    <TouchableOpacity style={styles.headButton}>
                        <Text style={styles.buttonText}>내 주소 보기</Text>
                    </TouchableOpacity>
                </View>
                {/* <Image 
                 /> 오른쪽에 이미지 넣기 */}
            </View>

            <View style={styles.myTokenView}>
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
                    <Text style={{paddingLeft: 180}}>토큰을 추가하세요.</Text>
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
                        <Text style={styles.buttonText}>카드1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardItems}>
                        <Text style={styles.buttonText}>카드2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardItems}>
                        <Text style={styles.buttonText}>카드3</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    headView: {
        flex: 3,
        flexDirection: 'column',
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
        backgroundColor: 'blue',
        borderRadius: 30,
        borderStyle: 'solid',
        marginLeft: 15, 
        marginRight: 255,
        marginBottom: 45,
    },
    tokenTitle: {
        paddingLeft: 15,
        marginBottom: 15,
        fontSize: 15,
        fontWeight: 'bold',
    },
    tokenItems: {
        flex: 2, 
        flexDirection:'row',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        height: 60,
        width: '95%',
        marginTop: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
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
        color: 'black',
        alignSelf: 'center',
        paddingVertical: 8,
        fontSize: 16,
    },
    flex_row: {
        // flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignSelf: 'center'
    },
    flex_column: {
        // flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignSelf: 'center'
    }
});