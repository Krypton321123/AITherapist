// app/assessment/step-three.js
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
const router = useRouter();

export default function AgeSelector() {
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState(18);
  const ageRange = Array.from({ length: 50 }, (_: any, i: any) => i + 10); // Ages 10 to 59
  const updateData = useUserStore((s) => s.updateData)
  
  const handleNext = () => {
    console.log(selectedAge)
    updateData({age: selectedAge})

    router.push('/assessment-four')
  }

  const renderItem = ({ item }: {item: any}) => {
    const isSelected = item === selectedAge;
    return (
      <TouchableOpacity
        onPress={() => setSelectedAge(item)}
        style={{
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: isSelected ? 32 : 20,
            fontWeight: 'bold',
            color: isSelected ? '#fff' : '#aaa',
            backgroundColor: isSelected ? '#A3BC74' : 'transparent',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fdf9f7', padding: 20 }}>
      <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 22, fontWeight: 'bold', color: '#432818' }}>
        What’s your age?
      </Text>

      <FlatList
        data={ageRange}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 80,
          paddingBottom: 80,
          alignItems: 'center',
        }}
      />

      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: '#432818',
          padding: 14,
          borderRadius: 30,
          alignItems: 'center',
          marginTop: -20,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}
