import { Stack } from "expo-router"


const rootLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default rootLayout