import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.content}>
        <Text style={styles.label}>DocmentID:</Text>
        <Text style={styles.value}>DMNT5678</Text>
        
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
        
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>+91 9876543210</Text>
        
        <Text style={styles.label}>KYC Status:</Text>
        <Text style={styles.value}>Verified</Text>
      </View>
      <Button 
        mode="outlined" 
        onPress={() => router.back()}
        style={styles.backButton}
      >
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    gap: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    marginTop: 'auto',
  },
}); 