import { View, Text, SafeAreaView, RefreshControl, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'

import useAppWrite from "../../lib/useAppWrite"
import { getUserPost, singOut } from '../../lib/appwriter'
import { useGlobalContext } from '../../context/GlobalContext'
import EmptyState from '../../components/EmptyState'
import { StatusBar } from 'expo-status-bar'
import VideosCard from '../../components/VideosCard'
import HeaderProfil from '../../components/HeaderProfil'
import { icons } from '../../constants'

import { router } from 'expo-router'

const Profile = () => {

    const { user ,setUser ,setIsLogedin } = useGlobalContext()



    const {data : userPost , reFetchPosts } = useAppWrite(()=>getUserPost(user.$id))


    const [refreshing, setRefreshing] = useState(false)


    const onRefreshing = async () => {
        setRefreshing(true);
        await reFetchPosts();
        setRefreshing(false);

    }

    //sing out from current session and st null to user ans set is login to false  and replace (not push) to sing in
    const logout = async () =>{

        
        await singOut(); 

        setUser(null) ;

        setIsLogedin(false);

        router.replace('/sing-in');
    }
    

    return (
        <SafeAreaView className='bg-primary h-full'>
            
            <FlatList 
                    contentContainerStyle={{marginTop:40}}
                    data={userPost}
                    keyExtractor={(item) => item.$id} 
                    
                    renderItem={({item})  => (
                        <VideosCard 
                            item={item}
                            />
                    )}

                    
                    
                    ListHeaderComponent={() => 
                        (
                            <HeaderProfil user={user} lenghtPost={userPost.length || 0}  logOut={logout}/>
                        ) }

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

export default Profile