import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const questions = [
  {
    type: 'memory',
    prompt: 'Remember this sequence:\n🟡🔴🔵🟢',
    answer: '🟡🔴🔵🟢',
  },
  {
    type: 'math',
    prompt: 'What is 17 × 3?',
    answer: '51',
  },
  {
    type: 'pattern',
    prompt: 'What comes next?\n2, 4, 8, 16, ?',
    answer: '32',
  },
];

const MentalExerciseScreen: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
      setShowAnswer(false);
    } else {
      Alert.alert('Well done!', 'You’ve completed today’s mental workout 🧠');
      setCurrent(0);
      setShowAnswer(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Exercise</Text>

      <Text style={styles.prompt}>{questions[current].prompt}</Text>

      {showAnswer && <Text style={styles.answer}>Answer: {questions[current].answer}</Text>}

      <TouchableOpacity style={styles.button} onPress={() => setShowAnswer(true)}>
        <Text style={styles.buttonText}>Reveal Answer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={nextQuestion}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MentalExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDE8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#355E3B',
    marginBottom: 30,
  },
  prompt: {
    fontSize: 24,
    color: '#355E3B',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 36,
  },
  answer: {
    fontSize: 20,
    color: '#4B7B47',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#355E3B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
    marginBottom: 12,
  },
  nextButton: {
    backgroundColor: '#6AA84F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});