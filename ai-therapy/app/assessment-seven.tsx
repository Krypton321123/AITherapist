import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';

const options = [
  { label: 'Prescribed\nMedications', icon: 'pill' },
  { label: 'Over the Counter\nSupplements', icon: 'leaf' },
  { label: "I'm not taking any", icon: 'minus-circle-outline' },
  { label: 'Prefer not to say', icon: 'close' },
];

export default function MedicationsScreen() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const router = useRouter();
  const updateData = useUserStore(s => s.updateData)

  const handleNext = () => {
    
    selectedIndex ? updateData({ medication: true }) : updateData({ medication: false })

    router.push('/assessment-eight')

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you taking any{'\n'}medications?</Text>

      <View style={styles.grid}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                isSelected && styles.cardSelected
              ]}
              onPress={() => setSelectedIndex(index)}
            >
              <MaterialCommunityIcons
                name={option.icon}
                size={28}
                color={isSelected ? '#fff' : '#3F2200'}
              />
              <Text style={[
                styles.cardText,
                isSelected && styles.cardTextSelected
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleNext}
        // disabled={selectedIndex === null}
      >
        <Text style={styles.continueText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F4',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#3F2200',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 40,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  cardSelected: {
    backgroundColor: '#A7C27C',
  },
  cardText: {
    textAlign: 'center',
    color: '#3F2200',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 14,
  },
  cardTextSelected: {
    color: '#fff',
  },
//   continueButton: {
//     backgroundColor: '#4A2C13',
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     alignSelf: 'center',
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
continueButton: {
    backgroundColor: '#4B3E2A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  
  },
});
