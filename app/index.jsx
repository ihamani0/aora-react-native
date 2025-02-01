import { Redirect , router } from 'expo-router';
import {View, Text, StyleSheet, Button, ScrollView, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {images} from '../constants';
import CostumButton from '../components/CostumButton';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../context/GlobalContext';



export default function index() {

    const {isLogedin , isLoding} = useGlobalContext();

    

    if (isLogedin && !isLoding) {
        return <Redirect href='/Home' />;
    }

    return (
        <SafeAreaView className=" bg-primary h-full">
            <ScrollView
                contentContainerStyle={{height: '100%'}}
            >

                <View className="justify-center items-center min-h-[85vh] px-6">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[130px] h-[84px]"
                    />

                    <Image
                        source={images.cards}
                        resizeMode='contain'
                        className="w-max-[380px] w-full h-[300px] "
                    />

                    <View className='relative mt-5'>
                        <Text className="text-3xl font-bold text-white text-center">
                        Lorem ipsum dolor sit, amet consectetur  {' '}
                            <Text className='text-secondary-200'>
                                Aora
                            </Text>
                        </Text>
                        <Image 
                            source={images.path}
                            resizeMode='contain'
                            className="w-[120px] h-[15px] absolute -bottom-3 right-5"
                        />
                    </View>

                    
                    <Text className="text-gray-100 text-sm text-center mt-7 ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.amet consectetur adipisicing elit
                    </Text>

                    {/* Button Start */}
                    <CostumButton 
                        title={'Get Started'}
                        handlePress={()=>{ router.push('/sing-in') }}
                        containerStyle ="w-full mt-7"
                        textStyle=""
                        isLoding={false}
                    />
                </View>
            </ScrollView>

            <StatusBar  style='inverted'   backgroundColor='#161622'/>
        </SafeAreaView>
    )

}

{/* <StatusBar  style='inverted' translucent={true} hidden={true} backgroundColor='#161622'/> */}

