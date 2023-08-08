/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import RHFTextInput from '../components/RHFTextInput';
import RHFSwitch from '../components/RHFSwitch';
import {useGlobalState} from '../Strore';

const styles = StyleSheet.create({
  cta: {
    height: 40,
    display: 'flex-row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
  },
});

const Login = () => {
  const [isLogin, setIsLogin] = useGlobalState('isLogin');
  const [signupData, setSignupData] = useGlobalState('signupData');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState();
  const {
    control,
    handleSubmit,
    formState,
    watch,
    isValid,
    isSubmitting,
    getValues,
  } = useForm({
    defaultValues: {
      fullname: '',
      phone: '',
      email: '',
      password: '',
      confirmpassword: '',
      switch: false,
    },
  });
  const {dirtyFields, isDirty, errors} = formState;
  const onSubmit = data => {
    if (
      data?.email?.toLowerCase() === signupData?.email?.toLowerCase() &&
      data?.password === signupData?.password
    ) {
      alert('success');
    } else {
      alert('failed');
    }
  };
  const rules = {
    email: {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      required: true,
      pattern: {
        value: /^.{8,}$/,
        message: 'Password must be at least 8 characters long',
      },
    },
  };
  useEffect(() => {
    const checkSubmitDisabled = () => {
      const formData = getValues();
      const requiredFields = Object.keys(rules);
      console.log('s', requiredFields, formData);
      setIsSubmitDisabled(
        requiredFields.some(field => !formData[field]) ||
          Object.keys(errors)?.length > 0,
      );
    };

    checkSubmitDisabled();

    // return control?.register?.('fullName', {
    //   required: 'Full Name is required',
    // }) || control?.register?.('email', {
    //   required: 'Email is required',
    //   pattern: {
    //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //     message: 'Invalid email address',
    //   },
    // });
  }, [formState, control, getValues]);
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 80,
      }}>
      <View style={{gap: 4}}>
        <Text style={{color: '#DDDDDD', fontSize: 32, fontWeight: 900}}>
          Welcome back,
        </Text>
        <Text style={{fontSize: 18, fontWeight: 700}}>Let's Login</Text>
      </View>
      <View style={{gap: 16}}>
        <RHFTextInput
          control={control}
          placeholder="Email"
          name="email"
          label="Email"
          error={errors.email?.message}
          rules={rules?.email}
        />
        <RHFTextInput
          rules={rules?.password}
          control={control}
          placeholder="Password"
          name="password"
          label="Password"
          secureTextEntry={true}
          rules={rules?.password}
          error={errors.password?.message}
        />
      </View>

      <View style={{gap: 16}}>
        <TouchableHighlight
          disabled={isSubmitDisabled}
          onPress={() => handleSubmit(onSubmit)()}
          style={[
            styles.cta,
            {
              backgroundColor: isSubmitDisabled
                ? '#DDDDDD'
                : styles.cta.backgroundColor,
            },
          ]}>
          <Text style={{textAlign: 'center', fontWeight: 700, color: 'white'}}>
            Login
          </Text>
        </TouchableHighlight>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 14,
              alignSelf: 'flex-start',
              color: '#999999',
            }}>
            New user?
          </Text>
          <TouchableOpacity
            onPress={() => setIsLogin(false)}
            style={{alignSelf: 'flex-start'}}>
            <Text style={{fontSize: 14, fontWeight: 700}}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Login;
