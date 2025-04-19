import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';



const goals = [
  "I wanna reduce stress",
  "I wanna try CUHK AI Therapy",
  "I want to cope with trauma",
  "I want to be a better person",
  "Just trying out the app, mate!",
];

export default function Assessment() {
  const updateData = useUserStore((s) => s.updateData);
  const data = useUserStore((s) => s.data)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);

  
  const router = useRouter();

  const handleNext = async () => {

    if (selectedIndex === null) return; 
    const goal = goals[selectedIndex]

    updateData({goal})
    console.log(data)

    router.push('/assessment-two')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fdf9f7', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20, color: '#432818' }}>
        What’s your health goal?
      </Text>

      <FlatList
        data={goals}
        renderItem={({ item, index }) => {
          const selected = selectedIndex === index;
          return (
            <TouchableOpacity
              onPress={() => setSelectedIndex(index)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selected ? '#b4c58c' : '#fff',
                borderRadius: 25,
                padding: 12,
                marginVertical: 6,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 5,
              }}
            >
              <Ionicons name="eye-outline" size={20} color={selected ? '#fff' : '#333'} style={{ marginRight: 10 }} />
              <Text style={{ flex: 1, color: selected ? '#fff' : '#333' }}>{item}</Text>
              <Ionicons
                name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={selected ? '#fff' : '#333'}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#432818',
          paddingVertical: 12,
          borderRadius: 30,
          marginTop: 30,
          alignItems: 'center',
        }}   onPress={handleNext}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}
