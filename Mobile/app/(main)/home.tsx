import ClickableAction from "@/components/main/clickableAction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";

export default function Home() {
    const router = useRouter(); 
    const [showMoodModal, setShowMoodModal] = useState(true);

    const MoodPopup = (
        <Modal
            isVisible={showMoodModal}
            backdropOpacity={0.5}
            animationIn="zoomIn"
            animationOut="zoomOut"
            useNativeDriver
        >
            <View className="bg-white rounded-2xl p-6 items-center shadow-lg space-y-4 gap-4">
                <Text className="text-xl font-semibold text-gray-800">Hey there 👋</Text>
                <Text className="text-base text-gray-600 text-center">How are you feeling today?</Text>

                <TouchableOpacity
                    className="w-full bg-green-100 py-3 rounded-xl items-center"
                    onPress={() => setShowMoodModal(false)}
                >
                    <Text className="text-green-700 text-lg font-medium">😄 I’m feeling great</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-yellow-100 py-3 rounded-xl items-center"
                    onPress={() => setShowMoodModal(false)}
                >
                    <Text className="text-yellow-700 text-lg font-medium">🙂 I’m feeling okay</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-red-100 py-3 rounded-xl items-center"
                    onPress={() => setShowMoodModal(false)}
                >
                    <Text className="text-red-600 text-lg font-medium">😞 I’m feeling down</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    return (
        <>
            {MoodPopup}
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
            <View className="flex-row justify-around items-center bg-white border-t border-gray-200 p-4 rounded-t-2xl shadow-lg">
                <TouchableOpacity
                    className="flex-1 items-center"
                    onPress={() => router.push('/(main)/(tabs)/journal')}
                >
                    <Ionicons name="book-outline" size={24} color="#4A90E2" />
                    <Text className="text-sm text-blue-600 mt-1 font-medium">Journal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 items-center"
                    onPress={() => router.push('/(main)/(tabs)/mood')}
                >
                    <Ionicons name="calendar-outline" size={24} color="#4A90E2" />
                    <Text className="text-sm text-blue-600 mt-1 font-medium">Mood Calendar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}