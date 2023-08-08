/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
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
    backgroundColor: '#0000000',
  },
});

const Signup = () => {
  const [signupData, setSignupData] = useGlobalState('signupData');
  const [isLogin, setIsLogin] = useGlobalState('isLogin');
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
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'emails',
  });

  const onSubmit = data => {
    console.log('data start', data, 'data end');
    setSignupData(data);
  };
  const rules = {
    fullname: {
      required: true,
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Full Name should only contain letters',
      },
    },
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
    confirmpassword: {
      validate: (value: string) =>
        value === watch('password') || 'Passwords do not match',
      required: true,
      pattern: {
        value: /^.{8,}$/,
        message: 'Passwords must be at least 8 characters long',
      },

    },
  };
  useEffect(() => {
    const checkSubmitDisabled = () => {
      const formData = getValues();
      const requiredFields = Object.keys(rules);
      console.log('s', requiredFields, formData, '|||', errors);
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
        paddingVertical: 20,
        gap: 20,
      }}>
      <View style={{gap: 4}}>
        <Text style={{color: '#DDDDDD', fontSize: 32, fontWeight: 900}}>
          Hello,
        </Text>
        <Text style={{fontSize: 18, fontWeight: 700}}>Let's Signup</Text>
      </View>
      <ScrollView style={{gap: 16}} showsVerticalScrollIndicator={false}>
        <RHFTextInput
          index={-1}
          fields={fields}
          append={append}
          remove={remove}
          control={control}
          placeholder="Full Name"
          name="fullname"
          label="Full Name"
          rules={rules?.fullname}
          error={errors.fullname?.message}
        />
        <RHFTextInput
          index={-1}
          fields={fields}
          append={append}
          remove={remove}
          control={control}
          placeholder="Phone"
          name="phone"
          label="Phone"
        />
        <RHFTextInput
          index={-1}
          fields={fields}
          append={append}
          remove={remove}
          control={control}
          placeholder="Email"
          name="email"
          label="Email"
          error={errors.email?.message}
          rules={rules?.email}
        />
        {fields.map((field, index) => (
          <View key={field.id}>
            <RHFTextInput
              index={index}
              fields={fields}
              append={append}
              remove={remove}
              control={control}
              placeholder="secondary email"
              name={`emails[${0}].address`}
              defaultValue={field?.address}
              label="Email"
              error={errors?.[`emails[${0}].address`]?.message}
              rules={rules?.email}
            />
          </View>
        ))}
        <RHFTextInput
          index={-1}
          fields={fields}
          append={append}
          remove={remove}
          rules={rules?.password}
          control={control}
          placeholder="Password"
          name="password"
          label="Password"
          secureTextEntry={true}
          rules={rules?.password}
          error={errors.password?.message}
        />
        <RHFTextInput
          index={-1}
          fields={fields}
          append={append}
          remove={remove}
          control={control}
          placeholder="Comfirm Password"
          name="confirmpassword"
          label="Confirm Password"
          secureTextEntry={true}
          rules={rules?.confirmpassword}
          error={errors.confirmpassword?.message}
        />
        <RHFSwitch
          control={control}
          placeholder="Switch"
          name="switch"
          label="Switch"
        />
      </ScrollView>

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
            Signup
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
            Already a user?
          </Text>
          <TouchableOpacity
            onPress={() => setIsLogin(true)}
            style={{alignSelf: 'flex-start'}}>
            <Text style={{fontSize: 14, fontWeight: 700}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Signup;
