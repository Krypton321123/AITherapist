import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Modal from "react-native-modal";

const STORAGE_KEY = "journal_entries";

const journal = () => {
    const router = useRouter();
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const loadEntries = async () => {
            console.log("in load entries")
            try {
                const data = await AsyncStorage.getItem(STORAGE_KEY);

                console.log(data)
                if (data) {
                    const parsed = JSON.parse(data);
                    const sorted = parsed.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                    setEntries(sorted);
                }
            } catch (err) {
                console.error("Failed to load journal entries:", err);
            }
        };
        loadEntries();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white relative px-4">
            <View className="py-5 border-b border-gray-200">
                <Text className="text-2xl font-bold text-gray-800">📝 Your Journal</Text>
                <Text className="text-sm text-gray-500 mt-1">Tap an entry to view it in full</Text>
            </View>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                useNativeDriver
            >
                <View className="bg-white p-5 rounded-2xl shadow-lg max-h-[80%]">
                    <Text className="text-sm text-gray-500 mb-2">
                        {selectedEntry && new Date(selectedEntry.timestamp).toLocaleString()}
                    </Text>
                    <Text className="text-base text-gray-800">
                        {selectedEntry?.content}
                    </Text>
                    <TouchableOpacity
                        className="mt-4 self-end px-4 py-2 bg-blue-500 rounded-full"
                        onPress={() => setModalVisible(false)}
                    >
                        <Text className="text-white font-medium">Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {entries.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-lg text-gray-500">No journal entries yet</Text>
                    <Text className="text-3xl mt-2">📓</Text>
                </View>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
                            onPress={() => {
                                setSelectedEntry(item);
                                setModalVisible(true);
                            }}
                        >
                            <Text className="text-xs text-gray-500 mb-1">
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                            <Text className="text-base text-gray-800">
                                {item.content.length > 100 ? item.content.slice(0, 100) + "..." : item.content}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}
            <TouchableOpacity
                className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                onPress={() => router.push('/(main)/(tabs)/newEntry')}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default journal;