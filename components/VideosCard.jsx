import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {icons} from "../constants"
import { ResizeMode, Video } from 'expo-av';

const VideosCard = ({item : {title, thumbnail , video , 
        creator : {username , avatar}}}) => {


        const [play , setPlay] = useState(false);


    return (
        <View className='flex-col items-center px-4 mb-10'>
            <View className='flex-row  justify-between items-center w-full px-4 py-2'>
                <View className='flex-row gap-4 justify-start items-start flex-1 '>
                    
                    <View className='border-secondary border w-[46px] h-[46px] rounded-lg
                                        flex justify-center items-center'>
                        <Image
                            source={{uri:avatar}}
                            resizeMode='contain'
                            className='h-full w-full rounded-lg'
                        />
                    </View>
                    <View className='items-start justify-center gap-y-1'>
                        
                        <Text   className='text-white font-psemibold text-sm'
                                numberOfLines={1}>
                            {title}
                            </Text>
                        
                        <Text className='text-white font-pregular text-xs' >
                            {username}</Text>
                    </View>

                </View>
                <View className='flex-row h-full items-start'>
                    <Image
                        source={icons.menu}
                        resizeMode='contain'
                        
                        className='w-5 h-5'
                    />
                </View>
            </View>

            {/* playing videos */}
            {play ? (
                
                <Video
                
                    source={{uri:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                    className='w-full h-60 rounded-lg px-4'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                        setPlay(false);
                        }
                    }}
                />

            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>setPlay(true)}
                    className='relative w-full h-60 mt-4 rounded-lg px-4'
                >
                    <Image
                        source={{uri:thumbnail}}
                        resizeMode='cover'
                        className='w-full h-full rounded-lg'
                    />
                    <Image 
                        source={icons.play}
                        resizeMode='contain'
                        className='w-12 h-12 absolute left-[48%] top-[80px]'
                    />
                </TouchableOpacity>
            )}
            

        </View>
    )
}

export default VideosCard