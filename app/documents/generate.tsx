import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, Card } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

type DocumentData = {
  [key: string]: string;
};

const DOCUMENT_TEMPLATES = {
  phone_sale: {
    title: 'Phone Sale Agreement',
    fields: [
      { id: 'buyer_docment_id', label: "Buyer's DocmentID", required: true },
      { id: 'phone_model', label: 'Phone Model', required: true },
      { id: 'imei_number', label: 'IMEI Number', required: true },
      { id: 'sale_amount', label: 'Sale Amount (₹)', required: true, keyboardType: 'numeric' },
      { id: 'phone_condition', label: 'Phone Condition', required: true },
    ]
  },
  money_lending: {
    title: 'Money Lending Agreement',
    fields: [
      { id: 'borrower_docment_id', label: "Borrower's DocmentID", required: true },
      { id: 'loan_amount', label: 'Loan Amount (₹)', required: true, keyboardType: 'numeric' },
      { id: 'interest_rate', label: 'Interest Rate (%)', required: true, keyboardType: 'numeric' },
      { id: 'loan_duration', label: 'Loan Duration (months)', required: true, keyboardType: 'numeric' },
      { id: 'purpose', label: 'Purpose of Loan', required: true },
    ]
  }
};

export default function GenerateScreen() {
  const { type = 'phone_sale', docmentID } = useLocalSearchParams<{ type: string; docmentID: string }>();
  const [documentType, setDocumentType] = useState(type);
  const [formData, setFormData] = useState<DocumentData>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const template = DOCUMENT_TEMPLATES[documentType as keyof typeof DOCUMENT_TEMPLATES];
    if (!template) return false;

    const requiredFields = template.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.id]);

    if (missingFields.length > 0) {
      Alert.alert('Missing Fields', `Please fill in: ${missingFields.map(f => f.label).join(', ')}`);
      return false;
    }

    return true;
  };

  const verifyOtherPartyDocmentID = async (otherPartyID: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('docment_id')
        .eq('docment_id', otherPartyID)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Invalid DocmentID');

      return true;
    } catch (error) {
      Alert.alert('Error', 'Invalid DocmentID for other party. Please verify and try again.');
      return false;
    }
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Verify other party's DocmentID
      const otherPartyField = documentType === 'phone_sale' ? 'buyer_docment_id' : 'borrower_docment_id';
      const isValid = await verifyOtherPartyDocmentID(formData[otherPartyField]);
      
      if (!isValid) {
        setLoading(false);
        return;
      }

      // Navigate to preview screen
      router.push({
        pathname: '/documents/preview',
        params: {
          type: documentType,
          data: JSON.stringify(formData),
          docmentID
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const template = DOCUMENT_TEMPLATES[documentType as keyof typeof DOCUMENT_TEMPLATES];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Generate Document</Text>

        <SegmentedButtons
          value={documentType}
          onValueChange={setDocumentType}
          buttons={[
            { value: 'phone_sale', label: 'Phone Sale' },
            { value: 'money_lending', label: 'Money Lending' },
          ]}
          style={styles.segmentedButtons}
        />

        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.formTitle}>{template?.title}</Text>
            
            {template?.fields.map((field) => (
              <TextInput
                key={field.id}
                label={field.label}
                value={formData[field.id] || ''}
                onChangeText={(text) => handleChange(field.id, text)}
                mode="outlined"
                style={styles.input}
                keyboardType={field.keyboardType as any || 'default'}
                required={field.required}
              />
            ))}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleGenerate}
          style={styles.generateButton}
          loading={loading}
          disabled={loading}
        >
          Generate Document
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  formCard: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  generateButton: {
    marginTop: 8,
  },
}); 