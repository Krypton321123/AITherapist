import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MotiView } from 'moti';

const selfCareTips = [
  "Take yourself on a coffee date ☕️",
  "Buy yourself your favorite chocolate 🍫",
  "Watch your comfort movie 🎬",
  "Write a love letter to yourself 💌",
  "Go for a peaceful solo walk 🚶‍♀️",
  "Treat yourself to a relaxing bath 🛁",
  "Listen to your favorite music 🎧",
  "Cook or order your favorite meal 🍜",
  "Spend time journaling your thoughts 📝",
  "Light a candle and just breathe 🕯️",
  "Unplug from social media for an hour 📵",
  "Dance like nobody's watching 💃",
  "Compliment yourself in the mirror 💖",
  "Wear your favorite outfit 👗",
  "Do something creative – paint, draw, or craft 🎨",
  "Stretch and do some gentle yoga 🧘‍♀️",
  "Say no without guilt ❌",
  "Declutter a small space 🌿",
  "Drink water like it's a luxury 💧",
  "Take a nap without shame 😴"
];

const shuffledTips = selfCareTips.sort(() => 0.3 - Math.random()).slice(0, 3);

const SelfCareScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Your Self-Care Tip For Today ✨</Text>
      <FlatList
        data={shuffledTips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FlipCard tip={item} />}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const FlipCard = ({ tip }: { tip: string }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity onPress={() => setFlipped(!flipped)} activeOpacity={0.9}>
      <View style={styles.card}>
        {/* Front Side */}
        <MotiView
          style={[StyleSheet.absoluteFill, styles.cardFace, styles.front]}
          animate={{
            rotateY: flipped ? '180deg' : '0deg',
            opacity: flipped ? 0 : 1,
          }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <Text style={styles.cardText}>Tap for Your Self-Care Tip 💌</Text>
        </MotiView>

        {/* Back Side */}
        <MotiView
          style={[StyleSheet.absoluteFill, styles.cardFace, styles.back]}
          animate={{
            rotateY: flipped ? '0deg' : '180deg',
            opacity: flipped ? 1 : 0,
          }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <Text style={styles.cardText}>🌿 {tip}</Text>
        </MotiView>
      </View>
    </TouchableOpacity>
  );
};

export default SelfCareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4E665A',
    marginBottom: 20,
  },
  cardList: {
    paddingBottom: 30,
  },
  card: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A0A0A0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    transformStyle: 'preserve-3d', // ensure 3D transform works
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  front: {
    backgroundColor: '#E0F7FA',
  },
  back: {
    backgroundColor: '#D0F0C0',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#355E3B',
  },
});
