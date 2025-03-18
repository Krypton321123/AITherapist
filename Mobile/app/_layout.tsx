import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '@/global.css'


export default function RootLayout() {
  
  return (
    <Stack>
      <Stack.Screen name='(main)' options={{headerShown: false}} />
      <Stack.Screen name='(onboarding)' options={{headerShown: false}}/>
      <Stack.Screen name='index'  options={{ headerShown: false }}/>
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}
