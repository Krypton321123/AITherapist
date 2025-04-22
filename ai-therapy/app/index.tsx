import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [username, setUsername] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const getUsername = async () => {
      const stored = await AsyncStorage.getItem('username');
      setUsername(stored);
    };

    getUsername();
  }, []);

  if (username === undefined) return null; 

  return username ? <Redirect href="/dashboard" /> : <Redirect href="/welcome" />;
}