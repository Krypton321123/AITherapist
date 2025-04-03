import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import API_URL from '@/api';

const API_URL1 = `${API_URL}/chat/create`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am AI. How can I assist you today?', sender: 'AI' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim().length === 0 || loading) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'User' };
    const updatedMessages = [...messages, userMessage]; 

    setMessages(updatedMessages);
    setInputText('');
    setLoading(true);

    try {

        console.log(inputText)

      const { data }: { data: any } = await axios.post(API_URL1, { chatHistory: updatedMessages });

      if (data.status) {
        const aiResponse = { id: Date.now() + 1, text: data.response, sender: 'AI' };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } else {
        console.error('Error from API:', data.message);
      }
    } catch (error) {
      console.error('Error connecting to AI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className={`p-3 rounded-lg max-w-[75%] my-1 ${item.sender === 'User' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
            <Text className="text-black">{item.text}</Text>
          </View>
        )}
      />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-row items-center mt-2 border-t border-gray-300 p-2">
        <TextInput
          className="flex-1 border border-gray-400 rounded-md p-2"
          placeholder="Type a message..."
          value={inputText}
          multiline
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} className="ml-2 p-2 bg-blue-500 rounded-md" disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Send</Text>}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;