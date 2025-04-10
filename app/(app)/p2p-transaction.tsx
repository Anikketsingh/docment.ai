import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function P2PTransactionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>P2P Legal Transaction</Text>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Rental Agreement
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Sale Deed
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Loan Agreement
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Money Transfer
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Phone Sale
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Custom Contract
        </Button>
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
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
  backButton: {
    marginTop: 'auto',
  },
}); 