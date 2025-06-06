// navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MainScreen from '../screens/MainScreen';
import ProducerRegistrationScreen from '../screens/ProducerRegistrationScreen';
import PropertyRegistrationScreen from '../screens/PropertyRegistrationScreen';
import FieldRegistrationScreen from '../screens/FieldRegistrationScreen';
import ChemicalNutrientsScreen from '../screens/ChemicalNutrientsScreen';
import MeasurementUnitsScreen from '../screens/MeasurementUnitsScreen';
import StandardRecommendationsScreen from '../screens/StandardRecommendationsScreen';
import SoilAnalysisScreen from '../screens/SoilAnalysisScreen';
import RecommendationsListScreen from '../screens/RecommendationsListScreen';

const Tab = createBottomTabNavigator();

const LogoTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/logo4.png')} style={styles.headerLogo} />
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Producers':
              iconName = 'person';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Properties':
              iconName = 'home';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Fields':
              iconName = 'leaf';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Nutrients':
              iconName = 'flask';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Units':
              iconName = 'ruler';
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            case 'Recommendations':
              iconName = 'book';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Analysis':
              iconName = 'document-text';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'Listing':
              iconName = 'list';
              return <Ionicons name={iconName} size={size} color={color} />;
            default:
              return <Ionicons name="ellipse" size={size} color={color} />;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        headerStyle: {
          height: 120,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: 'Principal',
          headerStyle: {
            height: 50,
          },
        }}
      />
      <Tab.Screen
        name="Producers"
        component={ProducerRegistrationScreen}
        options={{
          title: 'Produtores',
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Properties"
        component={PropertyRegistrationScreen}
        options={{
          title: 'Propriedades',
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Fields"
        component={FieldRegistrationScreen}
        options={{
          title: 'Talhões',
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Nutrients"
        component={ChemicalNutrientsScreen}
        options={{
          title: 'Nutrientes',
          tabBarButton: () => null,
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Units"
        component={MeasurementUnitsScreen}
        options={{
          title: 'Unidades',
          tabBarButton: () => null,
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={SoilAnalysisScreen}
        options={{
          title: 'Análises',
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Listing"
        component={RecommendationsListScreen}
        options={{
          title: 'Listagem',
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
      <Tab.Screen
        name="Recommendations"
        component={StandardRecommendationsScreen}
        options={{
          title: 'Recomendações',
          tabBarButton: () => null,
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            height: 150,
          }
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    width: 150,
    height: 150,
  },

  overlayLogo: {
    position: 'absolute',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TabNavigator;
