
import { View, Text, TouchableOpacity, KeyboardAvoidingView, KeyboardAvoidingViewComponent } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTextInput from '@/components/onboarding/customTextInput'
import { useRouter } from 'expo-router'

const signup = () => {

    const router = useRouter(); 

  return (
    <SafeAreaView>
      <View className="w-full h-[35%] flex justify-center items-center">
           <Text className="text-2xl font-semibold">Welcome to AI Therapist</Text>
           <Text className="mt-10">The first place where you matter</Text>
      </View>
        <KeyboardAvoidingView className="w-full h-[20%] flex items-center">
            <CustomTextInput label="Username" keyboardType="default"/>
            <CustomTextInput label="Email" keyboardType="default"/>
            <CustomTextInput label="Password" keyboardType="default"/>
            <CustomTextInput label="Confirm Password" keyboardType="default"/>
            <TouchableOpacity className="w-[80%] h-[40px] rounded-lg bg-blue-500 text-lg  flex justify-center items-center ">
                <Text className="text-white font-semibold text-lg">Sign Up</Text>
            </TouchableOpacity>
            <Text className="mt-4 text-lg font-semibold">Already Signed Up? <Text className="text-blue-500" onPress={() => {router.replace('/(onboarding)/home')}}>Login</Text></Text>
        </KeyboardAvoidingView>

       
    </SafeAreaView>
  )
}

export default signup