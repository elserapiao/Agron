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
  
  const [totalNitrogenio, setTotalNitrogenio] = useState<number | null>(null);
  const [totalFosforo, setTotalFosforo] = useState<number | null>(null);
  const [totalPotassio, setTotalPotassio] = useState<number | null>(null);
  const [totalBoro, setTotalBoro] = useState<number | null>(null);
  const [totalZinco, setTotalZinco] = useState<number | null>(null);
  const [v1, setV1] = useState<number | null>(null);
  const [somaDeBases, setSomaDeBases] = useState<number | null>(null);
  const [ctc, setCtc] = useState<number | null>(null);
  const [necessidadeDeCalagem, setNecessidadeDeCalagem] = useState<number | null>(null);
  const [aduboOrganico, setAduboOrganico] = useState<number | null>(null);

  const [isFullScreenModalVisible, setFullScreenModalVisible] = useState(false);

  const addAnalysis = () => {
    if (selectedOwner === '' || selectedProperty === '' || date === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setModalVisible(true);
  };

  const handleFieldChange = (value: string | null) => {
    setSelectedField(value);
    if (value === '1') {
      setNumeroDePlantas('4000');
      setArea('1.5');
      setEstagio('Plantio');
      setProducaoEsperada('90-100');
      setMo('13,9');
      setPMeh('2,78');
      setK('0,06');
      setCa('1,04');
      setMg('0,43');
      setHAl('4,29');
      setB('0,21');
      setZn('0,76');
    } else if (value === '2') {
      setNumeroDePlantas('7140');
      setArea('2.0');
      setEstagio('Formação');
      setProducaoEsperada('90-100');
      setMo('46,97');
      setPMeh('29,44');
      setK('0,13');
      setCa('1,11');
      setMg('0,38');
      setHAl('3,79');
      setB('0,15');
      setZn('8,45');
    } else if (value === '3') {
      setNumeroDePlantas('4000');
      setArea('1.5');
      setEstagio('Produção');
      setProducaoEsperada('90-100');
      setMo('21,35');
      setPMeh('4,72');
      setK('0,11');
      setCa('1,52');
      setMg('0,51');
      setHAl('4,04');
      setB('0,21');
      setZn('0,99');
    } else {
      setNumeroDePlantas(null);
      setArea(null);
      setEstagio(null);
      setProducaoEsperada(null);
      setMo('');
      setPMeh('');
      setK('');
      setCa('');
      setMg('');
      setHAl('');
      setB('');
      setZn('');
    }
  };

  const saveAnalysis = () => {
    if (!selectedField) {
      Alert.alert('Erro', 'Por favor, selecione um talhão.');
      return;
    }

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
    } else {
      calculateResults();
      setFullScreenModalVisible(true);
    }
  };

  const calculateResults = () => {
    let totalN, totalP, totalK, totalB, totalZn, v1Value, bases, ctcValue, calagem, adubo;
    const moValue = parseFloat(mo.replace(',', '.'));
    const pMehValue = parseFloat(pMeh.replace(',', '.'));
    const kValue = parseFloat(k.replace(',', '.'));
    const caValue = parseFloat(ca.replace(',', '.'));
    const mgValue = parseFloat(mg.replace(',', '.'));
    const hAlValue = parseFloat(hAl.replace(',', '.'));
    const bValue = parseFloat(b.replace(',', '.'));
    const znValue = parseFloat(zn.replace(',', '.'));

    if (estagio === 'Plantio') {
      bases = caValue + mgValue + kValue;
      ctcValue = bases + hAlValue;
      v1Value = (bases / ctcValue) * 100;
      calagem = ((60 - v1Value) * ctcValue) / 100; //PRNT de 100
      setSomaDeBases(parseFloat(bases.toFixed(2)));
      setCtc(parseFloat(ctcValue.toFixed(2)));
      setV1(parseFloat(v1Value.toFixed(2)));
      setNecessidadeDeCalagem(parseFloat(calagem.toFixed(2)));

      totalP = pMehValue < 10 ? 40 : pMehValue > 20 ? 20 : 30;
      totalK = (kValue * 10) < 1.5 ? 20 : (kValue * 10) > 3 ? 0 : 10; // Tranforma potássio de  para cmol para mmol
      totalB = bValue <= 0.2 ? 1 : bValue > 0.6 ? 0 : 0.5;
      totalZn = znValue <= 0.5 ? 2 : znValue > 1.2 ? 0 : 1;
      adubo = moValue < 20 ? 3 : moValue > 30 ? 1 : 2;

      setTotalFosforo(parseFloat(totalP.toFixed(2)));
      setTotalPotassio(parseFloat(totalK.toFixed(2)));
      setTotalBoro(parseFloat(totalB.toFixed(2)));
      setTotalZinco(parseFloat(totalZn.toFixed(2)));
      setAduboOrganico(parseFloat(adubo.toFixed(2)));
    } else if (estagio === 'Formação') {
      // Lógica específica para estágio de Formação (já coberta)
    } else {
      bases = caValue + mgValue + kValue;
      ctcValue = bases + hAlValue;
      v1Value = (bases / ctcValue) * 100;
      calagem = (((60 - v1Value) * ctcValue) / 100) / 2; //PRNT de 100
      setSomaDeBases(parseFloat(bases.toFixed(2)));
      setCtc(parseFloat(ctcValue.toFixed(2)));
      setV1(parseFloat(v1Value.toFixed(2)));
      setNecessidadeDeCalagem(parseFloat(calagem.toFixed(2)));

      if (producaoEsperada === '20-30') {
        totalN = 150;
        totalP = pMehValue < 10 ? 40 : pMehValue > 20 ? 0 : 20;
        totalK = kValue < 1.5 ? 120 : kValue > 3 ? 40 : 80;
      } else if (producaoEsperada === '30-40') {
        totalN = 180;
        totalP = pMehValue < 10 ? 50 : pMehValue > 20 ? 0 : 30;
        totalK = kValue < 1.5 ? 150 : kValue > 3 ? 50 : 100;
      } else if (producaoEsperada === '40-50') {
        totalN = 210;
        totalP = pMehValue < 10 ? 60 : pMehValue > 20 ? 20 : 40;
        totalK = kValue < 1.5 ? 180 : kValue > 3 ? 60 : 120;
      } else if (producaoEsperada === '50-60') {
        totalN = 240;
        totalP = pMehValue < 10 ? 70 : pMehValue > 20 ? 30 : 50;
        totalK = kValue < 1.5 ? 210 : kValue > 3 ? 70 : 140;
      } else if (producaoEsperada === '60-70') {
        totalN = 270;
        totalP = pMehValue < 10 ? 80 : pMehValue > 20 ? 40 : 60;
        totalK = kValue < 1.5 ? 240 : kValue > 3 ? 80 : 160;
      } else if (producaoEsperada === '70-80') {
        totalN = 300;
        totalP = pMehValue < 10 ? 90 : pMehValue > 20 ? 50 : 70;
        totalK = kValue < 1.5 ? 270 : kValue > 3 ? 90 : 180;
      } else if (producaoEsperada === '80-90') {
        totalN = 330;
        totalP = pMehValue < 10 ? 100 : pMehValue > 20 ? 60 : 80;
        totalK = kValue < 1.5 ? 300 : kValue > 3 ? 100 : 200;
      } else if (producaoEsperada === '90-100') {
        totalN = 360;
        totalP = pMehValue < 10 ? 110 : pMehValue > 20 ? 70 : 90;
        totalK = kValue < 1.5 ? 330 : kValue > 3 ? 110 : 220;
      } else if (producaoEsperada === '100-110') {
        totalN = 390;
        totalP = pMehValue < 10 ? 120 : pMehValue > 20 ? 80 : 100;
        totalK = kValue < 1.5 ? 360 : kValue > 3 ? 120 : 240;
      } else if (producaoEsperada === '110-120') {
        totalN = 420;
        totalP = pMehValue < 10 ? 130 : pMehValue > 20 ? 90 : 110;
        totalK = kValue < 1.5 ? 390 : kValue > 3 ? 130 : 260;
      } else if (producaoEsperada === '120-130') {
        totalN = 450;
        totalP = pMehValue < 10 ? 140 : pMehValue > 20 ? 100 : 120;
        totalK = kValue < 1.5 ? 420 : kValue > 3 ? 140 : 280;
      } else if (producaoEsperada === '130-140') {
        totalN = 480;
        totalP = pMehValue < 10 ? 150 : pMehValue > 20 ? 110 : 130;
        totalK = kValue < 1.5 ? 450 : kValue > 3 ? 150 : 300;
      } else {
        totalN = 510;
        totalP = pMehValue < 10 ? 160 : pMehValue > 20 ? 120 : 140;
        totalK = kValue < 1.5 ? 480 : kValue > 3 ? 160 : 320;
      }

      totalB = bValue <= 0.2 ? 2 : bValue > 0.6 ? 0 : 1;
      totalZn = znValue < 0.5 ? 2 : znValue > 1.5 ? 0 : 1;

      setTotalNitrogenio(parseFloat(totalN.toFixed(2)));
      setTotalFosforo(parseFloat(totalP.toFixed(2)));
      setTotalPotassio(parseFloat(totalK.toFixed(2)));
      setTotalBoro(parseFloat(totalB.toFixed(2)));
      setTotalZinco(parseFloat(totalZn.toFixed(2)));
    }
  };

  const resetFields = () => {
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
    setTotalNitrogenio(null);
    setTotalFosforo(null);
    setTotalPotassio(null);
    setTotalBoro(null);
    setTotalZinco(null);
    setV1(null);
    setSomaDeBases(null);
    setCtc(null);
    setNecessidadeDeCalagem(null);
    setAduboOrganico(null);
    setFullScreenModalVisible(false);
    setModalVisible(false);
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
          <Text style={styles.listItemText}>{analysis.date}</Text>
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
        onRequestClose={() => setModalVisible(false)}
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
              <Text style={styles.resultText}>Número de plantas: {numeroDePlantas} pés de café</Text>
              <Text style={styles.resultText}>Área: {area} ha</Text>
              <Text style={styles.resultText}>Estágio do cafeeiro: {estagio}</Text>
              <Text style={styles.resultText}>Produção esperada: {producaoEsperada} sacas por ha</Text>
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
                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          )}
          <View style={styles.bottomButton}>
            <Button title="Voltar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isFullScreenModalVisible}
        onRequestClose={resetFields}
      >
        <View style={styles.fullScreenModal}>
          <Text style={styles.title}>Resultados</Text>
          
          {estagio === 'Plantio' && (
            <>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>Número de plantas: {numeroDePlantas} pés de café;</Text>
              <Text style={styles.resultText}>Área: {area} ha;</Text>
              <Text style={styles.resultText}>Estágio do cafeeiro: {estagio}.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{((necessidadeDeCalagem || 0) * (area || 0)).toFixed(2)} toneladas de calcário no talhão, considerando um calcário com um PRNT de 100%.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{totalFosforo?.toFixed(2)} gramas de P2O5 por cova ou {((totalFosforo * numeroDePlantas) / 1000).toFixed(2)} kilos de P2O5 no talhão.</Text>
              <Text style={styles.resultText}>{totalPotassio?.toFixed(2)} gramas de K2O por cova ou {((totalPotassio * numeroDePlantas) / 1000).toFixed(2)} kilos de K2O no talhão.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{totalBoro?.toFixed(2)} gramas de Boro por cova ou {((totalBoro * numeroDePlantas) / 1000).toFixed(2)} kilos de Boro no talhão.</Text>
              <Text style={styles.resultText}>{totalZinco?.toFixed(2)} gramas de Zinco por cova ou {((totalZinco * numeroDePlantas) / 1000).toFixed(2)} kilos de Zinco no talhão.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{aduboOrganico?.toFixed(2)} kg de Esterco de galinhas (cama) por cova ou {((aduboOrganico * numeroDePlantas) / 1000).toFixed(2)} toneladas de Esterco de galinhas (cama) no talhão.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>A recomendação foi elaborada com base no Livro Café na Amazônia da EMBRAPA. Em caso de dúvidas, consulte um profissional da área agrária.</Text>
              <Text style={styles.resultText}></Text>
            </>
          )}

          {estagio === 'Formação' && (
            <>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>Número de plantas: {numeroDePlantas} pés de café;</Text>
              <Text style={styles.resultText}>Área: {area} ha;</Text>
              <Text style={styles.resultText}>Estágio do cafeeiro: {estagio}.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>32 gramas de Nitrogênio por planta ou {((32 * numeroDePlantas) / 1000).toFixed(2)} kilos de Nitrogênio no talhão no 1º ano da formação.</Text>
              <Text style={styles.resultText}>16 gramas de K2O por planta ou {((16 * numeroDePlantas) / 1000).toFixed(2)} kilos de K2O no talhão no 1º ano da formação.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>60 gramas de Nitrogênio por planta ou {((60 * numeroDePlantas) / 1000).toFixed(2)} kilos de Nitrogênio no talhão no 2º ano da formação.</Text>
              <Text style={styles.resultText}>60 gramas de K2O por planta ou {((60 * numeroDePlantas) / 1000).toFixed(2)} kilos de K2O no talhão no 2º ano da formação.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>A recomendação foi elaborada com base no Livro Café na Amazônia da EMBRAPA. Em caso de dúvidas, consulte um profissional da área agrária.</Text>
              <Text style={styles.resultText}></Text>
            </>
          )}

          {estagio !== 'Plantio' && estagio !== 'Formação' && (
            <>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>Número de plantas: {numeroDePlantas} pés de café;</Text>
              <Text style={styles.resultText}>Área: {area} ha;</Text>
              <Text style={styles.resultText}>Estágio do cafeeiro: {estagio};</Text>
              <Text style={styles.resultText}>Produção esperada: {producaoEsperada} sacas por ha.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{((necessidadeDeCalagem || 0) * (area || 0)).toFixed(2)} toneladas de calcário no talhão, considerando um calcário com um PRNT de 100%.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{(((totalNitrogenio * area) / numeroDePlantas) * 1000).toFixed(2)} gramas de Nitrogênio por planta ou {(totalNitrogenio * area).toFixed(2)} kilos de Nitrogênio no talhão.</Text>
              <Text style={styles.resultText}>{(((totalFosforo * area) / numeroDePlantas) * 1000).toFixed(2)} gramas de P2O5 por planta ou {(totalFosforo * area).toFixed(2)} kilos de P2O5 no talhão.</Text>
              <Text style={styles.resultText}>{(((totalPotassio * area) / numeroDePlantas) * 1000).toFixed(2)} gramas de K2O por planta ou {(totalPotassio * area).toFixed(2)} kilos de K2O no talhão.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>{(((totalBoro * area) / numeroDePlantas) * 1000).toFixed(2)} gramas de Boro por planta ou {(totalBoro * area).toFixed(2)} kilos de Boro no talhão.</Text>
              <Text style={styles.resultText}>{(((totalZinco * area) / numeroDePlantas) * 1000).toFixed(2)} gramas de Zinco por planta ou {(totalZinco * area).toFixed(2)} kilos de Zinco no talhão.</Text>
              <Text style={styles.resultText}></Text>
              <Text style={styles.resultText}>A recomendação foi elaborada com base no Livro Café na Amazônia da EMBRAPA. Em caso de dúvidas, consulte um profissional da área agrária.</Text>
              <Text style={styles.resultText}></Text>
            </>
          )}

          <Button title="Voltar" onPress={resetFields} />
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
    fontSize: 20,
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
  listItemText: {
    fontSize: 16, // Ajuste o tamanho da fonte aqui
    color: '#000', // Ajuste a cor da fonte aqui
  },
  resultText: {
    fontSize: 16, // Ajuste o tamanho da fonte dos resultados aqui
    color: '#333', // Ajuste a cor da fonte dos resultados aqui
    marginVertical: 2, // Espaçamento vertical entre os textos
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
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SoilAnalysisScreen;
