 import React, { useState } from 'react';
 import { useRouter } from 'expo-router';
 const router = useRouter();

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

const Dashboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { icon: require('../assets/red.png'), label: 'Sad' },
    { icon: require('../assets/orange.png'), label: 'Anxious' },
    { icon: require('../assets/grey.png'), label: 'Neutral' },
    { icon: require('../assets/green.png'), label: 'Happy' },
    { icon: require('../assets/green2.png'), label: 'Excited' },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Home</Text>
          <Ionicons name="search" size={24} color="#3e3e2a" />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Introduction to Mental Health Issues</Text>
          <Image source={require('../assets/banner (2).png')} style={styles.bannerImage} />
        </View>

        {/* Mood card */}
        <View style={styles.moodCard}>
          <Text style={styles.moodCardText}>How do you feel today?</Text>
          <View style={styles.moodIconRow}>
            {moods.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedMood(item.label)}>
                <Image source={item.icon} style={styles.moodIcon} />
              </TouchableOpacity>
            ))}
          </View>
          {selectedMood && (
            <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '600', color: '#3e3e2a' }}>
              You feel: {selectedMood}
            </Text>
          )}
        </View>

        {/* Chat options */}
        <View style={styles.chatContainer}>
          <TouchableOpacity style={styles.chatCard}  onPress={() => router.push('/MindyChat')}>
            <Image source={require('../assets/robot.png')} style={styles.chatImage} />
            <Text style={styles.chatText}>Chat with{'\n'}Mindy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatCard}>
            <Image source={require('../assets/coach.png')} style={styles.chatImage} />
            <Text style={styles.chatText}>Talk with{'\n'}Coach</Text>
          </TouchableOpacity>
        </View>

        {/* Plans */}
        <Text style={styles.planHeader}>Your plans for today (0/5)</Text>

        <View style={styles.planCard}>
          <View style={styles.planLine} />
          <View style={styles.planContent}>
            <Text style={styles.planTitle}>Intro to Meditation</Text>
            <Text style={styles.planSubtitle}>8 mins</Text>
          </View>
          <Image source={require('../assets/yoga1.png')} style={styles.planImage} />
        </View>

        <View style={styles.planCard}>
          <View style={styles.planLine} />
          <View style={styles.planContent}>
            <Text style={styles.planTitle}>Mindfulness Techniques to...</Text>
            <Text style={styles.planSubtitle}>2 mins read</Text>
          </View>
          <Image source={require('../assets/doctor1.png')} style={styles.planImage} />
        </View>
      </ScrollView>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/toolkit2')}>
          <Ionicons name="home" size={26} style={[styles.tabIcon, styles.tabIconActive]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/voice')}>
          <Feather name="compass" size={26} style={styles.tabIconInactive} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/toolkit')}>
          <Feather name="moon" size={26} style={styles.tabIconInactive} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/mood')}>
          <FontAwesome5 name="chart-line" size={24} style={styles.tabIconInactive} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => router.push('/profile')} >
          <Ionicons name="person" size={26} style={styles.tabIconInactive} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Dashboard;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F9F8F4',
    backgroundColor: '#FEFFE8',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3e3e2a',
      },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  banner: {
        marginVertical: 20,
        backgroundColor: '#CAE675',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      bannerText: {
        flex: 1,
        color: '#3e3e2a',
        fontWeight: 'bold',
        fontSize: 19,
      },
      bannerImage: {
        width: 150,
        height: 100,
        resizeMode: 'cover',
      },
  moodPrompt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  chatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  chatCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 4,
  },
  chatImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  chatText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  planHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  planLine: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9BCF53',
    marginRight: 10,
  },
  planContent: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  planImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  moodCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  
  moodCardText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  moodIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  
  moodIcon: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    marginTop: 8,
  },
  
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  tabIcon: {
    color: '#9BCF53',
  },
  
  tabIconActive: {
    color: '#9BCF53',
  },
  
  tabIconInactive: {
    color: '#ccc',
  },
  moodLabel: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  
  
  
});
