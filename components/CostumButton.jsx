import {  Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CostumButton = ({title , handlePress , textStyle , containerStyle , isLoding}) => {
    return (
        <TouchableOpacity 
        
            className={`bg-secondary p-3 justify-center  items-center mt-5 rounded-lg min-h-[62px] 
                ${containerStyle}
                ${ isLoding ? "opacity-50" : "" }
                `}
            disabled={isLoding}    
            onPress={handlePress}
            activeOpacity={0.8}
            >
            
            
            <Text
                className={`text-primary text-lg font-psemibold  text-center ${textStyle}`}
            >{title}</Text>
        </TouchableOpacity>
    )
}

export default CostumButton