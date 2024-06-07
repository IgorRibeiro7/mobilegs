import { auth } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
    } else {
      try {
      
        await signInWithEmailAndPassword(auth, email, password);
        setError('');
        
        navigation.navigate('SucessoLogin');
      } catch (error) {
        setError('Erro ao fazer login: ' + error.message);
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/fundo.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={[styles.title, styles.titleFont]}>LOGIN</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={[styles.input, styles.inputBackground]}
          placeholder="Email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          color="#000" 
        />
        <TextInput
          style={[styles.input, styles.inputBackground, styles.passwordInput]}
          placeholder="Senha"
          placeholderTextColor="#555"
          secureTextEntry
          caretHidden 
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          color="#000" 
        />
        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('EsqueciSenha')}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#fff',
  },
  titleFont: {
    fontFamily: 'Glacial',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputBackground: {
    backgroundColor: '#fff',
  },
  passwordInput: {
    caretHidden: false, 
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
