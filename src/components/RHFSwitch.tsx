/* eslint-disable @typescript-eslint/no-unused-vars */

import {Controller} from 'react-hook-form';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const RHFSwitch = ({
  control,
  error,
  placeholder,
  on_blur,
  on_change_text,
  val,
  style,
  name,
  secureTextEntry,
  ...props
}) => {
  const [hide, setHide] = useState(secureTextEntry);
  return (
    <View>
      <View style={styles.input}>
        <Text style={{marginBottom: 8}}>{name}</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Switch
              value={value}
              onValueChange={val => onChange(val)}
              trackColor={{false: '#767577', true: '#DADAFF'}}
              thumbColor={value ? '#A9A8F7' : '#f4f3f4'}
            />
          )}
          name={name}
        />
      </View>
      {error && <Text style={{color: 'red'}}>This is required.</Text>}
    </View>
  );
};
export default RHFSwitch;
