import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {images} from "../constants"

import CostumButton from "../components/CostumButton"

const EmptyState = ({title , subtitle , showButton}) => {
    return (
        <View className='w-full px-4 justify-center items-center'>
            <Image
                source={images.empty}
                resizeMode='contain'
                className='w-[270px] h-[215px]'
            />

            <View className='mb-2'>
                <Text className='text-gray-100 text-xl text-center font-pmedium'>{title}</Text>
                <Text className='text-gray-100 text-sm text-center font-pregular'>{subtitle}</Text>
            </View>


            {showButton && (

            <CostumButton
                title='Create Vidoes'
                containerStyle='mb-2 w-full'
                
            />
            
            )}
            
        </View>
    )
}

export default EmptyState

