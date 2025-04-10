import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "journal_entries";

const newEntry = () => {
    const router = useRouter();
    const [entryText, setEntryText] = useState("");

    const handleSave = async () => {

        console.log(entryText.trim() === '')
        if (entryText.trim() === '') return router.back();

        const newEntry = {
            id: uuidv4(),
            content: entryText.trim(),
            timestamp: new Date().toISOString(),
        };

        console.log(newEntry.id)

        try {

            console.log('came in here')
            const existing = await AsyncStorage.getItem(STORAGE_KEY);
            console.log(existing)
            const entries = existing ? JSON.parse(existing) : [];
            entries.push(newEntry);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        } catch (err) {
            console.error("Failed to save journal entry:", err);
        }

        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-blue-600 font-medium text-base">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-gray-800">New Entry</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text className="text-blue-600 font-medium text-base">Done</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    className="flex-1 text-base text-gray-800 p-4"
                    placeholder="Start writing your thoughts..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    textAlignVertical="top"
                    
                    onChangeText={(value) => {setEntryText(value)}}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default newEntry;