import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { router } from 'expo-router';
// const router = useRouter();

const PhysicalDistressScreen: React.FC = () => {
  const [checked, setChecked] = useState<'yes' | 'no'>('no');

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Are you experiencing any physical distress?</Text>

      <TouchableOpacity
        style={[styles.optionBox, checked === 'yes' && styles.selectedBox]}
        onPress={() => setChecked('yes')}
      >
        <RadioButton
          value="yes"
          status={checked === 'yes' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('yes')}
          color="#5D3FD3"
        />
        <View>
          <Text style={styles.optionTitle}>Yes, one or multiple</Text>
          <Text style={styles.optionText}>
            I'm experiencing physical pain in different place over my body.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionBox, checked === 'no' && styles.selectedBoxGreen]}
        onPress={() => setChecked('no')}
      >
        <RadioButton
          value="no"
          status={checked === 'no' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('no')}
          color="#fff"
        />
        <View>
          <Text style={styles.optionTitleWhite}>No Physical Pain At All</Text>
          <Text style={styles.optionTextWhite}>
            I'm not experiencing any physical pain in my body at all :)
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push('/assessment-six')} // Update route here
      >
        <Text style={styles.continueText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhysicalDistressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B3E2A',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: '#A087FF',
    backgroundColor: '#F1EDFF',
  },
  selectedBoxGreen: {
    backgroundColor: '#B6D7A8',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E3E3E',
  },
  optionText: {
    fontSize: 14,
    color: '#5F5F5F',
    marginTop: 4,
  },
  optionTitleWhite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionTextWhite: {
    fontSize: 14,
    color: '#F0F0F0',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#4B3E2A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
