// screens/InfoScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const InfoScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Text style={styles.text}>
        O aplicativo "Agrón" foi desenvolvido para auxiliar nos cálculos de nutrientes necessários para a adubação e calagem do café robusta.
      </Text>
      <Text style={styles.text}>
        O projeto visa melhorar a eficiência da produção de café robusta na Amazônia através de análises detalhadas e recomendações personalizadas.
      </Text>
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
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'justify',
  },
  bottomButton: {
    marginBottom: 20,
  },
});

export default InfoScreen;
