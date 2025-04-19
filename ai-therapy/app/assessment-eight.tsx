import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { router } from 'expo-router';

const DescribeYourselfScreen: React.FC = () => {
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>(['Introvert', 'Afraid of people', 'Neuroticism', 'Sensitive']);
  const mostCommon = ['easy feel sad', 'pessimistic'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How would you describe yourself?</Text>

      <Image
        source={require('../assets/abc.png')} // Replace with your image
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.chipContainer}>
        {tags.map((tag, index) => (
          <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
            {tag}
          </Chip>
        ))}

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Type something..."
          style={styles.input}
          multiline
        />

        <Text style={styles.charCount}>{description.length}/10</Text>
      </View>

      <View style={styles.mostCommonContainer}>
        <Text style={styles.mostCommonLabel}>Most Common:</Text>
        <View style={styles.commonChips}>
          {mostCommon.map((tag, index) => (
            <Chip
              key={index}
              style={styles.commonChip}
              textStyle={styles.commonChipText}
              closeIcon="close"
              onClose={() => {}}
            >
              {tag}
            </Chip>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push('/assessment-nine')}
      >
        <Text style={styles.continueText}>Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DescribeYourselfScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF7F2',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B3E2A',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 120,
    marginBottom: 20,
  },
  chipContainer: {
    backgroundColor: '#F0F0E9',
    borderRadius: 20,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  chip: {
    backgroundColor: '#E2F5DE',
    marginBottom: 5,
    marginRight: 5,
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#4B3E2A',
    fontSize: 14,
  },
  input: {
    minHeight: 50,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  charCount: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#999',
    fontSize: 12,
  },
  mostCommonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  mostCommonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B3E2A',
    marginBottom: 5,
  },
  commonChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  commonChip: {
    backgroundColor: '#FFBFA3',
    marginRight: 8,
  },
  commonChipText: {
    color: '#4B3E2A',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#4B3E2A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },
});
