import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fdf9f7', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Welcome to{"\n"}AI Mental Therapist
      </Text>

      <Image 
        source={require('../assets/image.png')}
        style={{ width: 250, height: 250, marginBottom: 30 }}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={{ backgroundColor: '#432818', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 30 }}
        onPress={() => router.push('/signin')}
      >
        <Text style={{ color: 'white' }}>Get Started →</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20 }}>
        Already have an account?{' '}
        <Text style={{ color: '#f77f00' }}>Sign In</Text>
      </Text>
    </View>
  );
}
