import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, Alert } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import API_URL from '@/api';

const CallScreen = () => {
  const [recording, setRecording] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [responseText, setResponseText] = useState('');
  const scaleAnim = useRef<any>(new Animated.Value(1)).current;
  const animationRef = useRef<any>(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable microphone access in settings.');
        return;
      }

      const { recording }: {recording: any} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setIsRecording(true);

      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      );
      animationRef.current.start();
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    animationRef.current?.stop();
    Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    if (uri) {
      await sendAudioToBackend(uri);
    }
  };

  const sendAudioToBackend = async (audioUri: any) => {
    try {
      const formData: any = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/mp4',
        name: 'audio.mp4',
      });

      const response: any = await axios.post(`${API_URL}/chat/call`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseText(response.data.text);
    } catch (error) {
      console.error('Error sending audio:', error);
      Alert.alert('Error', 'Failed to send audio.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
      <Text className="text-xl font-semibold text-gray-800">Talk to AI</Text>
      <Text className="text-sm text-gray-500 mb-6">Hold the button, speak, and release</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPressIn={startRecording}
          onPressOut={stopRecording}
          disabled={isRecording}
          className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        >
          {isRecording ? <ActivityIndicator color="white" size="large" /> : <Ionicons name="mic" size={40} color="white" />}
        </TouchableOpacity>
      </Animated.View>

      {responseText ? (
        <View className="mt-6 p-4 bg-gray-200 rounded-lg max-w-[80%]">
          <Text className="text-black">{responseText}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default CallScreen;
