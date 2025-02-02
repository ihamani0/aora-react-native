import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import useAppWrtie from '../../lib/useAppWrite'
import { getSearchPost } from '../../lib/appwriter'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import VideosCard from '../../components/VideosCard'



const Search = () => {

    const { query } = useLocalSearchParams() // Get the query from URL


    const {data : searchPosts , reFetchPosts } = useAppWrtie(()=> getSearchPost(query))
 
    console.log(searchPosts)

    useEffect(()=>{

        reFetchPosts();
    } , [query])


    return (
        <SafeAreaView className='bg-primary h-full'>
                <StatusBar  style='inverted'   backgroundColor='#161622'/>

                <FlatList
                    contentContainerStyle={{marginTop:40}}
                    data={searchPosts}
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
                                        Search For :</Text>
                                    <Text className="font-psemibold text-white text-2xl ">
                                        {query}</Text>
                                </View>
                                
                            </View>

                            <SearchInput 
                                    initialQuery={query}
                                    otherStyle='mb-6'
                                    placeholder='Search for vidoes topic'
                                />
                            

                            
                        </View>
                    ) 

                    }// finsih header FlatList

                    ListEmptyComponent={()=>
                        (
                            <EmptyState
                                title='No Videos Found'
                                subtitle='no video found for this query '
                                
                            />
                        )
                        }


                    
                />
            
        </SafeAreaView>
    )
}

export default Search