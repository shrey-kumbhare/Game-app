import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, StyleSheet } from "react-native";


import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            Log in 
          </Text>

          <FormFeild
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 28 }}
            keyboardType="email-address"
          />

          <FormFeild
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 28 }}
          />

          <CustomButton
            title="Sign In"
            // handlePress={submit}
            containerStyles={{ marginTop: 28 }}
            // isLoading={isSubmitting}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>
            <Link href="/sign-up" style={styles.signupLink}>
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',  
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    minHeight: Dimensions.get("window").height - 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 40,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',  
    marginLeft: 4,
  },
});

export default SignIn;
