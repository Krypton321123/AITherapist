
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const EmergencyToolkit = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Emergency Toolkit 🧰</Text>
      <Text style={styles.subHeaderText}>
        Feeling overwhelmed? Try one of these quick self-help tools to feel better.
      </Text>

      {/* Breathing Animation */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Breathing Exercise 🌬️</Text>
        <Image
          source={require('@/assets/giphy.gif')} // use a looping breathing gif
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Call a Friend Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Calling your emergency contact...')}>
        <Ionicons name="call" size={24} color="#22c55e" />
        <Text style={styles.buttonText}>Call a Friend</Text>
      </TouchableOpacity>

      {/* Uplifting Music */}
      <View style={styles.musicCard}>
        <Text style={styles.musicCardTitle}>Uplifting Music 🎵</Text>
        <TouchableOpacity style={styles.musicButton} onPress={() => alert('Playing soothing music')}>
          <Text style={styles.musicButtonText}>Play Nature Sounds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.musicButton} onPress={() => alert('Playing happy vibes')}>
          <Text style={styles.musicButtonText}>Play Happy Vibes</Text>
        </TouchableOpacity>
      </View>

      {/* Mental Exercises */}
      <View style={styles.mentalExercises}>
        <Text style={styles.mentalExercisesTitle}>Mental Exercises 🧠</Text>
        <TouchableOpacity style={styles.exerciseLink} onPress={() => alert('Redirecting to journaling...')}>
          <Text>📝 Quick Gratitude Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exerciseLink} onPress={() => alert('Redirecting to positive affirmations...')}>
          <Text>💬 Positive Affirmations</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFFE8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#D1F7D1',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2F4F40',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#22c55e',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#2D6A4F',
    marginLeft: 15,
  },
  musicCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#D1F7D1',
    borderWidth: 1,
  },
  musicCardTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2D6A4F',
    marginBottom: 15,
  },
  musicButton: {
    // backgroundColor: '#A7F3D0',
    backgroundColor: '#E9F8D8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  musicButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#2F4F40',
  },
  mentalExercises: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#D1F7D1',
    borderWidth: 1,
  },
  mentalExercisesTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2D6A4F',
    marginBottom: 10,
  },
  exerciseLink: {
    color: '#047857',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default EmergencyToolkit;


