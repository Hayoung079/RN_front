// Import React and Component
import React from 'react';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = () => {
  return (
    <Container>
    <Content>
      <TouchableOpacity>
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
      <TouchableOpacity>
        <ListItem icon>
          <Left>
            <Icon active type="AntDesign" name="lock" />
          </Left>
          <Body>
            <Text>비밀번호 변경</Text>
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