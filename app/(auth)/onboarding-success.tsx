import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OnboardingSuccessScreen() {
  const { docmentID } = useLocalSearchParams<{ docmentID: string }>();

  const handleContinue = () => {
    router.push({
      pathname: '/(tabs)',
      params: { docmentID }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons 
          name="check-circle" 
          size={80} 
          color="#4CAF50" 
          style={styles.icon}
        />
        
        <Text style={styles.title}>Onboarding Successful!</Text>
        <Text style={styles.subtitle}>
          Your account has been created successfully
        </Text>

        <View style={styles.docmentIDContainer}>
          <Text style={styles.docmentIDLabel}>Your DocmentID:</Text>
          <Text style={styles.docmentID}>{docmentID}</Text>
        </View>

        <Text style={styles.note}>
          Please save this DocmentID for future reference. You will need it to access your account.
        </Text>

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
        >
          Continue to Dashboard
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  docmentIDContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  docmentIDLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  docmentID: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    marginBottom: 30,
  },
}); 