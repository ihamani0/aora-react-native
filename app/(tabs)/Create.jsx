import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import FormField from '../../components/FormField'
import { icons } from '../../constants'

import CostumeButton from '../../components/CostumButton'

// import * as ImagePicker from 'expo-image-picker';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router'
import { ResizeMode, Video } from 'expo-av'

import {createVideo} from '../../lib/appwriter'
import { useGlobalContext } from '../../context/GlobalContext'

const Create = () => {

    const { user } = useGlobalContext();

    const [uploading, setUploading] = useState(false)
    
    const [form, setForm] = useState({
        title : '' ,
        video : null ,
        thumbnail : null , 
        prompt : ''
    })

    

    const submitVideo = async ()=>{
        if( !form.title|| !form.video || !form.thumbnail || !form.prompt ){
            return Alert.alert("Error" , "Please Fil all the Field And Submit Again")
        }

        setUploading(true)
        try {
            Alert.alert("Success" , "The File Has upload Successfaully")

            await createVideo({...form , userId: user.$id});

            router.push('/Home');
        } catch (error) {
            Alert.alert("Error :" , error.message)
        } finally{
            setForm({
                title : '' ,
                video : null ,
                thumbnail : null , 
                prompt : ''
            })
            setUploading(false)
        }

    }


    const openPicker = async (typeFile) =>{

        
        // {
        //     type : typeFile === 'image' ? ['image/png' , 'image/jpg'] : ['video/mp4' , 'video/gif'] ,
        // }
        const document = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: typeFile === 'image' ? ['images'] : ['videos'],
            aspect: [4, 3],
            quality: 1,
            
        })

        if(!document.canceled){

            if(typeFile==='image'){
                setForm({...form , thumbnail  : document.assets[0]})
            }
            if(typeFile==='video'){
                setForm({...form , video  : document.assets[0]})
            }
        }
        
    }


    // useEffect(()=>{
    //     console.log(form)
    // } , [form])

    return (
        <SafeAreaView className='bg-primary h-full'>

            <StatusBar  style='inverted'   backgroundColor='#161622'/>

            <ScrollView style={{marginTop : 26  , paddingHorizontal:15 }}>
                <Text className='text-gray-100 text-3xl font-psemibold'>Upload Video</Text>

                {/* Video Title  */}
                <FormField  
                    title='Video Title'
                    otherStyle='mt-7'

                    value={form.title}
                    placeholder='Give your A Video Catchy Title '
                    onChangeText={(newvalue) => setForm({...form , title : newvalue })}
                />

                {/* upload video  */}
                <View className='mt-7'>
                    <View >
                        <Text className='text-white font-semibold text-base '> Upload Video</Text>
                    </View>

                    <TouchableOpacity onPress={() => openPicker('video')} >
                        {
                            form.video ? 
                            (
                                <View style={{height:140}}
                                    className=' w-full px-4 justify-center items-center rounded-2xl mb-10'>

                                    <Video
                                        source={{uri : form.video.uri}}
                                        style={{
                                            height:'100%',
                                            width: '100%', // Use '100%' instead of 'full'
                                        }} 
                                        resizeMode='contain'
                                        
                                    />
                                </View>
                            
                            ) 
                            : 
                            (

                            <View style={{height:140}} className='w-full px-4 bg-black-100 rounded-2xl border border-black-200 justify-center items-center '>
                                    <View style={{borderStyle:'dashed'}} className='border border-secondary rounded-lg w-16 h-16 justify-center items-center'>
                                        <Image
                                            source={icons.upload}
                                            resizeMode='contain'
                                            className='w-10 h-10'
                                        />
                                    </View>
                            </View>

                            )

                        }
                    </TouchableOpacity>
                
                </View>


                {/* upload video  */}
                <View className='mt-7'>
                    <View >
                        <Text className='text-white font-semibold text-base '> Thumbnail Video</Text>
                    </View>

                    <TouchableOpacity onPress={() => openPicker('image')} >
                        {
                            form.thumbnail ? 
                            (
                                <View style={{height:140}} className='w-full px-4 justify-center items-center '>

                                    <Image 
                                        source={{uri : form.thumbnail.uri }}
                                        resizeMode='contain'
                                        style={{height:140}}
                                        className='w-full rounded-2xl'
                                    />

                                </View>
                            
                            ) 
                            : 
                            (

                            <View style={{height:70}} className='mt-4 w-full px-4 bg-black-100 rounded-2xl border border-black-200 justify-center items-center '>
                                    
                                        <Image
                                            source={icons.upload}
                                            resizeMode='contnain'
                                            className='w-10 h-10'
                                        />
                                        <Text className='text-gray-100 font-psemibold text-sm'>
                                            Choose File to upload 
                                        </Text>
                                    
                            </View>

                            )

                        }
                    </TouchableOpacity>
                </View>


                 {/* Form Pormpt    */}

                <FormField  
                    title='IA Prompte'
                    otherStyle='mt-4'

                    value={form.prompt}
                    placeholder='The prompt to use '
                    onChangeText={(newvalue) => setForm({ ...form , prompt : newvalue })}
                    
                />

                {/* Butto to upload */}

                <CostumeButton 
                    title='Submit & Publish'
                    handlePress={submitVideo}
                    containerStyle='w-full'
                    isLoding={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create