import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';

export default function KYCScreen() {
  const [panNumber, setPanNumber] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePanChange = (text: string) => {
    // Convert to uppercase and remove spaces
    const cleaned = text.toUpperCase().replace(/\s/g, '');
    setPanNumber(cleaned);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        setCapturedImage(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const handleSubmit = async () => {
    if (!panNumber) {
      Alert.alert('Error', 'Please enter your PAN number');
      return;
    }

    if (panNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit PAN number');
      return;
    }

    if (!capturedImage) {
      Alert.alert('Error', 'Please take a photo of your face');
      return;
    }

    try {
      setLoading(true);
      // Dummy API call simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to customer details screen
      router.push('/(auth)/customer-details');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit KYC details');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip KYC Verification',
      'You can complete KYC verification later. Would you like to proceed to customer details?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => router.push('/(auth)/customer-details'),
        },
      ]
    );
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  const CameraComponent = Camera as any;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verification</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Enter PAN Number</Text>
        <TextInput
          label="PAN Number"
          mode="outlined"
          value={panNumber}
          onChangeText={handlePanChange}
          style={styles.input}
          maxLength={10}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Take Selfie</Text>
        {!capturedImage ? (
          <View style={styles.cameraContainer}>
            {isCameraReady && (
              <CameraComponent
                ref={cameraRef}
                style={styles.camera}
                onCameraReady={() => setIsCameraReady(true)}
              >
                <View style={styles.cameraControls}>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                </View>
              </CameraComponent>
            )}
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedImage }} style={styles.preview} />
            <Button
              mode="outlined"
              onPress={() => setCapturedImage(null)}
              style={styles.retakeButton}
            >
              Retake Photo
            </Button>
          </View>
        )}
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={!panNumber || !capturedImage}
          >
            Submit for Verification
          </Button>
          <Button
            mode="outlined"
            onPress={handleSkip}
            style={styles.skipButton}
          >
            Skip for Now
          </Button>
        </>
      )}
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  cameraContainer: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  previewContainer: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  retakeButton: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
  skipButton: {
    marginTop: 10,
  },
}); 