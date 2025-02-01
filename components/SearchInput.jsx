import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'

const SearchInput = ({title , value , placeholder , keyBoardType ,  onChangeText , otherStyle , ...props }) => {
    

    //for focusing in input
    const [isFocused , setIsFocused] = useState(false);
    
    return (
        <View className={`'space-y-2 ' ${otherStyle}`}>
            

            <View  className={`bg-black-100 border-2 h-16 px-7 rounded-2xl w-full flex-row justify-between  items-center 
                        ${isFocused ? "border-secondary" : "border-black-200"}`}>
                            
                    <TextInput 
                        className="text-white h-full w-3/4 font-pregular text-base "
                        placeholder={placeholder}
                        placeholderTextColor='#7B7B8B'
                        keyboardType={keyBoardType}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={title === 'Password' && !showPassword}
                        onFocus={()=> setIsFocused(true)}
                        onBlur={()=> setIsFocused(false)}
                        
                    />

                    <TouchableOpacity>
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