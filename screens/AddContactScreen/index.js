import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');

  const handleAddContact = async () => {
    if (!name || !phone || !institution) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      Alert.alert('Erro', 'O telefone deve conter apenas 11 dígitos numéricos.');
      return;
    }

    const formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;

    const newContact = { name, phone: formattedPhone, institution };

    try {
      const existingContacts = await AsyncStorage.getItem('contacts');
      const contacts = existingContacts ? JSON.parse(existingContacts) : [];
      contacts.push(newContact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      Alert.alert('Sucesso', 'Contato adicionado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o contato.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone (somente números)"
        keyboardType="numeric"
        maxLength={11}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Instituição"
        value={institution}
        onChangeText={setInstitution}
      />
      <Button title="Adicionar Contato" onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddContactScreen;
