import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface textInputProps {
    keyboardType: KeyboardTypeOptions | undefined
    label: string
}

export default function CustomTextInput({ keyboardType, label }: textInputProps) {

    return (
        <View className="w-full h-[100px] ">
            <Text className=" ml-10 text-xl font-bold mb-3">{label}</Text>
            <TextInput 
                keyboardType={keyboardType}
                
                className="p-4 border-[1px] rounded-lg border-black mx-10"
            />
        </View>

       
    )
} 