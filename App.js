import React from 'react';

// 어떤 뷰를 왼쪽 오른쪽으로 swipe하면 새로운 뷰가 보이게
import 'react-native-gesture-handler';

// navigator : 화면 간 전환 및 탐색 기록 관리 라이브러리
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// 스크린
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerScreens/DrawerNavigationRoutes';
import SettingsNavigarionRoutes from './Screen/settingScreens/SettingsNavigation';

// Stack : 화면 전환시 이전 화면 현재화면 뒤에 쌓이는 것
const Stack = createStackNavigator();

// Stack Navigator
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen  //첫 번째 화면
        name="LoginScreen"
        component={LoginScreen} // 컴포넌트
        options={{headerShown: false}} // 헤더 안 보이게
      />
      <Stack.Screen //두 번째 화면
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Regiser', // 헤더 타이틀
          headerStyle: {
            backgroundColor: '#307ecc', // 헤더 color
          },
          headerTintColor: '#fff', // 헤더 text color
          headerTitleStyle: {
            fontWeight: 'bold', // 헤더 text 스타일
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      {/* SplashScreen : 앱 실행시 나타나는 로딩 페이지  */}
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        {/* Auth Navigator : 로그인 회원가입 */}
        <Stack.Screen
          name='Auth'
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer : 드롭메뉴 같은 것 */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsNavigarionRoutes"
          component={SettingsNavigarionRoutes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;