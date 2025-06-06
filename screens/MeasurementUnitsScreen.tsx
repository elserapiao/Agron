// screens/MeasurementUnitsScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';

const MeasurementUnitsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [units, setUnits] = useState<{ id: string, description: string, conversionFactor: string }[]>([]);
  const [description, setDescription] = useState('');
  const [conversionFactor, setConversionFactor] = useState('');

  const addUnit = () => {
    if (description === '' || conversionFactor === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newUnit = { id: String(units.length + 1), description, conversionFactor };
    setUnits([...units, newUnit]);
    setDescription('');
    setConversionFactor('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Unidades de Medidas dos Nutrientes Químicos</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        keyboardType = 'numeric'
        placeholder="Fator de Conversão"
        value={conversionFactor}
        onChangeText={setConversionFactor}
      />
      <Button title="Salvar" onPress={addUnit} />
      <FlatList
        data={units}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.description}</Text>
            <Text>{item.conversionFactor}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bottomButton: {
    marginBottom: 20,
  }
});

export default MeasurementUnitsScreen;
