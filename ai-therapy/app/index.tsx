// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {

  let username;

  useEffect(() => {
    const getUsername = async () => {
      username = await AsyncStorage.getItem('username'); 
    }

    getUsername(); 
  }, [])

  return !username ? <Redirect href={'/welcome'}/> : <Redirect href={'/dashboard'}/>
}
