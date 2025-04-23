import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BreathingExercise: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('Inhale');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) startBreathingCycle();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRunning]);

  const startBreathingCycle = () => {
    setPhase('Inhale');
    animateCircle(1, 2.5);

    timeoutRef.current = setTimeout(() => {
      setPhase('Hold');
      animateCircle(2.5, 2.5);

      timeoutRef.current = setTimeout(() => {
        setPhase('Exhale');
        animateCircle(2.5, 1);

        timeoutRef.current = setTimeout(() => {
          if (isRunning) startBreathingCycle();
        }, 4000);
      }, 3000);
    }, 4000);
  };

  const animateCircle = (from: number, to: number) => {
    scaleAnim.setValue(from);
    Animated.timing(scaleAnim, {
      toValue: to,
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) setPhase('Inhale');
    else setPhase('Finished');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>

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
    fontSize: 30,
    fontWeight: '700',
    color: '#355E3B',
    marginBottom: 30,
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
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});