import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import API_URL from '@/constants/API_URL';

const WelcomeScreen: React.FC = () => {
  const [permissionResponse, requestPermission] = Audio.usePermissions()
  const [conversation, setConversation] = useState<{userText: string, AIResponse: string}[]>([]) 
  const [recording, setRecording] = useState<any>(); 
  const [audioInstances, setAudioInstances] = useState<Audio.Sound[]>()

  useEffect(() => {
    let soundInstance: Audio.Sound;
  
    const speakIntro = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/intro.mp3')
      );
      soundInstance = sound;
      console.log('playing sound...');
      await sound.playAsync();
    };
  
    speakIntro();
  
    return () => {
      if (soundInstance) {
        soundInstance.stopAsync();
        soundInstance.unloadAsync();
        console.log('Sound stopped and unloaded on screen leave');
      }
    };
  }, []);

  const recordAudio = async () => {

    if (permissionResponse === null) return;
    try {


      if (permissionResponse.status !== 'granted') {
        console.log('persmission not granted')
        await requestPermission()
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true, 
        allowsRecordingIOS: true
      })

      console.log("starting recording")
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
      console.log(recording, typeof recording)
    }
   
    catch (err) {
      console.log("err in recording audio: ", err)
    }
  }

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
   
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    const fileinfo = await FileSystem.getInfoAsync(uri)
    console.log(fileinfo)

    // const { sound } = await Audio.Sound.createAsync({ uri })
    // await sound.playAsync(); 
    // await sound.unloadAsync(); 

    if (!fileinfo.exists) {
      return Alert.alert('Failed to record audio')
    }

    const fileUri = fileinfo.uri;

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'recording.m4a', 
      type: 'audio/x-m4a',    
    } as any);
    
    formData.append('conversation', JSON.stringify(conversation))
    const response: any = await axios.post(`${API_URL}/chat/generateVoice`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log(response.data)
      try {
        const { filebase64, mime } = response.data.audio;
      console.log(conversation)
      const fileUri = `data:${mime};base64,${filebase64}`
      const {sound} = await Audio.Sound.createAsync({ uri: fileUri }); 
      await sound.playAsync(); 
      setConversation((prev) => [...prev, {userText: response.data.data.userText, AIResponse: response.data.data.AIResponse}])
    
      } catch (err) {
        console.log("error in playing response: ", err)
      }
      }

    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hi, I’m Mindy,{"\n"}your AI therapist.{"\n"}Let’s talk.
      </Text>

      <Image
        source={require('../assets/avatar.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.micButton} onPress={recording ? stopRecording : recordAudio}>
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
