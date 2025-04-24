import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const MeditationScreen = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sound, setSound] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/soothing-sound.mp3'),
        { shouldPlay: false, isLooping: true }
      );
      setSound(sound);
      setAudioLoaded(true);
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const startMeditation = async () => {
    if (audioLoaded && sound) {
      await sound.playAsync();
    }

    setIsMeditating(true);
    setSeconds(0);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerRef.current);
      setIsMeditating(false);
      Alert.alert('Meditation Complete', 'Your meditation for today is completed');
      if (sound) {
        sound.stopAsync();
      }
    }, 840000); // 14 minutes
  };

  const stopMeditation = () => {
    clearInterval(timerRef.current);
    setIsMeditating(false);
    setSeconds(0);
    if (sound) {
      sound.stopAsync();
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <LinearGradient colors={['#e0f7e9', '#a8e6cf']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Breathe. Relax. Reconnect.</Text>

        {!isMeditating ? (
          <Text style={styles.instructionText}>Close your eyes and start meditating.</Text>
        ) : (
          <Text style={styles.timer}>{`Time: ${formatTime(seconds)}`}</Text>
        )}

        <View style={styles.gifWrapper}>
          <Image
            source={require('../assets/7TAQ.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>

        {!isMeditating ? (
          <TouchableOpacity style={styles.button} onPress={startMeditation}>
            <Text style={styles.buttonText}>Start Guided Meditation</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopMeditation}>
            <Text style={styles.buttonText}>Stop Meditation</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.imageCaption}>Let your thoughts flow like the river...</Text>
      </View>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#388e3c',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 22,
    color: '#388e3c',
    fontWeight: '600',
    marginBottom: 20,
  },
  gifWrapper: {
    width: width * 0.85,
    height: 300,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  imageCaption: {
    fontSize: 12,
    color: '#2e7d32',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default MeditationScreen;
