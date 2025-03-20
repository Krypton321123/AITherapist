import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const router = useRouter(); 

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => {router.push('/(main)/(tabs)/home')}} className="h-[35%] flex justify-center bg-gray-200 m-4 rounded-full">
                <Ionicons className="w-6 absolute ml-4" size={20} name="chatbubble-ellipses-outline"/>
                <Text className="ml-12 text-xl font-semibold">Chat With AI!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}