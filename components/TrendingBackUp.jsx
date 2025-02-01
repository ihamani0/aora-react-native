import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import * as Animatable from "react-native-animatable";
import { icons } from '../constants';
import { VideoView , useVideoPlayer } from 'expo-video';
import { useEvent } from 'expo';




const zoomIn = {
    0  :{scale : 0.9,opacity : 0.4 } , 
    1 : { scale : 1,opacity : 1}
}

const zoomOut = {
    0  :{scale : 1,opacity : 1} , 
    1 : {scale : 0.9,opacity : 0.4}
}



const TrendingItem = ({item, activeItem, playingVideo, setPlayingVideo})=>{
    
    const isPlaying = playingVideo === item.$id;
    
    const [play, setPlay] = useState(false)


    const videoSource = item.video;


    const player = useVideoPlayer(videoSource, (player) => {
        if (isPlaying) {
            player.play();
        } else {
            player.pause();
        }
    });

    // Control video playback when `play` changes
    useEffect(() => {
        if (isPlaying) {
            player.play();
        } else {
            player.pause();
        }
    }, [isPlaying]);

    
    const hadnlePlayingVideo = ()=>{
        if(playingVideo !== item.$id){
            setPlayingVideo(item.$id)
        }
    }
    // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    



    return (
        <Animatable.View
            className=" mr-5  "
            animation={ activeItem === item.$id ? zoomIn : zoomOut }
            duration={500}
            
        >
            { isPlaying ? (
                
                <VideoView
                
                    style={{
                        width: 150,
                        height: 275,
                        borderRadius : 35 ,
                    }}
                    player={player}
                    contentFit='cover'
                />
                
                
            ) : (
                <TouchableOpacity 

                    activeOpacity={0.7}
                    // onPress={() => setPlay(true)}
                    onPress={hadnlePlayingVideo}
                    className='relative w-[150px] h-[250px]  justify-center items-center '
                    >
                    
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.backgroundImg}
                        resizeMode="cover"
                    />

                    <Image 
                        source={icons.play}
                        resizeMode='contain'
                        className='absolute w-12 h-12'
                    />
                    

                    
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({posts}) => {

    const [activeItem, setActiveItem] = useState(posts[0]?.$id || null)

    const [playingVideo, setPlayingVideo] = useState(null);

    const viewableItemsChanged = ({ viewableItems })=>{
        
        //key is proprty from viewAbleItems
        if(viewableItems.length > 0){
            setActiveItem(viewableItems[0].key)
        }

    }


    return (
        <FlatList 

            horizontal
        
            data={posts}

            keyExtractor={(p) => p.$id.toString()}

            renderItem={ ( {item} ) => (

                <TrendingItem 
                    item={item}
                    activeItem={activeItem}
                    playingVideo={playingVideo}
                    setPlayingVideo={setPlayingVideo}
                />

            )}

            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
                //If at least 70% of an item is inside the screen, React Native considers it "visible."
            }}
            onViewableItemsChanged={viewableItemsChanged}
            contentOffset={{x:170}}//This setting moves the starting position of the list by 170 pixels to the right.
        />
    )
}

const styles = StyleSheet.create({
    backgroundImg : {
        height: 250, // Change to actual pixel values
        width: 150,  // Adjust width
        borderRadius: 38,
        overflow: "hidden",
        marginVertical: 5,
        // iOS Shadow (similar to shadow-lg)
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 }, // Shadow direction
        shadowOpacity: 0.4, // Equivalent to "shadow-black/40"
        shadowRadius: 10, // Spread of the shadow

        // Android Shadow
        elevation: 8, // Higher elevation for "lg" effect
    }
})

export default Trending