import { Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'


export default function OnboardingLayout() {

    const router = useRouter(); 

    return (
        <Stack screenOptions={{
            headerShadowVisible: false
        }}>
            <Stack.Screen name="(tabs)" options={{ headerTitle: "AI Therapist" }}/>
            <Stack.Screen name="home" options={{ 
                headerTitle: () => {
                    return (
                        <Text className="flex justify-center items-center text-xl font-semibold">AI Therapist</Text>
                    )
                }, 
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => {router.push('/(main)/(tabs)/profile')}}>
                            <Ionicons size={32} name="person"/>
                        </TouchableOpacity>
                    )
                },
                headerLeft: () => {
                    return (
                        <></>
                    )
                }, 
                headerStyle: {

                }
            }}/>
        </Stack>
    )
}