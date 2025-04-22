import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import API_URL from '@/constants/API_URL';

const ChatWithMindy: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputText, setInputText] = useState('');

  const getBotResponse: (messageHistory: any[]) => Promise<void> = async (messageHistory: any[]) => {
    const response: any = await axios.post(`${API_URL}/chat/generate`, {messageHistory}) 
    const botMessage = { text: response.data.generatedText, isUser: false };

    setMessages((prev) => [...prev, botMessage]);
  };

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;
  
    const userMessage = { text: inputText, isUser: true };
  
  
    const updatedMessages = [...messages, userMessage];
  
  
    setMessages(updatedMessages);
    setInputText('');
    getBotResponse(updatedMessages);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with Mindy</Text>

      {/* Chat Messages */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatWithMindy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F4',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3e3e2a',
    textAlign: 'center',
    marginBottom: 10,
  },
  chatContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#9BCF53',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#9BCF53',
    borderRadius: 20,
  },
});



