import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const ProducerRegistrationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [producers, setProducers] = useState<{ id: string, name: string, cpf: string }[]>([]);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const cpfRef = useRef<any>(null);

  const addProducer = () => {
    if (name === '' || cpf === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newProducer = { id: String(producers.length + 1), name, cpf };
    setProducers([...producers, newProducer]);
    clearFields();
  };

  const clearFields = () => {
    setName('');
    setCpf('');
    if (cpfRef.current) {
      cpfRef.current.getElement().clear();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produtores</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInputMask
        style={styles.input}
        placeholder="CPF"
        type={'cpf'}
        value={cpf}
        onChangeText={setCpf}
        ref={cpfRef}
      />
      <Button title="Salvar" onPress={addProducer} />
      <FlatList
        data={producers}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>{item.cpf}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.bottomButton}>
        <Button title="Voltar" onPress={() => {
          clearFields();
          navigation.navigate('Home');
        }} />
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

export default ProducerRegistrationScreen;
