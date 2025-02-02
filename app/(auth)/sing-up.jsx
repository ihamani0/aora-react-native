import { View, Text, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'

import CostumeButtom from '../../components/CostumButton'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'


import { createUser } from "../../lib/appwriter"

const SingUp = () => {
    const [form , setForm] = useState({ username : "" ,  email: "", password: "" })


    const {setUser , setIsLogedin} = useGlobalContext()
    

    const [isSubmiting, setIsSubmiting] = useState(false)

    const SubmitForm = async ()=>{
        
        if(!form.email || !form.password  || !form.username ){
                    Alert.alert("Error" , "please fill up all the fields")
                }
        
                setIsSubmiting(true) ;
                
                try{
                    const resulte = await createUser(form.email , form.password , form.username )
        
                    //set it on global context 
                    const logedInUser = getCurrentUser()
                    
                    setUser(logedInUser)
                    setIsLogedin(true)
        
                    //push router
                    router.replace('/Home')
        
                }catch(e){
                    console.log(e)
                    throw new Error
                }finally{
                    setIsSubmiting(false) ;
                }

    }


    return (
        <SafeAreaView className="bg-primary w-full h-full">
            
            <KeyboardAvoidingView
            
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={{ flex: 1 }}
                >
            
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >

                
                <View className=" w-full min-h-[83vh]  justify-center  px-4 mx-2 my-2">
                    <Image 
                        source={images.logo}
                        resizeMode="contain"
                        // style={{width: 120, height: 120}}
                        className="w-[115px] h-[35px]"
                        
                    />
                    <Text className="text-white text-2xl font-psemibold font-semibold  mt-10">
                        Singup to Aora
                    </Text>


                    {/* input Email*/}
                    <FormField 
                    
                    title="Username"
                    placeholder="Enter your username"
                    value={form.username}
                    onChangeText={(username) => setForm({...form, username})}
                    otherStyle='mt-7'
                    
                    />

                    {/* input Email*/}
                    <FormField 
                    
                        title="Email"
                        placeholder="Enter your email"
                        keyBoardType="email-address"
                        value={form.email}
                        onChangeText={(email) => setForm({...form, email})}
                        otherStyle='mt-7'
                        
                    />
                    {/* input passowrd */}
                    <FormField 
                    
                        title="Password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChangeText={(password) => setForm({...form, password})}
                        otherStyle='mt-7'

                        
                    />


                    <CostumeButtom 
                        title="Sing up"
                        handlePress={SubmitForm}
                        containerStyle='w-full mt-7'
                        isLoading={isSubmiting}
                    />

                    <View className='flex-row mt-4  justify-center gap-2'>
                        <Text className='text-gray-100 text-lg font-pregular '>
                            Already Have account ? 
                        </Text>
                        <Link href='/sing-in' className='text-secondary  text-lg font-psemibold '>Login</Link>
                    </View>
                </View>

            </ScrollView>

            </KeyboardAvoidingView>


        </SafeAreaView>
    )
}

export default SingUp