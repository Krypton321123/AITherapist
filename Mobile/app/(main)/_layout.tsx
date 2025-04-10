import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout() {
    const router = useRouter();

   

    return (
      
        <Stack screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="home"
                options={{
                    header: () => (
                        <LinearGradient
                            colors={["#4A90E2", "#007AFF"]}
                            className="p-6 rounded-b-3xl shadow-md"
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-white text-2xl font-bold">
                                        AI Therapist
                                    </Text>
                                    <Text className="text-white text-sm opacity-80">
                                        Your personal mental wellness assistant
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => router.push('/(main)/(tabs)/profile')}
                                    className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
                                >
                                    <Ionicons name="person" size={28} color="white" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    ),
                }}
            />
        </Stack>
    );
}