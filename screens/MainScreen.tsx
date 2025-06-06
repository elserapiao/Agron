// screens/MainScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo1.png')} style={styles.image} />
        <Image source={require('../assets/logo2.png')} style={styles.image} />
      </View>
      <Image source={require('../assets/logo3.png')} style={styles.mainImage} />
            <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Analysis')}
        >
          <Text style={styles.buttonText}>Cadastro de Análises de Solo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Fields')}
        >
          <Text style={styles.buttonText}>Cadastro de Talhões</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Listing')}
        >
          <Text style={styles.buttonText}>Listagem de Recomendações de Análises de Solos</Text>
        </TouchableOpacity>
      </View>
      {/*<Ionicons name="menu" size={32} color="black" style={styles.hamburger} onPress={() => navigation.toggleDrawer()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 136,
    height: 150,
    resizeMode: 'contain',
  },
  mainImage: {
    width: '100%',
    height: 200,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  hamburger: {
    position: 'absolute',
    top: -5,
    right: 16,
  },
});

export default MainScreen;
