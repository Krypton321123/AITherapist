import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const exercises = [
  {
    title: "Pay Attention",
    description: "Take time to experience your environment with all senses — touch, sound, sight, smell, and taste.",
  },
  {
    title: "Live in the Moment",
    description: "Intentionally bring open, accepting attention to everything you do. Find joy in simple things.",
  },
  {
    title: "Accept Yourself",
    description: "Treat yourself with the same kindness and understanding you’d offer a friend.",
  },
  {
    title: "Focus on Breathing",
    description: "Sit, close your eyes, and observe your breath. Just 1 minute can ground you.",
  },
  {
    title: "Body Scan Meditation",
    description: "Lie down and bring awareness to each part of your body from toes to head.",
  },
  {
    title: "Sitting Meditation",
    description: "Sit still with straight back, close eyes, and follow your breath. Gently return if distracted.",
  },
  {
    title: "Walking Meditation",
    description: "Walk slowly in a quiet place and feel each step, each sensation in your body.",
  },
];

export default function MindfulnessScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/mindfulness.png')} // Optional calming image
          style={styles.image}
        />
        <Text style={styles.title}>Mindfulness Techniques</Text>
        <Text style={styles.subtitle}>Reconnect with yourself, one breath at a time.</Text>
      </View>
      
      {exercises.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardText}>{item.description}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🕊️ Practice daily — even for 5 minutes — and notice your peace grow.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f5f3',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 370,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2a9d8f',
  },
  subtitle: {
    fontSize: 16,
    color: '#264653',
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#bde0fe',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#023047',
  },
  cardText: {
    fontSize: 14,
    color: '#023047',
    marginTop: 4,
  },
  footer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2a9d8f',
    textAlign: 'center',
  },
});
