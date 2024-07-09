import React, { useState } from "react";
import { View, Text, TextInput,  Pressable, StyleSheet } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = {},
  ...props
}) => {

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password"}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, 
  },
  title: {
    fontSize: 16, 
    color: '#D3D3D3', 
  },
  inputContainer: {
    width: '100%',
    height: 64, 
    paddingHorizontal: 16, 
    backgroundColor: '#1C1C1E', 
    borderRadius: 16, 
    borderWidth: 2,
    borderColor: '#2C2C2E', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF', 
    fontSize: 16, 
  },
  icon: {
    width: 24, 
    height: 24, 
  },
});

export default FormField;
