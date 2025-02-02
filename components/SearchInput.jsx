import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'
import { router, usePathname } from 'expo-router';

const SearchInput = ({placeholder , otherStyle , initialQuery }) => {
    

    //for focusing in input
    const [isFocused , setIsFocused] = useState(false);

    //state for searchBar
    const [search , setSearch] = useState(initialQuery || '');

    const path = usePathname();



    const handleSearch = ()=>{
        if(!search.trim()){
            return  Alert.alert('Error' , 'Missing query !!')
        }

        if(path.startsWith('/search')){
            router.setParams({search})
        }else{
            router.push(`/search/${search}`)
        }
        
    }
    
    return (
        <View className={`'space-y-2 ' ${otherStyle}`}>
            

            <View  className={`bg-black-100 border-2 h-16 px-7 rounded-2xl w-full flex-row justify-between  items-center 
                        ${isFocused ? "border-secondary" : "border-black-200"}`}>
                            
                    <TextInput 
                        className="text-white h-full w-3/4 font-pregular text-base "
                        placeholder={placeholder}
                        placeholderTextColor='#CDCDE0'

                        value={search}
                        onChangeText={setSearch}
                        
                        onFocus={()=> setIsFocused(true)}
                        onBlur={()=> setIsFocused(false)}
                        
                    />

                    <TouchableOpacity
                    
                        onPress={handleSearch}
                        >
                        <Image 
                            source={icons.search}
                            resizeMode='contain'
                            className='h-5 w-5'
                            
                        />
                    </TouchableOpacity>
            </View>

                    
        </View>
    )
}



export default SearchInput