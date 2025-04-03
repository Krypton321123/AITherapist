import { Stack } from 'expo-router';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message'
import '@/global.css'



export default function RootLayout() {
  
  return (
    <ToastProvider>
      <Stack>
        <Stack.Screen name='(onboarding)' options={{headerShown: false}}/>
        <Stack.Screen name='(main)' options={{headerShown: false}} />
        <Stack.Screen name='index'  options={{ headerShown: false }}/>
        <Stack.Screen name='+not-found' />
      </Stack>
    </ToastProvider>
  );
}

const ToastProvider = ({children}: {children: React.ReactNode}) => {

  return <>
    {children}
    <Toast />
  </>
}
