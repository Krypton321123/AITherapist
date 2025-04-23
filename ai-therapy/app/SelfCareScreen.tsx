import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MotiView } from 'moti';

const affirmations = [
  "I am enough just as I am.",
  "I radiate positivity and confidence.",
  "I trust myself and my journey.",
  "I am calm, I am peaceful, I am grounded.",
  "I choose happiness over fear.",
  "I am proud of the progress I’ve made.",
  "My mind is strong and resilient.",
  "I give myself permission to grow.",
  "I believe in myself and my abilities.",
  "Today, I will focus on what makes me feel good.",
  "I am doing my best, and that is enough.",
  "I am grateful for this moment.",
  "I attract love, joy, and positivity.",
  "I deserve peace and serenity.",
  "I am in control of my thoughts and emotions.",
  "My self-worth is not defined by others.",
  "I let go of what I can’t control.",
  "I celebrate my uniqueness.",
  "Every step I take is a step forward.",
  "I am growing and glowing."
];

const shuffledAffirmations = affirmations.sort(() => 0.5 - Math.random()).slice(0, 5);

const SelfCareScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Self-Care Affirmations</Text>
      <FlatList
        data={shuffledAffirmations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FlipCard affirmation={item} />}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const FlipCard = ({ affirmation }: { affirmation: string }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity onPress={() => setFlipped(!flipped)}>
      <View style={styles.cardWrapper}>
        <MotiView
          from={{ rotateY: '180deg' }}
          animate={{ rotateY: flipped ? '180deg' : '0deg' }}
          transition={{ type: 'timing', duration: 500 }}
          style={[styles.card, flipped && styles.flipped]}
        >
          <View style={[styles.cardFace, styles.front]}>
            <Text style={styles.cardText}>Tap for Affirmation</Text>
          </View>
          <View style={[styles.cardFace, styles.back]}>
            <Text style={styles.cardText}>{affirmation}</Text>
          </View>
        </MotiView>
      </View>
    </TouchableOpacity>
  );
};

export default SelfCareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDE8',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#355E3B',
    marginBottom: 20,
  },
  cardList: {
    paddingBottom: 20,
  },
  cardWrapper: {
    width: '100%',
    height: 160,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'relative',
    backfaceVisibility: 'hidden',
    shadowColor: '#355E3B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardFace: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backfaceVisibility: 'hidden',
  },
  front: {
    backgroundColor: '#A0E7E5',
    zIndex: 2,
  },
  back: {
    backgroundColor: '#B4F8C8',
    transform: [{ rotateY: '180deg' }],
  },
  flipped: {
    transform: [{ rotateY: '180deg' }],
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#355E3B',
    fontWeight: '600',
  },
});