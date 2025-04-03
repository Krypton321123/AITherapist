import ClickableAction from "@/components/main/clickableAction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const router = useRouter(); 

    return (
        <SafeAreaView className="flex-1 bg-gray-100 p-4">
            <View className="items-center my-6">
                <Text className="text-2xl font-semibold text-gray-800">Welcome!</Text>
                <Text className="text-gray-500 text-center text-sm">Feeling Down? Chat or Call with a AI therapist Right now!</Text>
            </View>

            
            <View className="flex-1 justify-center items-center gap-4 space-y-4">
                <TouchableOpacity 
                    className="w-4/5 flex-row items-center justify-center bg-blue-500 p-4 rounded-2xl shadow-lg"
                    onPress={() => router.push('/(main)/(tabs)/ChatScreen')}
                >
                    <Ionicons name="chatbubbles-outline" size={24} color="white" />
                    <Text className="ml-2 text-white text-lg font-semibold">Chat with AI</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="w-4/5 flex-row items-center justify-center bg-green-500 p-4 rounded-2xl shadow-lg"
                    onPress={() => router.push('/(main)/(tabs)/ChatScreen')}
                >
                    <Ionicons name="call-outline" size={24} color="white" />
                    <Text className="ml-2 text-white text-lg font-semibold">Call with AI</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}