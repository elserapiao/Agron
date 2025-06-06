// screens/StandardRecommendationsScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const StandardRecommendationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [recommendations, setRecommendations] = useState<{ id: string, manual: string, status: string, stage: string }[]>([]);
  const [manual, setManual] = useState('');
  const [status, setStatus] = useState('Situação do Manual de Referência');
  const [stage, setStage] = useState('Estágio do cafeeiro');
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const addRecommendation = () => {
    if (manual === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newRecommendation = { id: String(recommendations.length + 1), manual, status, stage };
    setRecommendations([...recommendations, newRecommendation]);
    clearFields();
  };

  const modifyRecommendation = (id: string) => {
    const recommendation = recommendations.find(r => r.id === id);
    if (recommendation) {
      setManual(recommendation.manual);
      setStatus(recommendation.status);
      setStage(recommendation.stage);
      setCurrentId(id);
      setModalVisible(true);
    }
  };

  const saveModification = () => {
    setRecommendations(recommendations.map(r => r.id === currentId ? { id: currentId!, manual, status, stage } : r));
    clearFields();
  };

  const deleteRecommendation = (id: string) => {
    setRecommendations(recommendations.filter(r => r.id !== id));
  };

  const clearFields = () => {
    setManual('');
    setStatus('Situação do Manual de Referência');
    setStage('Estágio do cafeeiro');
    setCurrentId(null);
    setModalVisible(false);
  };

  const renderRecommendation = ({ item }: { item: { id: string, manual: string, status: string, stage: string } }) => (
    <View style={styles.listItem}>
      <Text>{item.manual}</Text>
      <Text>{item.status}</Text>
      <Text>{item.stage}</Text>
      <View style={styles.listItemButtons}>
        <Ionicons name="pencil" size={24} color="black" onPress={() => modifyRecommendation(item.id)} />
        <Ionicons name="trash" size={24} color="black" onPress={() => deleteRecommendation(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Recomendações Padrão para a Análise de Solos</Text>
      <Button title="Adicionar Recomendação" onPress={() => setModalVisible(true)} />
      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={item => item.id}
      />
      <View style={styles.bottomButton}>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={clearFields}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Manual de Referência"
            value={manual}
            onChangeText={setManual}
          />
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue as string)}
          >
            <Picker.Item label="Situação do Manual de Referência" value="" />
              <Picker.Item label="Ativo" value="Ativo" />
              <Picker.Item label="Inativo" value="Inativo" />
          </Picker>
          <Picker
            selectedValue={stage}
            style={styles.picker}
            onValueChange={(itemValue) => setStage(itemValue as string)}
          >
            <Picker.Item label="Estágio do cafeeiro" value="" />
              <Picker.Item label="Plantio" value="Plantio" />
              <Picker.Item label="Formação" value="Formação" />
              <Picker.Item label="Produção" value="Produção" />
          </Picker>
          <Button title="Salvar" onPress={currentId ? saveModification : addRecommendation} />
          <Button title="Cancelar" onPress={clearFields} />
        </View>
      </Modal>
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
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomButton: {
    marginBottom: 20,
  }
});

export default StandardRecommendationsScreen;
