// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import * as Speech from 'expo-speech';
// import { Ionicons } from '@expo/vector-icons';

// type ChatMessage = {
//   text: string;
//   isUser: boolean;
// };

// const AvatarInteractionScreen: React.FC = () => {
//   const [input, setInput] = useState<string>('');
//   const [chat, setChat] = useState<ChatMessage[]>([]);

//   const getBotReply = (message: string): string => {
//     const lower = message.toLowerCase();
//     if (lower.includes('sad') || lower.includes('depressed')) {
//       return 'I’m here for you. Let’s take a deep breath together. 🌿';
//     }
//     if (lower.includes('anxiety') || lower.includes('panic')) {
//       return 'Try inhaling deeply... and exhale slowly. Feel the calm coming in. 🧘‍♀️';
//     }
//     if (lower.includes('happy')) {
//       return 'Yay! That makes me smile too 😊';
//     }
//     return 'I’m listening. You’re not alone 💚';
//   };

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg: ChatMessage = { text: input, isUser: true };
//     const botReply = getBotReply(input);
//     const botMsg: ChatMessage = { text: botReply, isUser: false };

//     setChat((prevChat) => [...prevChat, userMsg, botMsg]);

//     Speech.speak(botReply, {
//       rate: 0.9,
//       pitch: 1,
//       voice: undefined,
//     });

//     setInput('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Mindy, Your Calm Companion</Text>

//       <Image
//         source={require('../assets/avatar.png')} // make sure this path is correct
//         style={styles.avatar}
//       />

//       <ScrollView contentContainerStyle={styles.chatContainer}>
//         {chat.map((msg, index) => (
//           <View
//             key={index}
//             style={[
//               styles.bubble,
//               msg.isUser ? styles.userBubble : styles.botBubble,
//             ]}
//           >
//             <Text style={styles.text}>{msg.text}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={80}
//         style={styles.inputArea}
//       >
//         <TextInput
//           placeholder="Talk to Mindy..."
//           style={styles.input}
//           value={input}
//           onChangeText={setInput}
//         />
//         <TouchableOpacity style={styles.button} onPress={sendMessage}>
//           <Ionicons name="send" size={24} color="#fff" />
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default AvatarInteractionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3FEE1',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//   },
//   header: {
//     fontSize: 22,
//     textAlign: 'center',
//     color: '#3A5500',
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     alignSelf: 'center',
//     marginBottom: 20,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: '#A4E05C',
//   },
//   chatContainer: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   bubble: {
//     maxWidth: '75%',
//     padding: 12,
//     borderRadius: 16,
//     marginVertical: 6,
//   },
//   userBubble: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#B8E986',
//   },
//   botBubble: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: '#d2e59e',
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
//   inputArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderColor: '#dcdcdc',
//     padding: 10,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   button: {
//     marginLeft: 10,
//     backgroundColor: '#9BCF53',
//     borderRadius: 20,
//     padding: 10,
//   },
// });





// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import * as Speech from 'expo-speech';
// import { Ionicons } from '@expo/vector-icons';

// const WelcomeScreen: React.FC = () => {
//   useEffect(() => {
//     Speech.speak("Hi, I’m Mindy, your AI therapist. Let’s talk.", {
//       voice: undefined, // will use default female voice in most OS
//       rate: 0.95,
//       pitch: 1.1,
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Hi, I’m Mindy,{"\n"}your AI therapist.{"\n"}Let’s talk.</Text>
//       <Image
//         source={require('../assets/avatar.png')} // <-- Replace with your uploaded image path
//         style={styles.image}
//         resizeMode="contain"
//       />
//       <TouchableOpacity style={styles.micButton}>
//         <Ionicons name="mic" size={28} color="#4A5933" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFFE8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     textAlign: 'center',
//     fontSize: 30,
//     color: '#2F3E1F',
//     fontWeight: '600',
//     marginBottom: 20,
//     lineHeight: 34,
//   },
//   image: {
//     width: 300,
//     height: 400,
//     marginBottom: 40,
//   },
//   micButton: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#B3D87A',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//   },
// });







import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen: React.FC = () => {
  useEffect(() => {
    // Auto play Mindy's intro when screen loads
    speakIntro();
  }, []);

  const speakIntro = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      console.log('Available Voices:', voices);

      // Try to find a female English voice
      const femaleVoice = voices.find(
        (v) =>
          v.language.startsWith('en') &&
          v.quality === 'Enhanced' &&
          v.name.toLowerCase().includes('female')
      );

      Speech.speak("Hi, I’m , your AI therapist. Let’s talk.", {
        voice: femaleVoice?.identifier,
        rate: 0.95,
        pitch: 1.1,
      });
    } catch (error) {
      console.error('Speech error:', error);
      Alert.alert('Speech Error', 'Text-to-speech failed to initialize.');
    }
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
