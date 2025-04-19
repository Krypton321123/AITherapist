import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const EmergencyToolkit: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Toolkit</Text>
      <Text style={styles.subtitle}>Tap the buttons below{"\n"}when you’re feeling low.</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="flower-outline" size={36} color="#355E3B" />
          <Text style={styles.buttonText}>Breathing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="call" size={36} color="#355E3B" />
          <Text style={styles.buttonText}>Call a friend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Entypo name="music" size={36} color="#355E3B" />
          <Text style={styles.buttonText}>Uplifting{"\n"}music</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="brain" size={32} color="#355E3B" />
          <Text style={styles.buttonText}>Mental{"\n"}exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmergencyToolkit;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEFFE8', // very light yellow-green background
      paddingHorizontal: 24,
      paddingTop: 60,
    },
    title: {
    marginTop: 70,
      fontSize: 28,
      fontWeight: 'bold',
      color: '#355E3B', // deep green
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      color: '#5A7B52',
      textAlign: 'center',
      marginBottom: 30,
      lineHeight: 24,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    button: {
      width: '47%',
      backgroundColor: '#E9F8D8', // soft green
      borderRadius: 20,
      paddingVertical: 50,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      marginTop: 10,
      textAlign: 'center',
      fontSize: 16,
      color: '#355E3B',
      fontWeight: '600',
    },
  });
  
