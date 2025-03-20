
import { View, Text, TouchableOpacity, KeyboardAvoidingView, KeyboardAvoidingViewComponent } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTextInput from '@/components/onboarding/customTextInput'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import API_URL from '@/api'

const signup = () => {

    const router = useRouter(); 

    const [formData, setFormData] = useState({
        username: '', password: '', email: '', confirmPassword: '' 
    })

    const handleSubmit = async () => {
        console.log("came here")

        if (formData.username.trim() === '' || formData.email.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === '' ) {
            return Toast.show({type: 'error', text1: "Sorry, but fields are empty"})
        }

        if (formData.confirmPassword !== formData.password) {
            return Toast.show({type: 'error', text1: "Password not matching with confirm password"})
        }

        console.log("Are we here")
        const response: any = await axios.post(`${API_URL}/user/signup`, formData)
        

        if (response.status === 200 || response.status === 201) {
            Toast.show({type: 'success', text1: "Account created succesfully"})
            return router.replace('/(main)/home')
        } else {
            return Toast.show({type: 'error', text1: response.data.data.message})
        }
    }

  

  return (
    <SafeAreaView>
      <View className="w-full h-[35%] flex justify-center items-center">
           <Text className="text-2xl font-semibold">Welcome to AI Therapist</Text>
           <Text className="mt-10">The first place where you matter</Text>
      </View>
        <KeyboardAvoidingView className="w-full h-[20%] flex items-center">
            <CustomTextInput onChangeText={(value) => {setFormData({...formData, username: value})}} label="Username" keyboardType="default"/>
            <CustomTextInput onChangeText={(value) => {setFormData({...formData, email: value})}} label="Email" keyboardType="default"/>
            <CustomTextInput onChangeText={(value) => {setFormData({...formData, password: value})}} label="Password" keyboardType="default"/>
            <CustomTextInput onChangeText={(value) => {setFormData({...formData, confirmPassword: value})}} label="Confirm Password" keyboardType="default"/>
            <TouchableOpacity onPress={handleSubmit} className="w-[80%] h-[40px] rounded-lg bg-blue-500 text-lg  flex justify-center items-center ">
                <Text className="text-white font-semibold text-lg">Sign Up</Text>
            </TouchableOpacity>
            <Text className="mt-4 text-lg font-semibold">Already Signed Up? <Text className="text-blue-500" onPress={() => {router.replace('/(onboarding)/home')}}>Login</Text></Text>
        </KeyboardAvoidingView>

       
    </SafeAreaView>
  )
}

export default signup