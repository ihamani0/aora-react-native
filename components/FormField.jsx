import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'



const FormField = ({title , value , placeholder , keyBoardType ,  onChangeText , otherStyle , ...props }) => {
    
    const [showPassword, setShowPassword] = React.useState(false)

    //for focusing in input
    const [isFocused , setIsFocused] = useState(false);
    
    return (
        <View className={`'space-y-2 ' ${otherStyle}`}>
            <Text className='text-gray-100 mb-3 py-2 font-pmedium text-base' >{title}</Text>

            <View  className={`bg-black-100 border-2 h-16 px-7 rounded-2xl w-full flex-row items-center 
                        ${isFocused ? "border-secondary" : "border-black-200"}`}>
                            
                    <TextInput 
                        className="text-white w-full h-full font-semibold text-base "
                        placeholder={placeholder}
                        placeholderTextColor='#7B7B8B'
                        keyboardType={keyBoardType}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={title === 'Password' && !showPassword}

                        onFocus={()=> setIsFocused(true)}
                        onBlur={()=> setIsFocused(false)}
                        
                    />

                    { title === 'Password' && (
                        <TouchableOpacity 
                                onPress={()=> setShowPassword(!showPassword)}
                            >
                            <Image 
                                source={showPassword ? icons.eye : icons.eyeHide}
                                resizeMode='contain'
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                    )}
            </View>

                    
        </View>
    )
}



export default FormField

// // 
// title="Password"
//                         placeholder="Enter your password"
//                         keyBoardType="password"
//                         value={form.password}
//                         onChangeText={(password) => setForm({...form, password})}