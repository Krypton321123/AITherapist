import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
const router = useRouter();

const moods = [
  { name: 'Sleepy', icon: 'meh-rolling-eyes', color: '#F28C61' },
  { name: 'Neutral', icon: 'meh', color: '#FFD93D' },
  { name: 'Happy', icon: 'smile-beam', color: '#B4E197' },
  { name: 'Excited', icon: 'laugh-beam', color: '#B4A7FF' },
];

export default function MoodSelectionScreen() {
  const [selectedMood, setSelectedMood] = useState('Neutral');

  const data = useUserStore((s) => s.data)
  useEffect(() => {
    setTimeout(() => {
      console.log(data)
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      {/* Top step label  */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}></Text>
       </View>

      {/* Heading */}
      <Text style={styles.heading}>How would you describe your mood?</Text>

      {/* Selected mood text */}
      <Text style={styles.currentMood}>I Feel {selectedMood}.</Text>

      {/* Big emoji */}
      <FontAwesome5 
        name={moods.find(m => m.name === selectedMood).icon} 
        size={50} 
        color={moods.find(m => m.name === selectedMood).color} 
        style={styles.mainEmoji}
      />

      {/* Mood options */}
      <View style={styles.emojiRow}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.name}
            onPress={() => setSelectedMood(mood.name)}
            style={[
              styles.emojiCircle,
              { backgroundColor: mood.color },
              selectedMood === mood.name && styles.selectedBorder
            ]}
          >
            <FontAwesome5 name={mood.icon} size={24} color="#000" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue button */} 
      { <TouchableOpacity style={styles.button}  onPress={() => router.push('/assessment-five')}  >
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>
}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf9f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#f1dcd4',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stepText: {
    fontSize: 12,
    color: '#432818',
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#432818',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentMood: {
    fontSize: 14,
    color: '#432818',
    marginBottom: 10,
  },
  mainEmoji: {
    marginBottom: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width - 60,
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  emojiCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 8,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#432818',
  },
  // button: {
  //   backgroundColor: '#432818',
  //   paddingVertical: 12,
  //   paddingHorizontal: 30,
  //   borderRadius: 24,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  button: {
    backgroundColor: '#4B3E2A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});











// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import React, { useState } from 'react';

// export default function MoodSelection() {
//   const [selectedMood, setSelectedMood] = useState('neutral');

//   const moods = [
//     { id: 'sad', label: 'I feel Sad', emoji: require('../assets/sad.png') },
//     // { id: 'sleepy', label: 'I feel Sleepy', emoji: require('../assets/sleepy.png') },
//     { id: 'neutral', label: 'I feel Neutral', emoji: require('../assets/confused.png') },
//     { id: 'happy', label: 'I feel Happy', emoji: require('../assets/smile.png') },
//     { id: 'excited', label: 'I feel Excited', emoji: require('../assets/happy-face.png') },
//   ];

//   const selectedLabel = moods.find(m => m.id === selectedMood)?.label;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>How would you describe your mood?</Text>
//       <Text style={styles.subtitle}>{selectedLabel}</Text>

//       {/* Big Selected Emoji */}
//       <Image source={moods.find(m => m.id === selectedMood).emoji} style={styles.bigEmoji} />

//       {/* Emoji Options */}
//       <View style={styles.emojiRow}>
//         {moods.map(mood => (
//           <TouchableOpacity key={mood.id} onPress={() => setSelectedMood(mood.id)}>
//             <Image
//               source={mood.emoji}
//               style={[
//                 styles.emoji,
//                 selectedMood === mood.id && styles.selectedEmoji
//               ]}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Continue Button */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Continue →</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fdf9f7',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#432818',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: '#555',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   bigEmoji: {
//     width: 60,
//     height: 60,
//     marginBottom: 25,
//   },
//   emojiRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 40,
//   },
//   emoji: {
//     width: 50,
//     height: 50,
//     marginHorizontal: 5,
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   selectedEmoji: {
//     borderColor: '#432818',
//   },
//   button: {
//     backgroundColor: '#432818',
//     paddingHorizontal: 40,
//     paddingVertical: 12,
//     borderRadius: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });









// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import React, { useState } from 'react';

// export default function MoodSelection() {
//   const [selectedMood, setSelectedMood] = useState('neutral');

//   const moods = [
//     { id: 'sleepy', label: 'I Feel Sleepy.', emoji: require('../assets/smile.png') },
//     { id: 'neutral', label: 'I Feel Neutral.', emoji: require('../assets/confused.png') },
//     { id: 'happy', label: 'I Feel Happy.', emoji: require('../assets/happy-face.png') },
//   ];

//   const selectedLabel = moods.find(m => m.id === selectedMood)?.label;

//   return (
//     <View style={styles.container}>
//       {/* Spacer to push content slightly down */}
//       <View style={{ flex: 1 }} />

//       <Text style={styles.title}>How would you describe your mood?</Text>
//       <Text style={styles.subtitle}>{selectedLabel}</Text>

//       {/* Main Mood Emoji */}
//       <Image
//         source={moods.find(m => m.id === selectedMood).emoji}
//         style={styles.bigEmoji}
//       />

//       {/* Emoji Options */}
//       <View style={styles.emojiRow}>
//         {moods.map(mood => (
//           <TouchableOpacity key={mood.id} onPress={() => setSelectedMood(mood.id)}>
//             <Image
//               source={mood.emoji}
//               style={[
//                 styles.emoji,
//                 selectedMood === mood.id && styles.selectedEmoji
//               ]}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Continue Button */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Continue →</Text>
//       </TouchableOpacity>

//       {/* Bottom Spacer */}
//       <View style={{ flex: 1 }} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fdf9f7',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#432818',
//     textAlign: 'center',
//     marginBottom: 6,
//   },
//   subtitle: {
//     color: '#555',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   bigEmoji: {
//     width: 60,
//     height: 60,
//     marginBottom: 25,
//   },
//   emojiRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 30,
//   },
//   emoji: {
//     width: 50,
//     height: 50,
//     marginHorizontal: 10,
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   selectedEmoji: {
//     borderColor: '#432818',
//   },
//   button: {
//     backgroundColor: '#432818',
//     paddingHorizontal: 40,
//     paddingVertical: 12,
//     borderRadius: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
