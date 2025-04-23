import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const breathingTypes = {
  "Box Breathing": { inhale: 4000, hold: 4000, exhale: 4000 },
  "4-7-8 Breathing": { inhale: 4000, hold: 7000, exhale: 8000 },
  "Relax Breathing": { inhale: 5000, hold: 2000, exhale: 6000 },
};

const BreathingExercise: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('');
  const [selectedType, setSelectedType] = useState<BreathingType | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  type BreathingType = keyof typeof breathingTypes;
  const currentTimings = selectedType ? breathingTypes[selectedType] : null;

  useEffect(() => {
    if (isRunning && currentTimings) startBreathingCycle();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRunning, selectedType]);

  const startBreathingCycle = () => {
    if (!currentTimings) return;

    setPhase('Inhale');
    animateCircle(1, 2.5, currentTimings.inhale);

    timeoutRef.current = setTimeout(() => {
      setPhase('Hold');
      animateCircle(2.5, 2.5, currentTimings.hold);

      timeoutRef.current = setTimeout(() => {
        setPhase('Exhale');
        animateCircle(2.5, 1, currentTimings.exhale);

        timeoutRef.current = setTimeout(() => {
          if (isRunning) startBreathingCycle();
        }, currentTimings.exhale);
      }, currentTimings.hold);
    }, currentTimings.inhale);
  };

  const animateCircle = (from: number, to: number, duration: number) => {
    scaleAnim.setValue(from);
    Animated.timing(scaleAnim, {
      toValue: to,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setPhase('Finished');
    } else {
      setIsRunning(true);
    }
  };

  if (!selectedType) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose Breathing Type</Text>
        {Object.keys(breathingTypes).map((type: any) => (
          <TouchableOpacity key={type} style={styles.selectButton} onPress={() => setSelectedType(type)}>
            <Text style={styles.buttonText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedType}</Text>

      <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]} />

      <Text style={styles.phaseText}>{phase}</Text>

      <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <MaterialCommunityIcons name="flower-outline" size={36} color="#fff" />
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BreathingExercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F8F1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#355E3B',
    marginBottom: 30,
    textAlign: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    backgroundColor: '#B3D87A',
    borderRadius: 100,
    marginBottom: 40,
    opacity: 0.8,
  },
  phaseText: {
    fontSize: 28,
    color: '#355E3B',
    marginBottom: 40,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#355E3B',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectButton: {
    backgroundColor: '#355E3B',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});