import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const settingsOptions = [
  { label: 'Account', icon: <Feather name="user" size={18} color="#4B4B4B" /> },
  {
    label: 'Notifications',
    icon: <Ionicons name="notifications-outline" size={18} color="#4B4B4B" />,
  },
  {
    label: 'Account & Security',
    icon: <MaterialIcons name="security" size={18} color="#4B4B4B" />,
  },
  {
    label: 'Billing & Subscriptions',
    icon: <Ionicons name="card-outline" size={18} color="#4B4B4B" />,
  },
  {
    label: 'Payment Methods',
    icon: <Feather name="credit-card" size={18} color="#4B4B4B" />,
  },
  {
    label: 'Linked Accounts',
    icon: <FontAwesome5 name="link" size={16} color="#4B4B4B" />,
  },
  {
    label: 'App Appearance',
    icon: <Ionicons name="color-palette-outline" size={18} color="#4B4B4B" />,
  },
  {
    label: 'Data & Analytics',
    icon: <Feather name="bar-chart-2" size={18} color="#4B4B4B" />,
  },
  {
    label: 'Help & Support',
    icon: <Ionicons name="help-circle-outline" size={18} color="#4B4B4B" />,
  },
];

const ProfileScreen = () => {
  
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      Alert.alert('Logged Out', 'You have been logged out.');
      router.replace('/welcome')
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.profileTitle}>Profile</Text>
        <View style={styles.profileInfo}>
          <Image
            source={require('../assets/profile.png')} // Replace with your avatar image
            style={styles.avatar}
          />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.name}>User</Text>
            
          </View>
        </View>
      </View>

      {/* Settings List */}
      <ScrollView contentContainerStyle={styles.settingsList}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity style={styles.row} key={index}>
            <View style={styles.rowLeft}>
              {item.icon}
              <Text style={styles.rowText}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#B4B4B4" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFFE8',
  },
  header: {
    backgroundColor: '#CAE675',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  profileTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  badge: {
    backgroundColor: '#ffffff',
    color: '#4CAF50',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    fontWeight: '500',
  },
  settingsList: {
    padding: 20,
    paddingBottom: 50,
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});