// screens/ChemicalNutrientsScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';

const ChemicalNutrientsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [nutrients, setNutrients] = useState<{ id: string, name: string, symbol: string }[]>([]);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const addNutrient = () => {
    if (name === '' || symbol === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newNutrient = { id: String(nutrients.length + 1), name, symbol };
    setNutrients([...nutrients, newNutrient]);
    setName('');
    setSymbol('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Nutrientes Químicos do Solo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Nutriente"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Símbolo do Nutriente"
        value={symbol}
        onChangeText={setSymbol}
      />
      <Button title="Salvar" onPress={addNutrient} />
      <FlatList
        data={nutrients}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>{item.symbol}</Text>
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

export default ChemicalNutrientsScreen;
