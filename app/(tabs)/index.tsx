import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Surface, IconButton } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DOCUMENT_TYPES = [
  { 
    id: 'phone_sale', 
    title: 'Phone Sale', 
    icon: 'phone',
    description: 'Generate phone sale agreement'
  },
  { 
    id: 'money_lending', 
    title: 'Money Lending', 
    icon: 'cash',
    description: 'Create money lending document'
  },
  { 
    id: 'affidavit', 
    title: 'Affidavit', 
    icon: 'file-document-outline',
    description: 'Create legal affidavit'
  },
  { 
    id: 'nda', 
    title: 'NDA', 
    icon: 'shield-lock-outline',
    description: 'Non-disclosure agreement'
  },
  { 
    id: 'custom', 
    title: 'Custom', 
    icon: 'pencil-outline',
    description: 'Create custom document'
  }
];

export default function HomeScreen() {
  const { docmentID } = useLocalSearchParams<{ docmentID: string }>();

  const handleDocumentTypePress = (documentType: string) => {
    router.push({
      pathname: '/documents/generate',
      params: { type: documentType, docmentID }
    });
  };

  const handleGeneratePress = () => {
    router.push({
      pathname: '/documents/generate',
      params: { docmentID }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Docment.ai</Text>
        <View style={styles.headerRight}>
          <IconButton icon="bell-outline" size={24} onPress={() => {}} />
          <IconButton icon="help-circle-outline" size={24} onPress={() => {}} />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Card style={styles.actionCard} onPress={handleGeneratePress}>
          <Card.Content>
            <Text style={styles.actionTitle}>Generate</Text>
            <Text style={styles.actionSubtitle}>Quick document creation</Text>
            <MaterialCommunityIcons 
              name="file-document-edit" 
              size={40} 
              color="#6B4EFF" 
              style={styles.actionIcon}
            />
          </Card.Content>
        </Card>

        <Card style={styles.actionCard}>
          <Card.Content>
            <Text style={styles.actionTitle}>Sign</Text>
            <Text style={styles.actionSubtitle}>Digital signatures</Text>
            <MaterialCommunityIcons 
              name="pen" 
              size={40} 
              color="#FF4E8C" 
              style={styles.actionIcon}
            />
          </Card.Content>
        </Card>
      </View>

      {/* Document Types Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Document Types</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.documentTypes}>
          {DOCUMENT_TYPES.map((type) => (
            <TouchableOpacity 
              key={type.id} 
              onPress={() => handleDocumentTypePress(type.id)}
            >
              <Surface style={styles.documentTypeCard}>
                <MaterialCommunityIcons 
                  name={type.icon} 
                  size={24} 
                  color="#6B4EFF" 
                />
                <Text style={styles.documentTypeText}>{type.title}</Text>
              </Surface>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Promotional Banner */}
      <Card style={styles.promoCard}>
        <Card.Content>
          <Text style={styles.promoTitle}>India's Legal Tech Platform</Text>
          <Text style={styles.promoSubtitle}>Generate legal documents in 90 seconds</Text>
          <Button 
            mode="contained" 
            onPress={handleGeneratePress}
            style={styles.promoButton}
          >
            Try Now
          </Button>
        </Card.Content>
      </Card>

      {/* Recent Documents */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Documents</Text>
          <Button mode="text" onPress={() => {}}>See all</Button>
        </View>
        <Card style={styles.recentDocCard}>
          <Card.Content>
            <View style={styles.docItem}>
              <MaterialCommunityIcons name="file-document" size={24} color="#6B4EFF" />
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>Rental Agreement</Text>
                <Text style={styles.docDate}>Created on March 15, 2024</Text>
              </View>
              <IconButton icon="chevron-right" size={24} onPress={() => {}} />
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* DocmentID Card */}
      <Card style={styles.idCard}>
        <Card.Content>
          <Text style={styles.idLabel}>Your DocmentID</Text>
          <Text style={styles.idValue}>{docmentID}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  headerRight: {
    flexDirection: 'row',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  actionIcon: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  documentTypes: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  documentTypeCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
    width: width * 0.25,
  },
  documentTypeText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  promoCard: {
    margin: 16,
    backgroundColor: '#6B4EFF',
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#fff',
    width: 120,
  },
  recentDocCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docInfo: {
    flex: 1,
    marginLeft: 12,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  docDate: {
    fontSize: 12,
    color: '#666',
  },
  idCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  idLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  idValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
