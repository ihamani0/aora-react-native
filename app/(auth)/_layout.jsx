import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default  AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen 
                    name='sing-in' 
                    options={{headerShown: false}} />

                <Stack.Screen 
                    name='sing-up' 
                    options={{headerShown: false}} />    
            </Stack>
            <StatusBar style='light' backgroundColor='#161622'/>
        </>
    )
}

