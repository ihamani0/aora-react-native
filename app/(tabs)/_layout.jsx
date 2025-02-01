import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


import {icons} from '../../constants'
import { StatusBar } from 'expo-status-bar'

const TabIcon = ({icon , color , name , focused})=>{

    return (
        <View className="items-center justify-center gap-2 w-80" style={{marginTop:10}} >
            <Image source={icon}
            resizeMode="contain"
            tintColor={color}
            className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                // numberOfLines={1}
                style={{ color  :'white' }}
            >{name}</Text>
        </View>
    )
}

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel : false,
                tabBarActiveTintColor : '#FF9C01',
                tabBarInactiveTintColor : '#CDCDE0',
                tabBarStyle : {
                    backgroundColor : '#161622',
                    borderTopColor : '#232533',
                    borderTopWidth : 1,
                    height : 60,
                    paddingBottom : 10,
                }
            }}
            
        >

            {/* -----------------Home------------------------ */}
            <Tabs.Screen
                name='Home'
                options={{
                    title : 'Home',
                    headerShown: false,
                    tabBarIcon : ({color , focused})=>(
                        <TabIcon 
                            icon  = {icons.home}
                            color={color}
                            focused={focused}
                            name='Home'
                        />
                    )
                }}
            />
            {/* -------------------Create---------------------- */}
            <Tabs.Screen
                name='Create'
                options={{
                    title : 'Create',
                    headerShown: false,
                    tabBarIcon : ({color , focused})=>(
                        <TabIcon 
                            icon  = {icons.plus}
                            color={color}
                            focused={focused}
                            name='Create'
                        />
                    )
                }}
            />
            {/* -----------------BookMark------------------------ */}
            <Tabs.Screen
                name='BookMark'
                options={{
                    title : 'BookMark',
                    headerShown: false,
                    tabBarIcon : ({color , focused})=>(
                        <TabIcon 
                            icon  = {icons.bookmark}
                            color={color}
                            focused={focused}
                            name='Bookmark'
                        />
                    )
                }}
            />
            {/* -----------------Profile------------------------ */}
            
            <Tabs.Screen
                name='Profile'
                options={{
                    title : 'Profile',
                    headerShown: false,
                    tabBarIcon : ({color , focused})=>(
                        <TabIcon 
                            icon  = {icons.profile}
                            color={color}
                            focused={focused}
                            name='Profile'
                        />
                    )
                }}
            />


               
        </Tabs>
    )
}

export default TabLayout


//tabBarActiveTintColor: 'blue'
// tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,

