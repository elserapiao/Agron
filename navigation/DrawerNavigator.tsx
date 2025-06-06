// navigation/DrawerNavigator.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ChemicalNutrientsScreen from '../screens/ChemicalNutrientsScreen';
import MeasurementUnitsScreen from '../screens/MeasurementUnitsScreen';
import StandardRecommendationsScreen from '../screens/StandardRecommendationsScreen';
import InfoScreen from '../screens/InfoScreen';
import { Image, StyleSheet, View } from 'react-native';

const Drawer = createDrawerNavigator();

const LogoTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/logo4.png')} style={styles.headerLogo} />
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Agrón">
      <Drawer.Screen name="Agrón" component={TabNavigator} />
      <Drawer.Screen name="Cadastro de Fertilizantes" component={ChemicalNutrientsScreen}
        options={{
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            height: 200,
          },
        }}
      />
{/*

      <Drawer.Screen name="Cadastro de Unidades de Medidas" component={MeasurementUnitsScreen}
        options={{
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            height: 200,
          },
        }}
      />
      <Drawer.Screen name="Cadastro de Recomendações Padrões" component={StandardRecommendationsScreen}
        options={{
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            height: 200,
          },
        }}
      />

*/}

      <Drawer.Screen name="Sobre o Aplicativo" component={InfoScreen}
        options={{
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            height: 200,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
    width: 150,
    height: 150,
  },
});

export default DrawerNavigator;
