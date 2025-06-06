// screens/FieldRegistrationScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FieldRegistrationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [fields, setFields] = useState<{ id: string, property: string, name: string, plants: string, area: string, stage: string, yieldValue: string }[]>([]);
  const [owner, setOwner] = useState('Selecione o Proprietário');
  const [property, setProperty] = useState('Selecione a Propriedade');
  const [name, setName] = useState('');
  const [plants, setPlants] = useState('');
  const [area, setArea] = useState('');
  const [stage, setStage] = useState('Selecione o Estágio do Cafeeiro');
  const [yieldValue, setYieldValue] = useState('Selecione a Produção Esperada');

  const addField = () => {
    if (owner === '' || property === '' || name === '' || plants === '' || area === '' || stage === '' || yieldValue === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newField = { id: String(fields.length + 1), property, name, plants, area, stage, yieldValue };
    setFields([...fields, newField]);
    setOwner('Selecione o Proprietário');
    setProperty('Selecione a Propriedade');
    setName('');
    setPlants('');
    setArea('');
    setStage('Selecione o Estágio do Cafeeiro');
    setYieldValue('Selecione a Produção Esperada');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Talhões</Text>
      <Picker
        selectedValue={owner}
        style={styles.picker}
        onValueChange={(itemValue) => setOwner(itemValue as string)}
      >
        <Picker.Item label="Selecione o Proprietário" value="" />
          <Picker.Item label="Fulano" value="Fulano" />
          <Picker.Item label="Beltrano" value="Beltrano" />
          <Picker.Item label="Sicrano" value="Sicrano" />
      </Picker>
      <Picker
        selectedValue={property}
        style={styles.picker}
        onValueChange={(itemValue) => setProperty(itemValue as string)}
      >
        <Picker.Item label="Selecione a Propriedade" value="" />
          <Picker.Item label="Chácara" value="Chácara" />
          <Picker.Item label="Sítio" value="Sítio" />
          <Picker.Item label="Fazenda" value="Fazenda" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Nome do Talhão"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        keyboardType = 'numeric'
        placeholder="Número de Plantas"
        value={plants}
        onChangeText={setPlants}
      />
      <TextInput
        style={styles.input}
        keyboardType = 'numeric'
        placeholder="Tamanho da Área (ha)"
        value={area}
        onChangeText={setArea}
      />
      <Picker
        selectedValue={stage}
        style={styles.picker}
        onValueChange={(itemValue) => setStage(itemValue as string)}
      >
        <Picker.Item label="Selecione o Estágio do Cafeeiro" value="" />
          <Picker.Item label="Plantio" value="Plantio" />
          <Picker.Item label="Formação" value="Formação" />
          <Picker.Item label="Produção" value="Produção" />
      </Picker>
      <Picker
        selectedValue={yieldValue}
        style={styles.picker}
        onValueChange={(itemValue) => setYieldValue(itemValue as string)}
      >
        <Picker.Item label="Selecione a Produção Esperada" value="" />
          <Picker.Item label="20-30 sacas/ha" value="20-30" />
          <Picker.Item label="30-40 sacas/ha" value="30-40" />
          <Picker.Item label="40-50 sacas/ha" value="40-50" />
          <Picker.Item label="50-60 sacas/ha" value="50-60" />
          <Picker.Item label="60-70 sacas/ha" value="60-70" />
          <Picker.Item label="70-80 sacas/ha" value="70-80" />
          <Picker.Item label="80-90 sacas/ha" value="80-90" />
          <Picker.Item label="90-100 sacas/ha" value="90-100" />
          <Picker.Item label="100-110 sacas/ha" value="100-110" />
          <Picker.Item label="110-120 sacas/ha" value="110-120" />
          <Picker.Item label="120-130 sacas/ha" value="120-130" />
          <Picker.Item label="130-140 sacas/ha" value="130-140" />
          <Picker.Item label="140-150 sacas/ha" value="140-150" />
      </Picker>
      <Button title="Salvar" onPress={addField} />
      <FlatList
        data={fields}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>{item.plants}</Text>
            <Text>{item.area}</Text>
            <Text>{item.stage}</Text>
            <Text>{item.yieldValue}</Text>
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
  bottomButton: {
    marginBottom: 20,
  }
});

export default FieldRegistrationScreen;
