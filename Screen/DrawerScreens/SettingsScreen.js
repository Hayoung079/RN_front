// Import React and Component
import React from 'react';
import { Container, Content,ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = (props) => {
  return (
    <Container>
    <Content>
      <TouchableOpacity onPress={() => props.navigation.navigate('UserInfoScreen')}>
        <ListItem icon>
          <Left>
            <Icon active type="AntDesign" name="user" />
          </Left>
          <Body>
            <Text>내 정보 설정</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      </TouchableOpacity>
    </Content>
  </Container>
  );
};

export default SettingsScreen;