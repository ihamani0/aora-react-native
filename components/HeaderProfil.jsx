import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { icons } from '../constants'

const HeaderProfil = ({user , lenghtPost , logOut}) => {


    

    return (
        <View className="w-full justify-center items-center mb-12 mt-6 px-4">

                
                <TouchableOpacity className='w-full items-end mb-8 px-4'
                    onPress={logOut}
                    >
                    <Image 
                        source={icons.logout}
                        resizeMode='contain'
                        className='w-8 h-8'
                        />
                </TouchableOpacity>

                <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center mb-4'>
                    <Image 
                        source={{uri : user?.avatar}}
                        resizeMode='contain'
                        className='w-[90%] h-[90%] rounded-lg'
                    />
                </View>


                <View className='justify-center items-center  mb-4 '>
                    <Text className='text-gray-100 text-lg font-psemibold '>{user?.username}</Text>
                </View>

                <View className='flex-row w-full justify-around items-center  mb-4'>
                    
                    <View className='justify-center items-center'>
                        <Text className='text-gray-100 text-xl font-psemibold '>{lenghtPost}</Text>
                        <Text className='text-gray-100 text-sm font-pregular '>Posts</Text>
                    </View>

                    <View className='justify-center items-center'>
                        <Text className='text-gray-100 text-xl font-psemibold '>0</Text>
                        <Text className='text-gray-100 text-sm font-pregular '>Views</Text>

                    </View>
                </View>
                


        </View>
    )
}

export default HeaderProfil