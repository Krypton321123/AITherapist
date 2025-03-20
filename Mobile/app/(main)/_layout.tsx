import { Stack } from "expo-router";

export default function OnboardingLayout() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="home" options={{ headerShown: true }}/>
        </Stack>
    )
}