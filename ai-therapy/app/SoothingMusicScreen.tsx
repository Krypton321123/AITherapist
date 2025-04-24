import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; // Importing icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for gradient effect

// Music categories and their corresponding files
const musicCategories = [
  { id: '1', name: 'Relaxing Music', musicFile: require('../assets/relaxing.mp3'), description: 'Makes you feel calm and at peace.' },
  { id: '2', name: 'Happy Music', musicFile: require('../assets/happy.mp3'), description: 'Makes you feel instantly happy and positive.' },
  { id: '3', name: 'Focus Music', musicFile: require('../assets/focus.mp3'), description: 'Helps you concentrate and stay productive.' },
  { id: '4', name: 'Nature Sounds', musicFile: require('../assets/nature.mp3'), description: 'Sounds of nature to calm your mind.' },
  { id: '5', name: 'Calm Your Anger/Anxiety', musicFile: require('../assets/anger_anxiety.mp3'), description: 'Helps you calm down and manage anger or anxiety.' },
];

const SoothingMusicScreen = () => {
  const [sound, setSound] = useState<any>(null);
  const [playing, setPlaying] = useState<{ [key: string]: boolean }>({});

  // Toggle music on and off
  const toggleMusic = async (id: string, musicFile: any) => {
    const isPlaying = playing[id];

    // Update the state to toggle between playing and paused
    setPlaying(prev => ({ ...prev, [id]: !isPlaying }));

    if (isPlaying) {
      await stopMusic(id);
    } else {
      await startMusic(id, musicFile);
    }
  };

  // Start playing music
  const startMusic = async (id: string, musicFile: any) => {
    // Stop any other music before starting new one
    if (sound) {
      await stopMusic(id);
    }

    const { sound } = await Audio.Sound.createAsync(musicFile);
    setSound(sound);
    await sound.playAsync();
    setPlaying(prev => ({ ...prev, [id]: true }));
  };

  // Stop music
  const stopMusic = async (id: string) => {
    if (sound) {
      await sound.stopAsync();
      setPlaying(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎶 Soothing Music</Text>
      <FlatList
        data={musicCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, playing[item.id] && styles.cardPlaying]}
            onPress={() => toggleMusic(item.id, item.musicFile)}
          >
            <LinearGradient
              colors={['#a1c4fd', '#c2e9fb']} // Gradient colors from soft blue to light blue
              style={styles.cardGradient}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <TouchableOpacity style={styles.playPauseButton} onPress={() => toggleMusic(item.id, item.musicFile)}>
                <Ionicons
                  name={playing[item.id] ? 'pause-circle' : 'play-circle'}
                  size={50}
                  color={playing[item.id] ? '#FF7043' : '#4CAF50'}
                />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SoothingMusicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4E665A',
    marginBottom: 20,
  },
  cardList: {
    paddingBottom: 30,
  },
  card: {
    width: '100%',
    height: 200, // Increased height for better spacing
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden', // Prevent content from spilling over rounded corners
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    shadowColor: '#A0A0A0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardPlaying: {
    backgroundColor: 'transparent', // Remove background color to let the gradient show through
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#355E3B',
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#355E3B',
    marginVertical: 10,
  },
  playPauseButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    transform: [{ scale: 1.1 }],
  },
});
