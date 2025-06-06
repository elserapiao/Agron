import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

const SoilAnalysisScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [analyses, setAnalyses] = useState<{ id: string, date: string }[]>([]);
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [date, setDate] = useState('');
  const [errorDate, setErrorDate] = useState('null');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [mo, setMo] = useState('');
  const [moUnit, setMoUnit] = useState('g/dm³');
  const [pMeh, setPMeh] = useState('');
  const [k, setK] = useState('');
  const [ca, setCa] = useState('');
  const [mg, setMg] = useState('');
  const [hAl, setHAl] = useState('');
  const [b, setB] = useState('');
  const [zn, setZn] = useState('');
  const [nutrientUnit, setNutrientUnit] = useState('cmolc/dm³');
  
  const [numeroDePlantas, setNumeroDePlantas] = useState<number | null>(null);
  const [area, setArea] = useState<number | null>(null);
  const [estagio, setEstagio] = useState<string | null>(null);
  const [producaoEsperada, setProducaoEsperada] = useState<string | null>(null);

  const addAnalysis = () => {
    if (selectedOwner === '' || selectedProperty === '' || date === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setModalVisible(true);
  };

  const saveAnalysis = () => {
    // Verificar se o campo 'selectedField' está preenchido
    if (!selectedField) {
      Alert.alert('Erro', 'Por favor, selecione um talhão.');
      return;
    }

    // Verificar se todos os campos de nutrientes estão preenchidos
    if (!mo || !pMeh || !k || !ca || !mg || !hAl || !b || !zn) {
      const emptyFields = [];
      if (!mo) emptyFields.push('Matéria Orgânica');
      if (!pMeh) emptyFields.push('Fósforo Mehlich');
      if (!k) emptyFields.push('Potássio');
      if (!ca) emptyFields.push('Cálcio');
      if (!mg) emptyFields.push('Magnésio');
      if (!hAl) emptyFields.push('H + Al');
      if (!b) emptyFields.push('Boro');
      if (!zn) emptyFields.push('Zinco');
      Alert.alert('Erro', `Por favor, preencha os seguintes campos: ${emptyFields.join(', ')}`);
      return;
    }

    const newAnalysis = { id: String(analyses.length + 1), date, selectedField, mo, moUnit, pMeh, k, ca, mg, hAl, b, zn, nutrientUnit };
    setAnalyses([...analyses, newAnalysis]);
    clearFields();
  };

  const clearFields = () => {
    setSelectedField(null);
    setMo('');
    setMoUnit('g/dm³');
    setPMeh('');
    setK('');
    setCa('');
    setMg('');
    setHAl('');
    setB('');
    setZn('');
    setNutrientUnit('cmolc/dm³');
    setNumeroDePlantas(null);
    setArea(null);
    setEstagio(null);
    setProducaoEsperada(null);
    setModalVisible(false);
  };

  const renderAnalysis = ({ item }: { item: { id: string, date: string } }) => (
    <View style={styles.listItem}>
      <Text>{item.date}</Text>
      <View style={styles.listItemButtons}>
        <Ionicons name="pencil" size={24} color="black" onPress={() => modifyAnalysis(item.id)} />
        <Ionicons name="trash" size={24} color="black" onPress={() => deleteAnalysis(item.id)} />
      </View>
    </View>
  );

  const modifyAnalysis = (id: string) => {
    // Implementar lógica para modificar análise
  };

  const deleteAnalysis = (id: string) => {
    setAnalyses(analyses.filter(a => a.id !== id));
  };

  const handleFieldChange = (value: string | null) => {
    setSelectedField(value);
    if (value === '1') {
      setNumeroDePlantas(3570);
      setArea(1.0);
      setEstagio('Plantio');
      setProducaoEsperada('90-100');
    } else if (value === '2') {
      setNumeroDePlantas(7140);
      setArea(2.0);
      setEstagio('Formação');
      setProducaoEsperada('90-100');
    } else if (value === '3') {
      setNumeroDePlantas(10710);
      setArea(3.0);
      setEstagio('Produção');
      setProducaoEsperada('90-100');
    } else {
      setNumeroDePlantas(null);
      setArea(null);
      setEstagio(null);
      setProducaoEsperada(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Análises de Solo</Text>
      <View style={styles.fullWidthPicker}>
        <Picker
          selectedValue={selectedOwner}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedOwner(itemValue as string)}
        >
          <Picker.Item label="Selecione o Proprietário" value="" />
          <Picker.Item label="Fulano" value="Fulano" />
          <Picker.Item label="Beltrano" value="Beltrano" />
          <Picker.Item label="Sicrano" value="Sicrano" />
        </Picker>
      </View>
      <View style={styles.fullWidthPicker}>
        <Picker
          selectedValue={selectedProperty}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedProperty(itemValue as string)}
        >
          <Picker.Item label="Selecione a Propriedade" value="" />
          <Picker.Item label="Chácara" value="Chácara" />
          <Picker.Item label="Sítio" value="Sítio" />
          <Picker.Item label="Fazenda" value="Fazenda" />
        </Picker>
      </View>
      <TextInputMask
        style={styles.input}
        placeholder="Data da Coleta"
        type='datetime'
        options={{
          format: 'DD/MM/YYYY'
        }}
        onChangeText={value => {
          setDate(value);
          setErrorDate(null);
        }}
      />
      <Button title="Adicionar Análise de Solo" onPress={addAnalysis} />
      {analyses.map((analysis) => (
        <View key={analysis.id} style={styles.listItem}>
          <Text>{analysis.date}</Text>
          <View style={styles.listItemButtons}>
            <Ionicons name="pencil" size={24} color="black" onPress={() => modifyAnalysis(analysis.id)} />
            <Ionicons name="trash" size={24} color="black" onPress={() => deleteAnalysis(analysis.id)} />
          </View>
        </View>
      ))}
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
          <View style={styles.fullWidthPicker}>
            <Picker
              selectedValue={selectedField}
              style={styles.picker}
              onValueChange={handleFieldChange}
            >
              <Picker.Item label="Selecione o Talhão" value={null} />
              <Picker.Item label="Talhão 1" value="1" />
              <Picker.Item label="Talhão 2" value="2" />
              <Picker.Item label="Talhão 3" value="3" />
            </Picker>
          </View>

          {selectedField && (
            <View style={styles.fieldInfo}>
              <Text>Número de plantas: {numeroDePlantas} pés de café</Text>
              <Text>Área: {area} ha</Text>
              <Text>Estágio do cafeeiro: {estagio}</Text>
              <Text>Produção esperada: {producaoEsperada} sacas por ha</Text>
            </View>
          )}

          {selectedField && (
            <View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Matéria Orgânica (M.O.)"
                  keyboardType="numeric"
                  value={mo}
                  onChangeText={setMo}
                />
                <Picker
                  selectedValue={moUnit}
                  style={[styles.picker, styles.narrowPicker]}
                  onValueChange={(itemValue) => setMoUnit(itemValue as string)}
                >
                  <Picker.Item label="g/dm³" value="g/dm³" />
                  <Picker.Item label="g/kg" value="g/kg" />
                  <Picker.Item label="dag/kg" value="dag/kg" />
                </Picker>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Fósforo Mehlich (P Meh.)"
                  keyboardType="numeric"
                  value={pMeh}
                  onChangeText={setPMeh}
                />
                <Text style={styles.label}>     mg/dm³</Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Potássio (K)"
                  keyboardType="numeric"
                  value={k}
                  onChangeText={setK}
                />
                <Picker
                  selectedValue={nutrientUnit}
                  style={[styles.picker, styles.narrowPicker]}
                  onValueChange={(itemValue) => setNutrientUnit(itemValue as string)}
                >
                  <Picker.Item label="cmolc/dm³" value="cmolc/dm³" />
                  <Picker.Item label="mg/dm³" value="mg/dm³" />
                </Picker>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Cálcio (Ca)"
                  keyboardType="numeric"
                  value={ca}
                  onChangeText={setCa}
                />
                <Text style={styles.label}>     cmolc/dm³</Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Magnésio (Mg)"
                  keyboardType="numeric"
                  value={mg}
                  onChangeText={setMg}
                />
                <Text style={styles.label}>     cmolc/dm³</Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Hidrogênio + Alumínio (H+Al)"
                  keyboardType="numeric"
                  value={hAl}
                  onChangeText={setHAl}
                />
                <Text style={styles.label}>     cmolc/dm³</Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Boro (B)"
                  keyboardType="numeric"
                  value={b}
                  onChangeText={setB}
                />
                <Text style={styles.label}>     mg/dm³</Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.wideInput]}
                  placeholder="Zinco (Zn)"
                  keyboardType="numeric"
                  value={zn}
                  onChangeText={setZn}
                />
                <Text style={styles.label}>     mg/dm³</Text>
              </View>
              <View style={styles.modalButtons}>
                <Button title="Salvar" onPress={saveAnalysis} />
                <Button title="Cancelar" onPress={clearFields} />
              </View>
            </View>
          )}
          <View style={styles.bottomButton}>
            <Button title="Voltar" onPress={clearFields} />
          </View>
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
    justifyContent: 'space-between',
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
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  picker: {
    height: 30,
    width: '100%',
    marginBottom: 3,
  },
  fullWidthPicker: {
    width: '100%',
    marginBottom: 5,
  },
  fieldInfo: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  wideInput: {
    width: '55%',
  },
  narrowPicker: {
    width: '50%',
  },
  label: {
    width: '50%',
    textAlign: 'left',
    paddingVertical: 6,
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
    margin: 5,
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  bottomButton: {
    marginBottom: 20,
    justifyContent: 'center',
  },
});

export default SoilAnalysisScreen;
