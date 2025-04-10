import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function DocumentGenerationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Generation</Text>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Affidavit
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Power of Attorney
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Self-declaration
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          NDA
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.button}
        >
          Custom Document
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