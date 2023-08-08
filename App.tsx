/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Signup from './src/screens/Signup';
import {useGlobalState} from './src/Strore';
import Login from './src/screens/Login';
function App(): JSX.Element {
  const [isLogin,setIsLogin] = useGlobalState('isLogin')
  const [signupData, setSignupData] = useGlobalState('signupData');
  return (
    <SafeAreaView>
      <SafeAreaView>
        {isLogin || (signupData && Object.keys(signupData)?.length > 0) ? <Login /> : <Signup />}
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default App;
