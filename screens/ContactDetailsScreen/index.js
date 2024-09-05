import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactDetailsScreen = ({ route, navigation }) => {
  const { contact, index } = route.params;
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone.replace(/\D/g, ''));
  const [institution, setInstitution] = useState(contact.institution);

  const isDataChanged = () => {
    return (
      name !== contact.name ||
      phone !== contact.phone.replace(/\D/g, '') ||
      institution !== contact.institution
    );
  };

  const handleUpdate = async () => {
    if (!name || !phone || !institution) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      Alert.alert('Erro', 'O telefone deve conter apenas 11 dígitos numéricos.');
      return;
    }

    if (!isDataChanged()) {
      Alert.alert('Aviso', 'Nenhum dado foi alterado. Não há o que atualizar.');
      return;
    }

    const formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;

    const updatedContact = { name, phone: formattedPhone, institution };

    try {
      const existingContacts = await AsyncStorage.getItem('contacts');
      let contacts = existingContacts ? JSON.parse(existingContacts) : [];
      contacts[index] = updatedContact;
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      Alert.alert('Sucesso', 'Contato atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o contato.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: confirmDelete, style: 'destructive' },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      const existingContacts = await AsyncStorage.getItem('contacts');
      let contacts = existingContacts ? JSON.parse(existingContacts) : [];
      contacts.splice(index, 1);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      Alert.alert('Sucesso', 'Contato excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o contato.');
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
      <Button title="Atualizar Contato" onPress={handleUpdate} />
      <View style={styles.spacing} />
      <Button title="Excluir Contato" onPress={handleDelete} color="red" />
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
  spacing: {
    height: 20,
  },
});

export default ContactDetailsScreen;
