// screens/PropertyRegistrationScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PropertyRegistrationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [properties, setProperties] = useState<{ id: string, name: string, address: string, owner: string }[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');

  const addProperty = () => {
    if (owner === '' || name === '' || address === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newProperty = { id: String(properties.length + 1), name, address, owner };
    setProperties([...properties, newProperty]);
    setName('');
    setAddress('');
    setOwner('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Propriedades</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Nome da Propriedade"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Salvar" onPress={addProperty} />
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>{item.owner}</Text>
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

export default PropertyRegistrationScreen;
