import { View, StyleSheet} from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import {useFonts} from "expo-font"
import GlobalProvider from '../context/GlobalContext';

// Import your global CSS file
import "../global.css";


import { useEffect } from 'react';



// Prevent the splash screen from auto-hiding before asset loading is complete.
//Don’t hide the splash screen automatically
SplashScreen.preventAutoHideAsync();


export default function Root() {




    const [FontsLoaded , error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    })


    useEffect(()=>{

        if(error) throw new Error("Error loading fonts")// If there's an error, stop and show an error message.

        if(FontsLoaded) {
            SplashScreen.hideAsync(); // If fonts are loaded, hide the splash screen.
        }    

    } , [FontsLoaded , error])


    if (!FontsLoaded) {
        return null;
    }
    
    

return (
    <GlobalProvider>
        <Stack>
        
        <Stack.Screen name='index' options={{
            headerShown: false
            }}/>

        <Stack.Screen name='(tabs)' options={{
            headerShown: false
            }}/>

        <Stack.Screen name='(auth)' options={{
                    headerShown: false
                    }}/>    

        <Stack.Screen name='search/[query]' options={{
                    headerShown: false
                    }}/>  

        
        </Stack>
    </GlobalProvider>
    
)

}

