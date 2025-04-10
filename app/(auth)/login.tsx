import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { signInWithPhone, verifyOTP } = useAuth();

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const cleaned = input.replace(/\D/g, '');
    
    // Add +91 prefix if it's an Indian number
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    return input;
  };

  const handlePhoneChange = (text: string) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (cleaned.length <= 10) {
      setPhone(cleaned);
    }
  };

  const handleSendOTP = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);

    try {
      setLoading(true);
      await signInWithPhone(formattedPhone);
      setOtpSent(true);
      Alert.alert('Success', 'OTP has been sent to your phone');
    } catch (error: any) {
      console.error('Error details:', error);
      Alert.alert(
        'Error', 
        error.message || 'Failed to send OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);

    try {
      setLoading(true);
      await verifyOTP(formattedPhone, otp);
      // Check if user exists in database to determine if they need KYC
      // For now, we'll assume all users need KYC
      router.push('/(auth)/kyc');
    } catch (error: any) {
      console.error('Error details:', error);
      Alert.alert(
        'Error', 
        error.message || 'Invalid OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkipAuth = () => {
    // Skip authentication and go directly to KYC
    router.push('/(auth)/kyc');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Docment.ai</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>
      
      <View style={styles.phoneInputContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.countryCodeText}>+91</Text>
        </View>
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handlePhoneChange}
          style={styles.phoneInput}
          disabled={otpSent}
          placeholder="Enter 10-digit mobile number"
          maxLength={10}
        />
      </View>

      {otpSent && (
        <TextInput
          label="OTP"
          mode="outlined"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          style={styles.input}
          maxLength={6}
        />
      )}

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={otpSent ? handleVerifyOTP : handleSendOTP}
            style={styles.button}
          >
            {otpSent ? 'Verify OTP' : 'Send OTP'}
          </Button>
          
          <Button
            mode="outlined"
            onPress={handleSkipAuth}
            style={styles.skipButton}
          >
            Skip Authentication (Dev)
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCode: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: -1,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#666',
  },
  phoneInput: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    marginTop: 10,
  },
  skipButton: {
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
}); 