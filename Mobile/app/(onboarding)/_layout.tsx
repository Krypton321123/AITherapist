import { Stack } from "expo-router";

export default function OnboardingLayout() {

    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }}/>
        </Stack>
    )
}