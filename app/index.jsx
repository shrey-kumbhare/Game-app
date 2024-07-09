import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton'; 
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const Index = () => {
  const router = useRouter();
  const handleButtonPress = () => {
    router.push('/sign-in');
  };

  const {loading,isLogged}=useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.relativeContainer}>
            <Text style={styles.title}>
              Discover The App
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={handleButtonPress}
              containerStyles={styles.buttonContainer}
              textStyles={styles.buttonText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5', // Example background color
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '85vh', // Adjust as per your requirement
    paddingHorizontal: 20,
  },
  relativeContainer: {
    position: 'relative',
    marginTop: 20,
  },
  title: {
    color: '#2D3C55',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#2D3C55',
    borderRadius: 12,
    minHeight: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default Index;
