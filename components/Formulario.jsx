import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, Alert } from 'react-native';

const FormularioScreen = ({ navigation }) => {
  const [phAgua, setPhAgua] = useState('');
  const [biodiversidadeMarinha, setBiodiversidadeMarinha] = useState('');
  const [boiasMonitoramento, setBoiasMonitoramento] = useState('');
  const [cliente, setCliente] = useState('');
  const [satelites, setSatelites] = useState('');
  const [qualidadeAgua, setQualidadeAgua] = useState('');
  const [salinidadeAgua, setSalinidadeAgua] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!phAgua || !biodiversidadeMarinha || !boiasMonitoramento || !cliente || !satelites || !qualidadeAgua || !salinidadeAgua || !temperatura) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
    } else {
      try {
        
        await addDoc(collection(db, 'oceanConditions'), {
          phAgua,
          biodiversidadeMarinha,
          boiasMonitoramento,
          cliente,
          satelites,
          qualidadeAgua,
          salinidadeAgua,
          temperatura,
        });

        
        setPhAgua('');
        setBiodiversidadeMarinha('');
        setBoiasMonitoramento('');
        setCliente('');
        setSatelites('');
        setQualidadeAgua('');
        setSalinidadeAgua('');
        setTemperatura('');

        
        Alert.alert('Sucesso', 'Formulário enviado com sucesso!');
        navigation.navigate('Home');
      } catch (error) {
        setError('Erro ao enviar o formulário: ' + error.message);
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/fundo.png')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Formulário de Condições do Oceano</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="PH da água"
          value={phAgua}
          onChangeText={text => setPhAgua(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Biodiversidade Marinha"
          value={biodiversidadeMarinha}
          onChangeText={text => setBiodiversidadeMarinha(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Boias de Monitoramento"
          value={boiasMonitoramento}
          onChangeText={text => setBoiasMonitoramento(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cliente"
          value={cliente}
          onChangeText={text => setCliente(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Satélites"
          value={satelites}
          onChangeText={text => setSatelites(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Qualidade da água"
          value={qualidadeAgua}
          onChangeText={text => setQualidadeAgua(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Salinidade da água"
          value={salinidadeAgua}
          onChangeText={text => setSalinidadeAgua(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Temperatura"
          value={temperatura}
          onChangeText={text => setTemperatura(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#fff', 
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormularioScreen;
