// app/assessment/step-two.js
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';

export default function GenderSelection() {
  const router = useRouter();
  const [gender, setGender] = useState<'Male' | 'Female' | null>(null)
  const updateData = useUserStore((s) => s.updateData)

  const handleNext = () => {
    if (gender === null) return; 

    updateData({gender}); 

    router.push('/assessment-three')
  }


  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fdf9f7', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#432818', marginTop: 50, textAlign: 'center' }}>
        What’s your official{'\n'}gender?
      </Text>

      {/* Gender Cards */}
      <View>
        <TouchableOpacity style={{
          backgroundColor: '#fff',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 15,
          padding: 10,
          marginTop: 30,
        }} onPress={() => {setGender('Male')}}>
          <Text style={{ fontWeight: '600' }}>I am Male</Text>
          <Image source={require('../assets/male.png')} style={{ height: 100, width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>

        <TouchableOpacity style={{
          backgroundColor: '#fff',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 15,
          padding: 10,
          marginTop: 20,
        }} onPress={() => setGender('Female')}>
          <Text style={{ fontWeight: '600' }}>I am Female</Text>
          <Image source={require('../assets/female.png')} style={{ height: 100, width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>
      </View>

      {gender !== null && <View>
        <Text>You are {gender}</Text>
      </View>}

      {/* Skip & Continue Buttons */}
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity style={{
          backgroundColor: '#e7f1dc',
          padding: 12,
          borderRadius: 20,
          marginBottom: 10,
          alignItems: 'center'
        }} onPress={() => {
          updateData({gender: null})
          router.push('/assessment-three')
        }}>
          <Text style={{ color: '#432818', fontWeight: '500' }}>Prefer to skip, thanks ✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext} // Next screen
          style={{
            backgroundColor: '#432818',
            padding: 12,
            borderRadius: 20,
            alignItems: 'center'
          }}
        >
         
          <Text style={{ color: '#fff' }}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
