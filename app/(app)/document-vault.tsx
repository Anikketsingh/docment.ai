import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function DocumentVaultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Vault</Text>
      <View style={styles.content}>
        <Text style={styles.emptyText}>No documents yet</Text>
        <Text style={styles.subtitle}>Your generated documents will appear here</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 'auto',
  },
}); 