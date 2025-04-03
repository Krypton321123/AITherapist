import { Stack } from "expo-router";
import { View, Text } from "react-native";

const ChatHeader = () => {
    return (
        <View className="bg-blue-500 p-4 items-center">
            <Text className="text-white text-lg font-bold">💬 Chat with AI</Text>
            <Text className="text-gray-200 text-sm">Your friendly AI companion</Text>
        </View>
    );
};

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="ChatScreen" 
                options={{ 
                    headerShown: true,
                    header: () => <ChatHeader />
                }}
            />
            <Stack.Screen 
                name="CallScreen"
                options={{
                    headerShown: true, 
                    header: () => <ChatHeader />
                }}/>
        </Stack>
    );
}