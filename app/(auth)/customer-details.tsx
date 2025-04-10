import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function CustomerDetailsScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    panNumber: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDocmentID = () => {
    const prefix = 'DMNT';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.panNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      const docmentID = generateDocmentID();

      // First check if the DocmentID already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('docment_id')
        .eq('docment_id', docmentID)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw checkError;
      }

      if (existingUser) {
        // If DocmentID exists, generate a new one
        return handleSubmit(); // Recursive call with new DocmentID
      }

      // Save to Supabase
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            docment_id: docmentID,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            pan_number: formData.panNumber,
            kyc_status: 'pending',
            kyc_date: new Date().toISOString(),
          }
        ]);

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw insertError;
      }

      // Navigate to success screen with DocmentID
      router.push({
        pathname: '/(auth)/onboarding-success',
        params: { docmentID }
      });

    } catch (error: any) {
      console.error('Error details:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to save customer details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Customer Details</Text>
        <Text style={styles.subtitle}>Please provide your information</Text>

        <TextInput
          label="Full Name *"
          mode="outlined"
          value={formData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
          style={styles.input}
        />

        <TextInput
          label="Phone Number *"
          mode="outlined"
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <TextInput
          label="PAN Number *"
          mode="outlined"
          value={formData.panNumber}
          onChangeText={(text) => handleChange('panNumber', text)}
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
          >
            Submit Details
          </Button>
        )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
}); 