import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Controller, useWatch } from 'react-hook-form'

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <>
          <View style={[{ borderColor: error ? 'red' : '#e8e8e8' }]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              className='border border-gray-300 focus:border focus:border-blue-400 rounded-2xl p-4'
            />
          </View>
          {error && (
            <Text className='text-red-500 text-xs mt-1'>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  input: {}
})

export default CustomInput
