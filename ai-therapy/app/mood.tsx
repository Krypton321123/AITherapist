
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import API_URL from '@/constants/API_URL';

interface MoodData {
  date: string
  mood: string 
  username: string
}

const MoodStats = () => {
  const moodEmojiMap: Record<string, string> = {
    HAPPY: '😄',
    SAD: '😢',
    NEUTRAL: '😐',
    EXCITED: '😁',
    CALM: '🙂',
    RELAXED: '😌',
    ANGRY: '😠',
  };
  const [moodData, setMoodData] = useState<MoodData[] | null>(null)

  const getPastWeekMoods = () => {
    if (!moodData) return [];
  
    const week = [];
    const today = new Date();
  
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = date.toLocaleDateString('en-GB', { weekday: 'short' });
  
      const isoDate = date.toISOString().split('T')[0];
  
      const moodEntry = moodData.find(m =>
        m.date.startsWith(isoDate)
      );

      console.log(moodEntry?.mood)
  
      const mood = moodEntry ? moodEmojiMap[moodEntry.mood.toUpperCase()] || '❓' : '❓';
  
      week.push({ day, mood });
    }
  
    return week;
  };
  
  const weekMoods = getPastWeekMoods();

  const moodChart = [
    { time: '10:00', emoji: '😄', height: 100, color: '#A3DCA6' },
    { time: '12:00', emoji: '😐', height: 80, color: '#D0E8A1' },
    { time: '14:00', emoji: '😢', height: 60, color: '#F28B82' },
    { time: '16:00', emoji: '😁', height: 90, color: '#A3DCA6' },
    { time: '18:00', emoji: '😐', height: 70, color: '#D0E8A1' },
  ];

  useEffect(() => {
    const getData = async () => {
      const username = await AsyncStorage.getItem('username'); 

      try {

        const response: any = await axios.post(`${API_URL}/user/getMoods`, {username})

        if (response.status === 200 || response.status === 201) {
          console.log(response.data.moodData)
          setMoodData(response.data.moodData)
          return; 
        }

      } catch(err) {
        console.log(err)
        return alert('error in fetching data')
      }
    }

    getData(); 
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <Text style={styles.greeting}>Hey, Anamika! </Text>
      <Text style={styles.date}>Sun, 4 Jun</Text>

      {/* Calendar Strip */}
      <View style={styles.calendarRow}>
      {weekMoods.map((item, idx) => (
  <View
    key={idx}
    style={[
      styles.dayItem,
      idx === weekMoods.length - 1 && styles.selectedDay, // Today
    ]}
  >
    <Text style={[styles.dayText, idx === weekMoods.length - 1 && styles.dayTextSelected]}>{item.day}</Text>
    <Text style={styles.emoji}>{item.mood}</Text>
  </View>
))}
      </View>

      {/* Check-in */}
      <View style={styles.checkInBox}>
        <Text style={styles.checkInText}>Today’s check-in</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
          <Text style={styles.progressText}>3/3 🔥</Text>
        </View>
      </View>

      {/* Mood Chart */}
      <View style={styles.chartBox}>
        <Text style={styles.sectionTitle}>Mood chart</Text>
        <View style={styles.chartRow}>
          {moodChart.map((item, index) => (
            <View key={index} style={styles.barItem}>
              <View style={[styles.chartBar, { height: item.height, backgroundColor: item.color }]}>
                <Text style={styles.chartEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.reasonBox}>
  <Text style={styles.reasonTitle}>Top Mood Reason</Text>
  <Text style={styles.reasonText}>
    😔 You felt <Text style={{ fontWeight: 'bold' }}>disappointed</Text> mostly today.  
    Reason: <Text style={{ fontStyle: 'italic' }}>"Work pressure and skipped meals."</Text>
  </Text>
</View>
      <View style={styles.summaryBox}>
  <Text style={styles.summaryTitle}>Summary</Text>
  <Text style={styles.summaryText}>
    You're feeling <Text style={{ fontWeight: 'bold' }}>okay</Text> today.
    Keep up with the positivity and try a quick meditation or walk 🌿
  </Text>
</View>
<View style={styles.activitySection}>
  <Text style={styles.sectionTitle}>Suggested for You</Text>
  <View style={styles.card}>
    <Text style={styles.cardTitle}>🌼 Guided Breathing</Text>
    <Text style={styles.cardSub}>3 mins · Reduce stress</Text>
  </View>
  <View style={styles.card}>
    <Text style={styles.cardTitle}>🧘 Mindful Walk</Text>
    <Text style={styles.cardSub}>5 mins · Clear your mind</Text>
  </View>
</View>



    </ScrollView>

  
  );
};

export default MoodStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBEF', // soft greenish background
    padding: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3E5748',
  },
  date: {
    fontSize: 14,
    color: '#6C8B72',
    marginBottom: 20,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F5E8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  dayItem: {
    alignItems: 'center',
    padding: 6,
  },
  selectedDay: {
    backgroundColor: '#A3DCA6',
    borderRadius: 12,
  },
  dayText: {
    fontSize: 12,
    color: '#4E4E4E',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  emoji: {
    fontSize: 18,
    marginTop: 4,
  },
  checkInBox: {
    backgroundColor: '#DFF3D8',
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  checkInText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B6945',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#C6E6B3',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: 8,
    width: '100%',
    backgroundColor: '#7DCB83',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressText: {
    position: 'absolute',
    right: 8,
    top: -18,
    fontSize: 12,
    color: '#3E5748',
  },
  chartBox: {
    backgroundColor: '#F0F5E8',
    borderRadius: 20,
    padding: 16,
  },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#3E5748',
//     marginBottom: 12,
//   },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barItem: {
    alignItems: 'center',
    width: 40,
  },
  chartBar: {
    width: 30,
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    marginBottom: 6,
  },
  chartEmoji: {
    fontSize: 18,
  },
  timeText: {
    fontSize: 12,
    color: '#4E4E4E',
  },
  summaryBox: {
    backgroundColor: '#E7F5DC',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6342',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 14,
    color: '#5D7256',
    lineHeight: 20,
  },
  activitySection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6342',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#F0F5E8',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3F5B3C',
  },
  cardSub: {
    fontSize: 12,
    color: '#6C8B72',
    marginTop: 4,
  },
  reasonBox: {
    backgroundColor: '#FCEEEA',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B55E4E',
    marginBottom: 6,
  },
  reasonText: {
    fontSize: 14,
    color: '#5E4B4B',
    lineHeight: 20,
  },
  
  
});
