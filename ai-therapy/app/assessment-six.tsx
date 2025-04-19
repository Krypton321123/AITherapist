import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';

const sleepOptions = [
  { label: 'Excellent', hours: '7-9 HOURS', icon: 'emoticon-excited-outline', color: '#7CB342', value: 'EXCELLENT' },
  { label: 'Good', hours: '6-7 HOURS', icon: 'emoticon-happy-outline', color: '#FFEB3B', value: 'GOOD' },
  { label: 'Fair', hours: '5 HOURS', icon: 'emoticon-neutral-outline', color: '#A1887F', value: 'FAIR' },
  { label: 'Poor', hours: '3-4 HOURS', icon: 'emoticon-sad-outline', color: '#FF9800', value: 'POOR' },
  { label: 'Worst', hours: '<3 HOURS', icon: 'emoticon-dead-outline', color: '#9575CD', value: 'WORST' },
];

export default function SleepQualityScreen() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const router = useRouter();

  const updateData = useUserStore( s => s.updateData ); 

  const handleNext = () => {
    updateData({ sleepQuality: sleepOptions[selectedIndex].value })

    router.push('/assessment-seven')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How would you rate your{"\n"}sleep quality?</Text>

      <View style={styles.sliderContainer}>
        {/* Left Labels */}
        <View style={styles.leftColumn}>
          {sleepOptions.map((option, index) => (
            <View key={index} style={styles.optionTextContainer}>
              <Text style={[
                styles.label,
                selectedIndex === index && styles.labelSelected
              ]}>
                {option.label}
              </Text>
              <Text style={[
                styles.hours,
                selectedIndex === index && styles.hoursSelected
              ]}>
                {option.hours}
              </Text>
            </View>
          ))}
        </View>

        {/* Slider Track and Thumb */}
        <View style={styles.sliderTrack}>
          <View style={styles.track} />
          <View style={[styles.thumbContainer, { top: selectedIndex * 60 }]}>
            <View style={styles.thumbCircle}>
              <Text style={styles.thumbIcon}>↻</Text>
            </View>
          </View>
        </View>

        {/* Emoji Icons */}
        <View style={styles.rightColumn}>
          {sleepOptions.map((option, index) => {
            const selected = selectedIndex === index;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconCircle,
                  selected && { backgroundColor: option.color }
                ]}
                onPress={() => setSelectedIndex(index)}
              >
                <MaterialCommunityIcons
                  name={option.icon}
                  size={26}
                  color={selected ? '#fff' : '#999'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F4',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#3F2200',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  leftColumn: {
    justifyContent: 'space-between',
    height: 300,
  },
  optionTextContainer: {
    height: 55,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#D0CFCF',
    fontWeight: '600',
  },
  hours: {
    fontSize: 12,
    color: '#D0CFCF',
  },
  labelSelected: {
    color: '#3F2200',
    fontWeight: 'bold',
  },
  hoursSelected: {
    color: '#3F2200',
    fontWeight: 'bold',
  },
  rightColumn: {
    justifyContent: 'space-between',
    height: 300,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderTrack: {
    position: 'relative',
    height: 300,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    width: 8,
    height: '100%',
    backgroundColor: '#F3E5DC',
    borderRadius: 4,
  },
  thumbContainer: {
    position: 'absolute',
    left: -10,
    alignItems: 'center',
  },
  thumbCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF7C1E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF7C1E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  thumbIcon: {
    color: '#fff',
    fontSize: 20,
  },
  continueButton: {
    backgroundColor: '#4B3E2A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
