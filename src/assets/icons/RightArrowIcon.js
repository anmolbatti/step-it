import React from 'react';
import Svg, { Path, Mask, G , Defs, LinearGradient, Stop, ClipPath, Rect} from 'react-native-svg';
import { View } from 'react-native';

export default RightArrowIcon = ({width=15, height=10}) => {
    return (
        <View style={{
            position: 'absolute', 
            width: 15,
            height: 10,
            left: 42,
            top: 5
        }}>
            <Svg width={width} height={height} viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.33301 3.5H9.33301M9.33301 3.5L6.33301 0.5M9.33301 3.5L6.33301 6.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </View>
    );
}
