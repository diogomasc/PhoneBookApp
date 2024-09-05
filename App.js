import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from './screens/ContactListScreen';
import AddContactScreen from './screens/AddContactScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista de Contatos">
        <Stack.Screen name="Lista de Contatos" component={ContactListScreen} />
        <Stack.Screen name="Adicionar Contato" component={AddContactScreen} />
        <Stack.Screen name="Detalhes do Contato" component={ContactDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
