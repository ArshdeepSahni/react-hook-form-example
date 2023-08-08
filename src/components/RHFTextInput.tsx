import {Controller, DeepMap, FieldValues} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import {Control, FieldError} from 'react-hook-form';

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface RHFTextInputProps extends TextInputProps {
  control: ReturnType<typeof useForm>['control'];
  error?: FieldError;
  placeholder?: string;
  on_blur?: () => void;
  style?: ViewStyle;
  name: string;
  secureTextEntry?: boolean;
  rules?: Record<string, any>;
  label?: string;
  append?: () => void;
  remove?: (index: number) => void;
  index?: number;
  fields?: any[];
  dirtyFields: DeepMap<FieldValues, true>;
  errors: DeepMap<FieldValues, FieldError>;
}

const RHFTextInput: React.FC<RHFTextInputProps> = ({
  control,
  error,
  placeholder,
  style,
  name,
  secureTextEntry,
  rules,
  label,
  append,
  remove,
  index,
  dirtyFields,
  errors,
  ...props
}) => {
  const [val, setVal] = useState(' ');
  const [hide, setHide] = useState(secureTextEntry);

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
          }}>
          <Text
            style={{
              fontSize: 14,
              alignSelf: 'flex-start',
            }}>
            {label} {index + 1 > 0 && index + 1}
          </Text>
          {rules?.required && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 700,
                alignSelf: 'flex-start',
                color: 'red',
              }}>
              *
            </Text>
          )}
        </View>
      </View>
      <View style={styles.input}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              {...{...props}}
              {...control.register(name, error && error.message)} // Register field with validation error
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={(val) => {onChange(val);setVal(val)}}
              value={value}
              textContentType="oneTimeCode"
              defaultValue=""
              secureTextEntry={hide}
              style={{
                height: 20,
                flex: 1,
                ...style,
              }}
            />
          )}
          name={name}
          rules={rules}
        />
        {dirtyFields?.email &&
          !errors?.email &&
          label == 'Email' &&
          name == 'email' && (
            <TouchableOpacity onPress={() => append({address: ''})}>
              <Text style={{fontWeight: 700}}>+</Text>
            </TouchableOpacity>
          )}
        {name?.includes('.address') && (
          <TouchableOpacity onPress={() => remove(index)}>
            <Text style={{fontWeight: 700, color: 'red'}}>-</Text>
          </TouchableOpacity>
        )}
        {name?.toLowerCase()?.includes('password') && (
          <TouchableOpacity onPress={() => setHide(state => !state)}>
            <Text style={{color: '#999999'}}>{hide ? 'show' : 'hide'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        {rules?.required && val?.length === 0 ? (
          <Text style={{color: 'red'}}>This field is required</Text>
        ) : error ? (
          <Text style={{color: 'red'}}>{error}</Text>
        ) : (
          <Text style={{color: 'red'}} />
        )}
      </View>
    </View>
  );
};
export default RHFTextInput;
