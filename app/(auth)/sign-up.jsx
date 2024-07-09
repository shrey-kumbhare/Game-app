import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, StyleSheet } from "react-native";
import FormField from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User signed up successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      router.replace("/home");
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Sign Up  
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={styles.formFieldMargin}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formFieldMargin}
            inputMode="email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formFieldMargin}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={styles.buttonMargin}
            isLoading={isSubmitting}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Have an account already?
            </Text>
            <Link href="/sign-in" style={styles.footerLink}>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#0A0A0A', 
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    minHeight: Dimensions.get('window').height - 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 40,
  },
  formFieldMargin: {
    marginTop: 28,  
  },
  buttonMargin: {
    marginTop: 28,  
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 18,
    color: '#A9A9A9',   
  },
  footerLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6F61',  
  },
});

export default SignUp;
