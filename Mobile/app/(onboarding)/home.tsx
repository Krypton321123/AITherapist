import CustomTextInput from "@/components/onboarding/customTextInput";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {

    const router = useRouter()
    return (
        <SafeAreaView className="w-full h-full">
            <View className="w-full h-[35%] flex justify-center items-center">
                <Text className="text-2xl font-semibold">Welcome to AI Therapist</Text>
                <Text className="mt-10">The first place where you matter</Text>
            </View>
            <View className="w-full h-[20%] flex items-center">
                <CustomTextInput label="Username" keyboardType="default"/>
                <CustomTextInput label="Password" keyboardType="default"/>
                <TouchableOpacity className="w-[80%] h-[40px] rounded-lg bg-blue-500 text-lg  flex justify-center items-center ">
                    <Text className="text-white font-semibold text-lg">Log In</Text>
                </TouchableOpacity>
                <Text className="mt-4 text-lg font-semibold">Not Signed Up? <Text className="text-blue-500" onPress={() => {}}>Login</Text></Text>
            </View>
        </SafeAreaView>
    )
}