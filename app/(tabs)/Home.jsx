import { View, Text, SafeAreaView ,FlatList, Image, RefreshControl, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'

import {images} from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/TrendingBackUp'
import EmptyState from '../../components/EmptyState'
import { StatusBar } from 'expo-status-bar'

import{getAllPost, getLatestPosts} from '../../lib/appwriter'
import useAppWrtie from '../../lib/useAppWrite'
import VideosCard from '../../components/VideosCard'

const Home = () => {

    
    const {data : posts , reFetchPosts} = useAppWrtie(getAllPost)
    const {data : Latestposts } = useAppWrtie(getLatestPosts)



    const [refreshing, setRefreshing] = useState(false);

    const onRefreshing = async () => {
        setRefreshing(true);

        //ftech new videos 
        await reFetchPosts();

        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            
            <FlatList 
                    contentContainerStyle={{marginTop:40}}
                    data={posts}
                    keyExtractor={(item) => item.$id} 
                    
                    renderItem={({item})  => (
                        <VideosCard 
                            item={item}
                            />
                    )}

                    ListHeaderComponent={() => 
                    (
                        <View className="px-4 py-2">
                            <View className="flex-row justify-between items-start mb-6">
                                <View>
                                    <Text className="font-pregular text-xl text-gray-100">
                                        Welcome Back</Text>
                                    <Text className="font-psemibold text-white text-2xl ">
                                        HAMANI ISSAM</Text>
                                </View>
                                <Image 
                                    source={images.logoSmall}
                                    resizeMode='contain'
                                    className='w-9 h-10'
                                    />
                            </View>

                            <SearchInput 
                                    otherStyle='mb-6'
                                    placeholder='Search for vidoes topic'
                                />
                            <View className="mt-5 py-4">
                                <Text className='text-gray-100 font-pregular text-sm'>
                                    Trending Videos</Text>    
                            </View>

                            <Trending 
                                posts={Latestposts ?? []}
                                />    
                        </View>
                    ) 

                    }// finsih header FlatList

                    ListEmptyComponent={()=>
                        (
                            <EmptyState
                                title='No Videos Found'
                                subtitle='Be The First One That Upload Videos'

                            />
                        )
                        }


                    refreshControl={ <RefreshControl tintColor='#fff' refreshing={refreshing} onRefresh={onRefreshing} />}    
                />

                <StatusBar  style='inverted'   backgroundColor='#161622'/>
        </SafeAreaView>
    )
}

export default Home