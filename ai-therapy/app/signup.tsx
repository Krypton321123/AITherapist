import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios'
import API_URL from '@/constants/API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '', 
    password: '', 
    username: '', 
    phone_no: ''
  })

  const handleSubmit = async () => {

    if (!formData.fullName.trim() || !formData.password.trim() || !formData.phone_no.trim() || !formData.username.trim() ) {
      return;
    }

    const response: any = axios.post(`${API_URL}/user/signup`, {
      fullName: formData.fullName.trim(), 
      password: formData.password.trim(),
      phone_no: formData.phone_no.trim(), 
      username: formData.username.trim(), 
    })

    if (response.status === 200 || response.status === 201) {
      AsyncStorage.setItem('username', formData.username)
      return router.push('/assessment')
    }

  }

  

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Circle Profile Image */}
        <Image
          source={require('../assets/step-three.png')} // replace with your actual image
          style={styles.circleImage}
          resizeMode="cover"
        />

        {/* Title */}
        <Text style={styles.title}>Register</Text>

        {/* Input Fields */}
        <TextInput onChangeText={(value) => {setFormData({...formData, fullName: value}); console.log(formData)}} placeholder="Enter Your Full Name" style={styles.input} />
        <TextInput onChange={( t ) => {
          setFormData({...formData, phone_no: t.nativeEvent.text})
        }} placeholder="Enter Your Phone No" keyboardType="phone-pad" style={styles.input} />
        <TextInput onChangeText={(value) => { setFormData({...formData, username: value}) }} placeholder="Create Your username" style={styles.input} />
        <TextInput onChangeText={(value) => { setFormData({ ...formData, password: value }) }} placeholder="Create Your Password" secureTextEntry style={styles.input} />

        
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

       
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Link href="/signin" style={styles.loginLink}>
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4f2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40, // equal spacing from top and bottom
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  circleImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4b2e2b',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
  loginText: {
    marginTop: 15,
    fontSize: 12,
  },
  loginLink: {
    color: '#000',
    fontWeight: '600',
  },
});
