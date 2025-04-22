import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'


const WelcomeScreen: React.FC = () => {

  const [sound, setSound] = useState<Audio.Sound | null>(null)

  useEffect(() => {
    console.log(sound)
    speakIntro();
  }, []);

  const speakIntro = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/audio/intro.mp3'))
    setSound(sound)
    console.log("playing sound")
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hi, I’m Mindy,{"\n"}your AI therapist.{"\n"}Let’s talk.
      </Text>

      <Image
        source={require('../assets/avatar.png')} // 👈 Ensure this file exists
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.micButton} onPress={speakIntro}>
        <Ionicons name="mic" size={28} color="#4A5933" />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFFE8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: '#2F3E1F',
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 34,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 40,
  },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#B3D87A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
  },
});
