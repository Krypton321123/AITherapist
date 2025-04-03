import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function ClickableAction({ label }: {label: string}) {
    const router = useRouter();

    return (
        <TouchableOpacity 
            onPress={() => {router.push('/(main)/(tabs)/CallScreen')}} 
            className="h-20 flex-row items-center bg-white m-4 rounded-full shadow-lg px-6 border border-gray-300"
        >
            <View className="bg-blue-500 p-3 rounded-full shadow-md">
                <Ionicons size={24} name="chatbubble-ellipses-outline" color="white"/>
            </View>
            <Text className="ml-4 text-lg font-semibold text-gray-900">{label}</Text>
        </TouchableOpacity>
    )
}

export default ClickableAction