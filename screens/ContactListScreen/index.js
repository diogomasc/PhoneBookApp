import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];
      setContacts(parsedContacts);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadContacts();
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detalhes do Contato', { contact: item, index })}
    >
      <Image
        source={require('../../src/assets/userDefault.png')}
        style={styles.image}
      />
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.details}>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.institution}>{item.institution}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum contato encontrado.</Text>}
      />
      <Button title="Adicionar Contato" onPress={() => navigation.navigate('Adicionar Contato')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
   image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phone: {
    fontSize: 14,
  },
  institution: {
    fontSize: 14,
  },
});


export default ContactListScreen;
