import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => router.push('/(app)/document-generation')}
          style={styles.button}
        >
          Generate Document
        </Button>
        <Button 
          mode="contained" 
          onPress={() => router.push('/(app)/p2p-transaction')}
          style={styles.button}
        >
          P2P Transaction
        </Button>
        <Button 
          mode="contained" 
          onPress={() => router.push('/(app)/document-vault')}
          style={styles.button}
        >
          Document Vault
        </Button>
        <Button 
          mode="contained" 
          onPress={() => router.push('/(app)/profile')}
          style={styles.button}
        >
          Profile
        </Button>
      </View>
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
  buttonContainer: {
    gap: 15,
  },
  button: {
    width: '100%',
  },
}); 