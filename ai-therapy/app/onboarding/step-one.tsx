import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function StepOne() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#e7f1dc', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 40 }}>
      {/* <Text style={{ fontSize: 12, marginTop: 20 }}>Step One</Text> */}

      <Image source={require('../../assets/step-one.png')} style={{ width: 300, height: 300, alignItems: 'center' }} resizeMode="contain" />

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: '600', fontSize: 14 }}>Personalize Your Mental{'\n'}Health State With AI</Text>

        <TouchableOpacity
          style={{ backgroundColor: '#432818', padding: 10, borderRadius: 20, marginTop: 20 }}
          onPress={() => router.push('/onboarding/step-two')}
        >
          <Text style={{ color: 'white' }}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
