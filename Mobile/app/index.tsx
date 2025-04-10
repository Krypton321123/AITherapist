
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Index = () => {
    const [redirectTo, setRedirectTo] = useState<'/(main)/home' | '/(onboarding)/home' | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const loggedIn = await AsyncStorage.getItem('loggedIn')
            const userId = await AsyncStorage.getItem('userId')

            console.log(loggedIn, userId)

            if (loggedIn === 'true' && userId) {
                setRedirectTo('/(main)/home')
            } else {
                setRedirectTo('/(onboarding)/home')
            }
        }

        checkUser(); 
    }, [])

    if (redirectTo === null) return null; 

    return <Redirect href={redirectTo}/>
}

export default Index; 