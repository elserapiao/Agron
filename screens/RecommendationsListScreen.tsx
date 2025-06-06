// screens/RecommendationsListScreen.tsx

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const RecommendationsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [properties, setProperties] = useState<string[]>(['Propriedade 1', 'Propriedade 2']);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>();
  const [fields, setFields] = useState<{ id: string, name: string }[]>([
    { id: '1', name: 'Talhão 1' },
    { id: '2', name: 'Talhão 2' },
  ]);
  const [selectedField, setSelectedField] = useState<string | undefined>();
  const [recommendations, setRecommendations] = useState<{ nutrient: string, amount: string }[]>([
    { nutrient: 'Nitrogênio', amount: '100 kg/ha' },
    { nutrient: 'Fósforo', amount: '50 kg/ha' },
  ]);

  const renderField = ({ item }: { item: { id: string, name: string } }) => (
    <View style={styles.listItem}>
      <Text>{item.name}</Text>
      <Ionicons name="document-text" size={24} color="black" onPress={() => selectField(item.id)} />
    </View>
  );

  const selectField = (id: string) => {
    setSelectedField(id);
  };

  const generateReport = () => {
    Alert.alert('Relatório Gerado', 'O relatório de recomendações foi gerado com sucesso.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Recomendações de Análises de Solos</Text>
      <Picker
        selectedValue={selectedProperty}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedProperty(itemValue as string)}
      >
        <Picker.Item label="Selecione a Propriedade" value={undefined} />
        {properties.map((property) => (
          <Picker.Item key={property} label={property} value={property} />
        ))}
      </Picker>
      {selectedProperty && (
        <FlatList
          data={fields}
          renderItem={renderField}
          keyExtractor={(item) => item.id}
        />
      )}
      {selectedField && (
        <View style={styles.recommendationsContainer}>
          {recommendations.map((recommendation, index) => (
            <Text key={index}>{`${recommendation.nutrient}: ${recommendation.amount}`}</Text>
          ))}
          <Button title="Gerar Relatório" onPress={generateReport} />
        </View>
      )}
      <View style={styles.bottomButton}>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recommendationsContainer: {
    marginTop: 16,
  },
  bottomButton: {
    marginBottom: 20,
  }
});

export default RecommendationsListScreen;
