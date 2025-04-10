import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function KYCStatusScreen() {
  const { status } = useLocalSearchParams<{ status: 'verified' | 'failed' | 'pending' }>();

  const getStatusDetails = () => {
    switch (status) {
      case 'verified':
        return {
          icon: 'check-circle',
          color: '#4CAF50',
          title: 'KYC Verified',
          message: 'Your KYC verification has been completed successfully.',
        };
      case 'failed':
        return {
          icon: 'error',
          color: '#F44336',
          title: 'Verification Failed',
          message: 'We couldn\'t verify your details. Please try again or contact support.',
        };
      case 'pending':
        return {
          icon: 'hourglass-empty',
          color: '#FF9800',
          title: 'Verification Pending',
          message: 'Your KYC verification is in progress. We\'ll notify you once it\'s complete.',
        };
      default:
        return {
          icon: 'error',
          color: '#F44336',
          title: 'Error',
          message: 'Invalid status',
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={statusDetails.icon as any}
        size={100}
        color={statusDetails.color}
        style={styles.icon}
      />
      <Text style={styles.title}>{statusDetails.title}</Text>
      <Text style={styles.message}>{statusDetails.message}</Text>
      
      <Button
        mode="contained"
        onPress={() => {
          if (status === 'verified') {
            router.replace('/(app)/home');
          } else if (status === 'failed') {
            router.back();
          }
        }}
        style={styles.button}
      >
        {status === 'verified' ? 'Continue to Dashboard' : 'Try Again'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
}); 