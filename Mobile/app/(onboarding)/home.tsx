import API_URL from "@/api";
import CustomTextInput from "@/components/onboarding/customTextInput";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function Home() {
    const router = useRouter()

    
    const [formData, setFormData] = useState({
        username: '', password: ''
    })

    const handleSubmit = async () => {

        console.log("we are here")

        if (formData.username.trim() === '' || formData.password.trim() === '') {
            return Toast.show({type: 'error', text1: "Fields are empty"})
        }

        const response: any = await axios.post(`${API_URL}/user/login`, {username: formData.username.trim(), password: formData.password.trim()})
        console.log(response)
        if (response.status === 200 || response.status === 201) {
            await AsyncStorage.setItem("userId", response.data.userId)
            await AsyncStorage.setItem("loggedIn", "true")
            router.push('/(main)/home'); 
            return Toast.show({type: 'success', text1: "Logged in successfully"})
        } else {
            return Toast.show({type: 'error', text1: response.data.message})
        }

         
    }

    
    return (
        <SafeAreaView className="w-full h-full">
            <View className="w-full h-[35%] flex justify-center items-center">
                <Text className="text-2xl font-semibold">Welcome to AI Therapist</Text>
                <Text className="mt-10">The first place where you matter</Text>
            </View>
            <View className="w-full h-[20%] flex items-center">
                <CustomTextInput onChangeText={(value) => {setFormData({...formData, username: value}); console.log(formData)}} label="Username" keyboardType="default"/>
                <CustomTextInput onChangeText={(value) => {setFormData({...formData, password: value})}} label="Password" keyboardType="default"/>
                <TouchableOpacity onPress={handleSubmit} className="w-[80%] h-[40px] rounded-lg bg-blue-500 text-lg  flex justify-center items-center ">
                    <Text className="text-white font-semibold text-lg">Log In</Text>
                </TouchableOpacity>
                <Text className="mt-4 text-lg font-semibold">Not Signed Up? <Text className="text-blue-500" onPress={() => {router.replace('/(onboarding)/signup')}}>Sign Up</Text></Text>
            </View>
        </SafeAreaView>
    )
}