import { auth, firestore } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !phone) {
      setError('Por favor, preencha todos os campos.');
    } else {
      setError('');
      try {
        // Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Salva dados adicionais no Firestore
        await setDoc(doc(firestore, 'users', user.uid), {
          name,
          email,
          phone,
        });

        // Exibe uma mensagem de sucesso e navega para a tela de login
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } catch (error) {
        setError('Erro ao cadastrar: ' + error.message);
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/fundo.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontFamily: 'Glacial' }]}>CADASTRO</Text> {/* Altera a fonte para Glacial */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={[styles.input, { backgroundColor: '#fff' }]}
          placeholder="Nome"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#fff' }]}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#fff' }]}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#fff' }]}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Glacial', // Define a fonte como Glacial
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#3498db',
  },
  signUpButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
