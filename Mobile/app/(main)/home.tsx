import { useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const router = useRouter(); 

    return (
        <SafeAreaView>
            <Text onPress={() => {router.replace('/(onboarding)/home')}}>Howdy from home</Text>
        </SafeAreaView>
    )
}